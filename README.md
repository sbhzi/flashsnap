# FlashSnap

A modern flashcard application built with SvelteKit 5 that uses GitHub Discussions for collaborative flashcard creation and management.

## Features

- 🔐 **GitHub OAuth Authentication** - Secure login with your GitHub account
- 💬 **GitHub Discussions Integration** - Use GitHub Discussions as flashcard groups
- 🃏 **Comment-based Flashcards** - Each comment becomes a flashcard
- 🎨 **Modern UI** - Beautiful, responsive interface built with TailwindCSS
- 📱 **Mobile Friendly** - Works seamlessly on all devices
- 🤝 **Collaborative** - Share and collaborate on flashcard sets with your team

## How It Works

1. **Create Discussion** - Start a new discussion in your GitHub repository to create a flashcard group
2. **Add Cards** - Each comment in the discussion becomes a flashcard with question and answer
3. **Study** - Practice with your flashcards and track your progress over time

## Setup Instructions

### Prerequisites

- Node.js 18+ or Bun
- A GitHub account
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/sbhzi/flashsnap.git
cd flashsnap
```

### 2. Install Dependencies

```bash
# Using bun (recommended)
bun install

# Or using npm
npm install
```

### 3. GitHub OAuth App Setup

You need to create a GitHub OAuth App to enable authentication:

#### Step 1: Go to GitHub Developer Settings
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "OAuth Apps" in the left sidebar
3. Click "New OAuth App"

#### Step 2: Fill in the Application Details
- **Application name**: `FlashSnap` (or your preferred name)
- **Homepage URL**: `http://localhost:5173` (for development)
- **Application description**: `Flashcard application using GitHub Discussions`
- **Authorization callback URL**: `http://localhost:5173/auth/github/callback`

#### Step 3: Register the Application
1. Click "Register application"
2. You'll be redirected to your new OAuth app's page
3. Note down the **Client ID** (visible immediately)
4. Click "Generate a new client secret" and note down the **Client Secret**

#### Step 4: Update for Production
When deploying to production, you'll need to:
1. Go back to your OAuth app settings
2. Update the **Homepage URL** to your production domain
3. Update the **Authorization callback URL** to `https://yourdomain.com/auth/github/callback`

### 4. Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file and add your GitHub OAuth credentials:

```env
GITHUB_CLIENT_ID=your_actual_client_id_here
GITHUB_CLIENT_SECRET=your_actual_client_secret_here
```

### 5. Enable GitHub Discussions

For the flashcard functionality to work, you need to enable Discussions in your repositories:

1. Go to your GitHub repository
2. Click on "Settings" tab
3. Scroll down to the "Features" section
4. Check the "Discussions" checkbox
5. Click "Set up discussions"
6. Choose a category (e.g., "General") for your flashcard discussions

### 6. Run the Application

```bash
# Using bun
bun run dev

# Or using npm
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

### Creating Flashcard Groups

1. **Log in** with your GitHub account
2. **Click "Create New Flashcard Group"** on the homepage
3. **Select a repository** that has Discussions enabled
4. **Create a new discussion** with a title and description for your flashcard set

### Adding Flashcards

1. **Go to the GitHub discussion** you created
2. **Add comments** in the following format:
   ```
   **Question:** What is the capital of France?
   **Answer:** Paris
   ```
3. Each comment becomes a flashcard automatically

### Studying

1. **Click "Browse Groups"** to see your flashcard sets
2. **Select a group** to start studying
3. **Use the study mode** to practice with your flashcards

## Development

### Project Structure

```
src/
├── lib/
│   └── server/
│       ├── auth.ts          # Lucia authentication setup
│       ├── db.ts            # SQLite database setup
│       └── github.ts        # GitHub API integration
├── routes/
│   ├── auth/
│   │   ├── github/          # GitHub OAuth routes
│   │   └── logout/          # Logout route
│   ├── +layout.svelte       # Main layout with navigation
│   ├── +layout.server.ts    # Server-side layout data
│   └── +page.svelte         # Homepage
└── hooks.server.ts          # Server-side hooks for auth
```

### Tech Stack

- **Frontend**: SvelteKit 5, TailwindCSS
- **Authentication**: Lucia, Arctic (GitHub OAuth)
- **Database**: SQLite
- **GitHub Integration**: Octokit
- **Deployment**: Vercel/Netlify compatible

### Database Schema

The application uses SQLite with the following tables:

- `user` - User accounts linked to GitHub
- `session` - Authentication sessions
- `flashcard_group` - Links to GitHub discussions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

If you encounter any issues:

1. Check that GitHub Discussions are enabled in your repository
2. Verify your OAuth app settings match your environment
3. Ensure your `.env` file has the correct credentials
4. Check the browser console for any error messages

For additional help, please open an issue on GitHub.
