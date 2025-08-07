export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">We couldn’t find that page.</p>
        <a
          href="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          Go back home
        </a>
      </div>
    </main>
  )
} 