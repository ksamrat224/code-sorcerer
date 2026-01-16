# 🧙 Code Sorcerer

> **Cut Code Review Time & Bugs in Half. Instantly.**

Code Sorcerer is an AI-powered code review platform that automatically analyzes pull requests using advanced RAG (Retrieval-Augmented Generation) technology. It provides comprehensive, context-aware code reviews with detailed walkthroughs, sequence diagrams, and actionable suggestions.

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📸 Screenshots

### Login Page

![Login Page](./public/login.png)

### Dashboard

![Dashboard](./public/dashboard.png)

### Repository Management

![Repositories](./public/repositories.png)

### AI Code Reviews

![AI PR Review](./public/aiprreview.png)

### Review History

![Reviews](./public/reviews.png)

### Subscription Management

![Subscriptions](./public/subscriptions.png)

### Settings

![Settings](./public/settings.png)

## ✨ Features

### 🤖 AI-Powered Code Reviews

- **Automatic PR Analysis**: Automatically reviews pull requests when opened or updated
- **Context-Aware Reviews**: Uses RAG (Retrieval-Augmented Generation) to understand your codebase context
- **Comprehensive Analysis**: Includes:
  - File-by-file walkthrough
  - Sequence diagrams (Mermaid.js)
  - Summary and strengths
  - Bug detection and security concerns
  - Code improvement suggestions
  - Creative poem summarizing changes

### 📊 Dashboard & Analytics

- Real-time statistics (repositories, commits, PRs, reviews)
- Contribution activity graph
- Monthly activity breakdown with charts
- Visual insights into your coding patterns

### 🔗 GitHub Integration

- Connect multiple repositories
- Automatic webhook handling
- GitHub OAuth authentication
- Real-time PR monitoring

### 💳 Subscription Management

- Free tier with limits (5 repos, 5 reviews per repo)
- Pro tier with unlimited access
- Polar.sh integration for payments
- Usage tracking and limits

### 🎨 Modern UI/UX

- Beautiful, responsive design
- Dark mode support
- Real-time updates
- Intuitive navigation

## 🛠️ Tech Stack

### Frontend

- **[Next.js 16.1](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible component library
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[TanStack Query](https://tanstack.com/query)** - Data fetching and caching
- **[Recharts](https://recharts.org/)** - Chart library
- **[Lucide React](https://lucide.dev/)** - Icon library

### Backend & Infrastructure

- **[Inngest](https://www.inngest.com/)** - Background job processing and workflows
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Database
- **[Better Auth](https://www.better-auth.com/)** - Authentication system
- **[Polar.sh](https://polar.sh/)** - Subscription and payment management

### AI & ML

- **[Vercel AI SDK](https://sdk.vercel.ai/)** - AI integration framework
- **[Google Gemini 2.5 Flash](https://ai.google.dev/)** - AI model for code review generation
- **[Pinecone](https://www.pinecone.io/)** - Vector database for RAG
- **[Google Text Embedding](https://ai.google.dev/)** - Embedding model for semantic search

### Development Tools

- **[Bun](https://bun.sh/)** - Fast JavaScript runtime and package manager
- **[ngrok](https://ngrok.com/)** - Secure tunneling for webhooks (development)
- **[ESLint](https://eslint.org/)** - Code linting
- **[GitHub Octokit](https://github.com/octokit)** - GitHub API client

## 🏗️ Architecture

### System Flow

```
GitHub Webhook → Next.js API Route → Inngest Event → Background Job
                                                         ↓
                    Pinecone (RAG) ← Codebase Indexing ← Repository Connection
                                                         ↓
                    AI Review Generation (Gemini) → Post to GitHub → Save to DB
```

### Key Components

1. **Webhook Handler** (`app/api/webhooks/github/route.ts`)

   - Receives GitHub webhook events
   - Triggers review process for PR events

2. **Inngest Functions** (`inngest/functions/review.ts`)

   - Background job processing
   - Handles PR diff fetching, RAG context retrieval, AI review generation
   - Posts reviews to GitHub and saves to database

3. **RAG System** (`module/ai/lib/rag.ts`)

   - Indexes codebase files into Pinecone
   - Retrieves relevant context for PR reviews
   - Uses semantic search for better understanding

4. **Authentication** (`lib/auth.ts`)

   - GitHub OAuth via Better Auth
   - Session management
   - Polar.sh integration for subscriptions

5. **Subscription System** (`module/payment/lib/subscription.ts`)
   - Tier management (FREE/PRO)
   - Usage tracking
   - Limit enforcement

## 🚀 Getting Started

### Quick Start

After setting up your environment variables and database, you'll need to run these commands in **separate terminals**:

**Terminal 1 - Next.js Development Server:**

```bash
bun run dev
```

**Terminal 2 - Inngest Dev Server (for background jobs):**

```bash
npx --ignore-scripts=false inngest-cli@latest dev
```

**Terminal 3 - ngrok (for GitHub webhooks):**

```bash
ngrok http 3000
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Prerequisites

- **Bun** (v1.0+)
- **PostgreSQL** (v14+)
- **Node.js** (v20+) - if not using Bun
- **GitHub OAuth App** - for authentication
- **Pinecone Account** - for vector database
- **Polar.sh Account** - for subscriptions (optional)
- **ngrok** - for local webhook development (optional)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ksamrat224/code-sorcerer.git
   cd code-sorcerer
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/syntax_sorcerer"

   # GitHub OAuth
   GITHUB_CLIENT_ID="your_github_client_id"
   GITHUB_CLIENT_SECRET="your_github_client_secret"

   # Better Auth
   BETTER_AUTH_SECRET="your_secret_key"
   BETTER_AUTH_URL="http://localhost:3000"

   # Pinecone
   PINECONE_API_KEY="your_pinecone_api_key"
   PINECONE_INDEX_NAME="your_index_name"
   PINECONE_ENVIRONMENT="your_environment"

   # AI (Google)
   GOOGLE_GENERATIVE_AI_API_KEY="your_google_ai_key"

   # Inngest
   INNGEST_EVENT_KEY="your_inngest_event_key"
   INNGEST_SIGNING_KEY="your_inngest_signing_key"
   INNGEST_BASE_URL="http://localhost:3000/api/inngest"

   # Polar.sh (optional)
   POLAR_ACCESS_TOKEN="your_polar_token"
   POLAR_WEBHOOK_SECRET="your_webhook_secret"
   POLAR_SUCCESS_URL="http://localhost:3000/dashboard/subscription?success=true"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"

   # ngrok (for local development)
   NGROK_URL="https://your-ngrok-url.ngrok-free.app"
   ```

4. **Set up the database**

   ```bash
   bunx prisma generate
   bunx prisma migrate dev
   ```

5. **Run the development server**

   ```bash
   bun run dev
   ```

6. **Set up Inngest (for background jobs)**

   In a separate terminal, run:

   ```bash
   npx --ignore-scripts=false inngest-cli@latest dev
   ```

   This will start the Inngest dev server to handle background jobs. Keep this running alongside your Next.js server.

7. **Set up ngrok (for local webhook testing)**

   In another terminal, run:

   ```bash
   ngrok http 3000
   ```

   This creates a secure tunnel to your local server. Update your GitHub webhook URL to point to your ngrok URL (e.g., `https://your-ngrok-url.ngrok-free.app/api/webhooks/github`).

## 📖 Usage

### Connecting a Repository

1. Navigate to **Repositories** in the dashboard
2. Search for your GitHub repository
3. Click **Connect** to link it to your account
4. The codebase will be automatically indexed into Pinecone

### Automatic Code Reviews

1. Create or update a pull request in your connected repository
2. The webhook will trigger an automatic review
3. The AI will analyze the PR and post a comprehensive review comment
4. View all reviews in the **Reviews** section

### Manual Review Request

You can also trigger reviews programmatically via the API or by using the GitHub webhook directly.

## 🔍 Proof of Concept - Example Code Review

**See Syntax Sorcerer in action!** Check out this real code review generated by our AI:

### **[📋 PR #12: ksamrat224/code-sorcerer](https://github.com/ksamrat224/code-sorcerer/pull/12)**

This pull request showcases the full capabilities of Syntax Sorcerer's AI code review system:

- ✅ **Contextual Analysis** - Understands codebase context using RAG
- ✅ **Detailed Walkthrough** - File-by-file explanation of changes
- ✅ **Sequence Diagrams** - Visual flow representation using Mermaid.js
- ✅ **Bug Detection** - Identifies potential issues and security concerns
- ✅ **Actionable Suggestions** - Specific code improvement recommendations
- ✅ **Creative Summaries** - Includes a poem summarizing the changes

This is a real example of how Syntax Sorcerer automatically reviews pull requests and provides comprehensive, intelligent feedback.

## 🧪 Development

### Project Structure

```
code-sorcerer/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Auth routes
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── inngest/      # Inngest webhook
│   │   └── webhooks/     # GitHub webhooks
│   └── dashboard/        # Dashboard pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── providers/       # Context providers
├── inngest/              # Inngest functions
│   └── functions/       # Background jobs
├── lib/                  # Utilities and configs
│   ├── generated/       # Prisma generated types
│   └── ...
├── module/               # Feature modules
│   ├── ai/              # AI and RAG logic
│   ├── auth/            # Authentication
│   ├── dashboard/       # Dashboard features
│   ├── github/          # GitHub integration
│   ├── payment/         # Subscription management
│   ├── repository/      # Repository management
│   └── review/          # Review features
└── prisma/              # Database schema
```

### Running Tests

```bash
# Lint code
bun run lint

# Type check
bunx tsc --noEmit
```

### Database Migrations

```bash
# Create a new migration
bunx prisma migrate dev --name migration_name

# Apply migrations
bunx prisma migrate deploy
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use shadcn/ui components when possible
- Write clear commit messages
- Add comments for complex logic
- Test your changes locally
- Update documentation as needed

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New features
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- 🧪 Test coverage
- 🌐 Internationalization

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn](https://ui.shadcn.com/) for the amazing component library
- [Inngest](https://www.inngest.com/) for background job processing
- [Pinecone](https://www.pinecone.io/) for vector database
- [Vercel AI SDK](https://sdk.vercel.ai/) for AI integration
- [Polar.sh](https://polar.sh/) for subscription management
- All the open-source contributors

## 📧 Contact

- **Developer**: Samrat Karki
- **GitHub**: [@ksamrat224](https://github.com/ksamrat224)
- **Project**: [code-sorcerer](https://github.com/ksamrat224/code-sorcerer)

---

**Made with ❤️ using Next.js, AI, and modern web technologies**
