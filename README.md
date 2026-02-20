# Mental Wellness App

A full-stack mental wellness journaling application with AI-powered chat support, mood tracking, and journaling features.


## Features

- 🔐 **User Authentication** - JWT-based secure authentication
- 📝 **Journal Entries** - Create and manage private journal entries
- 😊 **Mood Tracking** - Log and visualize your emotional patterns
- 💬 **AI Chat Assistant** - Mental wellness support powered by Google Gemini AI
- 📊 **Dashboard** - Track wellness progress and view recent entries
- 🔒 **Privacy First** - Your data is private and secure

## Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Axios
- Framer Motion
- TailwindCSS
- Lucide Icons

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- Google Generative AI (Gemini)
- Bcrypt for password hashing

## Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- Google AI Studio API key (for chat feature)

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd ML
```

### 2. Server Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret_minimum_32_characters
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3. Client Setup

```bash
cd ../client
npm install
```

Create a `.env` file in the client directory:

```env
VITE_API_URL=http://localhost:5001/api
```

## Running Locally

### Start the backend server:

```bash
cd server
npm run dev
```

Server will run on `http://localhost:5001`

### Start the frontend:

```bash
cd client
npm run dev
```

Frontend will run on `http://localhost:5173`

## Environment Variables

### Server (.env)

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5001) |
| `MONGO_URI` | MongoDB connection string |
| `GEMINI_API_KEY` | Google AI Studio API key |
| `JWT_SECRET` | Secret for JWT tokens |
| `NODE_ENV` | Environment (development/production) |
| `CLIENT_URL` | Frontend URL for CORS |

### Client (.env)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL |

## Deployment

### Backend (Render/Railway/Heroku)

1. Push code to GitHub
2. Connect your hosting platform to the repository
3. Set environment variables in the hosting dashboard
4. Set `NODE_ENV=production`
5. Deploy!

### Frontend (Vercel/Netlify)

1. Build the project: `npm run build`
2. Connect your hosting platform to the repository
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_API_URL=<your-backend-url>`
6. Deploy!

### Important for Production

- **Backend CORS**: Update `CLIENT_URL` in the server hosting dashboard (e.g. Render) to your exact frontend Vercel URL (with `https://` and **NO trailing slash**).
- **Frontend API Config**: Update `VITE_API_URL` in the frontend hosting dashboard (e.g. Vercel) to your exact backend Render URL **AND append `/api` to the end of it** (e.g. `https://your-backend-url.onrender.com/api`).
- **Cross-Domain Cookies (Important!)**: Ensure the backend `NODE_ENV` is set strictly to `production`. This triggers `sameSite: 'none'` and `secure: true` for the JWT cookie, which is strictly required for Vercel and Render to exchange auth state.
- Use a strong `JWT_SECRET` (minimum 32 characters).

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Journal
- `GET /api/journal` - Get all journal entries
- `POST /api/journal` - Create new entry
- `GET /api/journal/:id` - Get single entry
- `PUT /api/journal/:id` - Update entry
- `DELETE /api/journal/:id` - Delete entry

### Mood
- `POST /api/mood` - Log mood
- `GET /api/mood` - Get mood history
- `GET /api/mood/stats` - Get mood statistics

### Chat
- `POST /api/chat` - Send message to AI assistant

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/stats` - Get user statistics

## Features in Detail

### Journal Entries
- Create rich text journal entries
- Edit and delete your entries
- View recent entries on dashboard

### Mood Tracking
- Log your current mood
- Track mood patterns over time
- View mood statistics

### AI Chat Support
- Powered by Google Gemini AI
- Mental wellness guidance
- Supportive conversations
- Privacy-focused

## Security Features

- JWT authentication
- Password hashing with bcrypt
- HTTP-only cookies
- CORS configuration
- Rate limiting
- Helmet security headers

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
