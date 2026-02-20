import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './src/app.js';

dotenv.config();

const PORT = process.env.PORT || 5001;

// Connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Start Server
connectDB().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
});
