import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data (optional - comment out if you want to keep existing data)
  await prisma.note.deleteMany({})
  console.log('🧹 Cleared existing notes')

  // Create sample notes
  const note1 = await prisma.note.create({
    data: {
      title: 'Welcome to QuickNotes',
      content: `Welcome to QuickNotes! This is your personal note-taking application.

You can:
- Create new notes with the "+ New Note" button
- View all your notes on the home page
- Click on any note to view, edit, or delete it
- Use the "Generate smart title" feature when creating new notes

This is a sample note to help you get started. Feel free to delete it or edit it to make it your own!`,
    },
  })

  const note2 = await prisma.note.create({
    data: {
      title: 'Getting Started Guide',
      content: `Here are some tips for using QuickNotes effectively:

1. **Organize Your Thoughts**: Use QuickNotes to capture ideas, reminders, or any important information.

2. **Edit Anytime**: You can always come back to edit your notes. Just click on a note and hit the "Edit" button.

3. **Smart Titles**: When creating a new note, try the "Generate smart title" feature for creative inspiration!

4. **Keep It Simple**: QuickNotes is designed to be simple and fast. No need to overthink - just write!

Happy note-taking! 📝`,
    },
  })

  console.log('✅ Created sample notes:')
  console.log(`   - ${note1.title} (ID: ${note1.id})`)
  console.log(`   - ${note2.title} (ID: ${note2.id})`)
  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

