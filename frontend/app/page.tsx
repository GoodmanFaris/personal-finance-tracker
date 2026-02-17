export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-2xl">
        
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
          Personal Finance Tracker
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Track your income, manage expenses, and stay in control of your finances.
        </p>

        <a
          href="/register"
          className="inline-block mt-10 rounded-lg bg-gray-900 px-6 py-3 text-white font-medium hover:bg-black transition"
        >
          Get Started
        </a>

      </div>
    </main>
  );
}
