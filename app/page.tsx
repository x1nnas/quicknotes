import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Note } from '@/types/note'
import ExportButton from '@/components/ExportButton'

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Section */}
      <div className="mb-8 sm:mb-12 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Your Notes
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              {notes.length === 0 
                ? 'Start capturing your thoughts and ideas'
                : `${notes.length} ${notes.length === 1 ? 'note' : 'notes'}`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {notes.length > 0 && (
              <ExportButton notes={notes} variant="all" />
            )}
            <Link
              href="/new"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      {notes.length === 0 ? (
        <div className="text-center py-16 sm:py-24 animate-fade-in">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 dark:from-blue-900/30 to-indigo-100 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No notes yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Create your first note to get started</p>
            <Link
              href="/new"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Create Your First Note
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note, index) => (
            <Link
              key={note.id}
              href={`/note/${note.id}`}
              className="group block bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 p-6 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 flex-1 pr-2">
                  {note.title}
                </h3>
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-colors"></div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                {getPreview(note.content)}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {formatDate(note.createdAt)}
                </span>
                <svg className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
