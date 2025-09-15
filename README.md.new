# AI Career Counseling Chat Application

A full-stack application that provides AI-powered career counseling using Next.js, TypeScript, tRPC, Prisma, and OpenAI API integration.

![AI Career Counseling Chat Screenshot](https://example.com/screenshot.png)

## Demo

Live Demo: [AI Career Counseling App](https://your-vercel-deployment-url.vercel.app)

## Features

- 💬 AI-powered career counseling chat interface
- 📝 Persistent chat history across sessions
- 🔄 Automatic fallback mode with pre-defined career advice when API quota is exceeded
- 📱 Responsive design for mobile and desktop
- 🗄️ PostgreSQL database for data persistence
- 📊 Session management with pagination
- ⚡ Fast loading and response times

## Tech Stack

- **Frontend**: Next.js 15+ with TypeScript
- **API Layer**: tRPC for end-to-end typesafe APIs
- **Data Fetching**: TanStack Query for efficient data management
- **Database**: PostgreSQL on Neon (serverless Postgres)
- **ORM**: Prisma for database access and migrations
- **AI Integration**: OpenAI API with automatic fallback mode
- **Styling**: CSS Modules

## Project Structure

```
/
├── prisma/                # Database schema and migrations
├── public/                # Static assets
├── scripts/               # Utility scripts for environment checking
├── src/
│   ├── app/               # Next.js App Router components
│   ├── components/        # Reusable UI components
│   ├── pages/             # API routes
│   ├── server/            # Server-side code (tRPC, Prisma client)
│   └── utils/             # Utility functions
└── .env                   # Environment variables (not in repo)
```

## Database Schema

The application uses three main models:
- **User**: For user management (optional authentication)
- **ChatSession**: Represents a conversation thread with a topic
- **Message**: Individual messages within a session

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn
- A PostgreSQL database (or use Neon, Supabase for hosted option)
- OpenAI API key (optional - app works in demo mode without it)

### Installation

1. Clone the repository and install dependencies:
   ```sh
   git clone https://github.com/yourusername/ai-career-counseling.git
   cd ai-career-counseling
   npm install
   ```

2. Configure your database and OpenAI API key in `.env`:
   ```env
   DATABASE_URL=your-postgres-connection-string
   OPENAI_API_KEY=your-openai-api-key
   ```

3. Check your environment configuration:
   ```sh
   # For Windows PowerShell users:
   npm run check-environment
   
   # For Bash/Unix users:
   npm run check-env
   ```

4. Run Prisma migrations to set up your database:
   ```sh
   npx prisma migrate dev --name init
   ```

5. Start the development server:
   ```sh
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Environment Configuration Tools

This project includes several scripts to help you verify and troubleshoot your environment setup:

#### For Windows PowerShell Users

1. **Comprehensive Environment Check**:
   ```sh
   npm run check-environment
   ```
   This script performs a complete check of your environment, including:
   - Verification of the .env file
   - Node.js and npm versions
   - Database URL configuration
   - OpenAI API key format check
   - Prisma setup verification
   - Next.js configuration check

2. **Basic Environment Variables Check**:
   ```sh
   npm run check-env:ps
   ```
   Shows all environment variables from both system environment and .env file.

#### For Bash/Unix Users

1. **Basic Environment Check**:
   ```sh
   npm run check-env
   ```
   Shows environment variables loaded from the .env file.

#### OpenAI API Key Tools

1. **Format Check**:
   ```sh
   npm run check-openai-key
   ```
   Validates that your OpenAI API key has the correct format.

2. **API Validation**:
   ```sh
   npm run validate-openai-key
   ```
   Tests your OpenAI API key by making a small API request to verify it's working.

### Getting an OpenAI API Key

1. Visit [OpenAI API Keys](https://platform.openai.com/account/api-keys)
2. Sign up for an account or log in if you already have one
3. Click on "Create new secret key" 
4. Copy the generated API key (you won't be able to see it again after closing the page)
5. Paste the API key in your `.env` file:
   ```
   OPENAI_API_KEY=sk-your-api-key-here
   ```
6. Restart your development server for the changes to take effect

**Important**: OpenAI API usage incurs costs based on token consumption. Check [OpenAI pricing](https://openai.com/pricing) for current rates.

### Fallback Mode / Demo Mode

This application includes an automatic fallback system that activates when:

1. The OpenAI API key is not configured or is invalid
2. The API key has exceeded its quota limit
3. There are network issues when contacting the OpenAI API

When fallback mode is active:

- The application will display "[DEMO MODE]" at the beginning of AI responses
- Responses are pre-defined career advice snippets based on message keywords
- The application remains fully functional for demonstration purposes
- No API calls are made to OpenAI, so no costs are incurred

This feature allows you to:
- Demo the application without a valid OpenAI API key
- Continue using the app when you've reached API quota limits
- Test the UI and functionality without consuming API credits

## Deployment

### Deploying to Vercel

1. Create a Vercel account if you don't have one
2. Connect your GitHub repository
3. Configure environment variables in Vercel dashboard
4. Deploy the application

### Database Setup

1. Set up a PostgreSQL database on Neon or Supabase
2. Add the database connection string to your environment variables
3. Run Prisma migrations to set up your database schema

## Development

### Key API Endpoints

- `/api/trpc/chat.getSessions` - Get all chat sessions
- `/api/trpc/chat.getSession` - Get a specific chat session with messages
- `/api/trpc/chat.createSession` - Create a new chat session
- `/api/trpc/chat.addMessage` - Add a message to a chat session

### Architecture Overview

This application follows a modern full-stack architecture:

1. **Client Layer**: Next.js frontend with React components
2. **API Layer**: tRPC procedures provide type-safe API endpoints
3. **Business Logic**: Implemented in tRPC routers and AI service
4. **Data Access**: Prisma ORM handles database operations
5. **External Integration**: OpenAI API for AI responses with fallback mode

## Future Enhancements

- User authentication with NextAuth
- Real-time typing indicators
- Dark/light theme support
- Voice input for accessibility
- Additional AI model options
- Export chat history functionality

## License

This project is licensed under the MIT License - see the LICENSE file for details.