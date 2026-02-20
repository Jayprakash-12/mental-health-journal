import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import { registerSchema, loginSchema } from '../utils/validation.js';

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
    try {
        // Validate request body
        const result = registerSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400);
            throw new Error(result.error.errors[0].message);
        }

        const { name, email, password } = result.data;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            const token = generateToken(user._id);

            // Send HTTP-only cookie
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
                sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none', // Must be 'none' for cross-domain in prod
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            });

            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                message: 'Registration successful',
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
    try {
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400);
            throw new Error(result.error.errors[0].message);
        }

        const { email, password } = result.data;

        // Check for user email
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id);

            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none', // Must be 'none' for cross-domain in prod
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });

            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                message: 'Login successful',
            });
        } else {
            res.status(401);
            throw new Error('Invalid credentials');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
export const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out' });
};

// @desc    Forgot password - generate reset token
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            res.status(400);
            throw new Error('Please provide an email');
        }

        const user = await User.findOne({ email });

        if (!user) {
            res.status(404);
            throw new Error('No user found with that email');
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Hash token and save to database
        user.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // Set expire to 1 hour
        user.resetPasswordExpire = Date.now() + 60 * 60 * 1000;

        await user.save();

        // In production, you would send an email here
        // For now, we'll return the token (in real app, NEVER do this)
        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

        res.json({
            success: true,
            message: 'Password reset link generated',
            // Remove this in production - only for testing
            resetUrl,
            resetToken,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password/:token
// @access  Public
export const resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            res.status(400);
            throw new Error('Please provide a new password');
        }

        if (password.length < 6) {
            res.status(400);
            throw new Error('Password must be at least 6 characters');
        }

        // Hash the token from URL
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        // Find user with valid token
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            res.status(400);
            throw new Error('Invalid or expired reset token');
        }

        // Set new password
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.json({
            success: true,
            message: 'Password reset successful. You can now login with your new password.',
        });
    } catch (error) {
        next(error);
    }
};
