import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Note } from '@/types/note'

// Helper function to get preview text (first 150 characters)
function getPreview(content: string): string {
  return content.length > 150 ? content.substring(0, 150) + '...' : content
}

// Helper function to format date
function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

async function getNotes(): Promise<Note[]> {
  try {
    const notes = await prisma.note.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return notes
  } catch (error) {
    console.error('Error fetching notes:', error)
    return []
  }
}

export default async function HomePage() {
  const notes = await getNotes()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Your Notes</h2>
        <Link
          href="/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          + Create New Note
        </Link>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-500 text-lg mb-4">No notes yet</p>
          <Link
            href="/new"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Create your first note →
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {notes.map((note) => (
            <Link
              key={note.id}
              href={`/note/${note.id}`}
              className="block bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {note.title}
                </h3>
                <span className="text-sm text-gray-500">
                  {formatDate(note.createdAt)}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {getPreview(note.content)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
