import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center animate-fade-in">
      <div className="mb-8">
        <div className="text-9xl font-bold bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-600 bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Note Not Found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          The note you're looking for doesn't exist or has been deleted.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to Home</span>
      </Link>
    </div>
  )
}

