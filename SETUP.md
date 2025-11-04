# 🚀 Quick Setup Guide

Follow these steps to get QuickNotes running on your machine.

## Step 1: Install Dependencies

```bash
npm install
```

This installs:
- Next.js 14
- React 19
- TypeScript
- Prisma
- Tailwind CSS
- And all other dependencies

## Step 2: Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
echo 'DATABASE_URL="file:./dev.db"' > .env
```

Or manually create `.env` with:
```
DATABASE_URL="file:./dev.db"
```

## Step 3: Initialize Database

```bash
# Create the database and run migrations
npx prisma migrate dev --name init
```

This will:
- Create the SQLite database file (`dev.db`)
- Set up the `notes` table
- Generate Prisma Client

## Step 4: Seed the Database (Optional)

Add sample data to get started:

```bash
npm run db:seed
```

This creates two sample notes to help you see how the app works.

## Step 5: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✅ You're Ready!

You should now see:
- The home page with your notes (or empty if you skipped seeding)
- A navigation bar with "All Notes" and "+ New Note" buttons
- Click "New Note" to create your first note!

## 🛠️ Troubleshooting

### Database not found?
```bash
# Make sure you've run the migration
npx prisma migrate dev --name init
```

### Prisma Client errors?
```bash
# Regenerate Prisma Client
npx prisma generate
```

### Port already in use?
```bash
# Kill the process on port 3000, or use a different port
PORT=3001 npm run dev
```

### Clear and reset database?
```bash
# Delete the database file
rm prisma/dev.db

# Recreate it
npx prisma migrate dev --name init
npm run db:seed
```

## 📚 Next Steps

- Check [README.md](./README.md) for project overview
- Explore the code to understand how it works!

---

**Happy coding! 🎉**

