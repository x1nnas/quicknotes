# 📝 QuickNotes

A modern, full-stack note-taking application built with Next.js 14, TypeScript, Prisma, and SQLite. Features a clean, minimal UI with full CRUD operations and AI-powered title generation.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **📋 Full CRUD Operations**: Create, read, update, and delete notes seamlessly
- **🎨 Modern UI**: Clean, minimal design with Tailwind CSS
- **🤖 AI Title Generation**: Generate creative titles for your notes with one click
- **⚡ Fast Performance**: Server-side rendering with Next.js 14 App Router
- **🔒 Type-Safe**: Built with TypeScript for better developer experience
- **💾 SQLite Database**: Lightweight, local database with Prisma ORM
- **📱 Responsive Design**: Works perfectly on all device sizes

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React 19** - Latest React features

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Modern database ORM
- **SQLite** - Embedded database

### Development Tools
- **ESLint** - Code linting
- **Prisma Studio** - Database GUI
- **tsx** - TypeScript execution

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Setup Steps

1. **Clone or navigate to the project**
   ```bash
   cd quicknotes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   # Create .env file (if not exists)
   echo 'DATABASE_URL="file:./dev.db"' > .env
   
   # Initialize Prisma and create database
   npx prisma migrate dev --name init
   
   # Seed the database with sample data
   npm run db:seed
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Project Structure

```
quicknotes/
├── app/                    # Next.js App Router directory
│   ├── api/               # API routes
│   │   ├── notes/        # Note CRUD endpoints
│   │   └── ai/           # AI title generation
│   ├── new/              # Create note page
│   ├── note/[id]/        # Note detail/edit page
│   ├── layout.tsx         # Root layout with navbar
│   ├── page.tsx           # Home page (notes list)
│   └── globals.css        # Global styles
├── lib/                   # Utility libraries
│   └── prisma.ts         # Prisma client instance
├── prisma/               # Database configuration
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeding script
├── types/                 # TypeScript type definitions
│   └── note.ts           # Note interface
└── public/               # Static assets
```

## 📚 API Endpoints

### Notes API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/notes` | Get all notes |
| `GET` | `/api/notes/[id]` | Get a single note |
| `POST` | `/api/notes` | Create a new note |
| `PUT` | `/api/notes/[id]` | Update a note |
| `DELETE` | `/api/notes/[id]` | Delete a note |

### AI API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/ai/title` | Generate a smart title (mocked) |

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server

# Database
npm run db:push      # Push schema changes to database
npm run db:migrate   # Create and run migrations
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio (database GUI)

# Production
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🎨 Pages

### Home Page (`/`)
- Displays all notes in a card-based layout
- Shows note title, preview, and creation date
- Click any note to view/edit/delete

### New Note Page (`/new`)
- Form to create a new note
- "Generate smart title" button for AI-powered titles
- Validates input before submission

### Note Detail Page (`/note/[id]`)
- View full note content
- Edit note inline
- Delete note with confirmation
- Shows creation and update timestamps

## 💾 Database Schema

```prisma
model Note {
  id        String   @id @default(cuid())
  title     String
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("notes")
}
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
```

### Prisma Configuration

The Prisma schema is located at `prisma/schema.prisma`. To modify the database structure:

1. Update the schema file
2. Run `npm run db:migrate` to create a migration
3. The migration will be applied automatically

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Vercel will automatically detect Next.js
4. Add environment variables if needed
5. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Railway
- Netlify
- AWS Amplify
- DigitalOcean App Platform

**Note**: For production, consider switching from SQLite to PostgreSQL or MySQL for better scalability.

## 🤝 Contributing

Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Share feedback

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database powered by [Prisma](https://www.prisma.io/)

---

**Made with ❤️ for productivity**
