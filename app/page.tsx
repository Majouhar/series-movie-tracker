import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 via-white to-blue-100 px-2">
      <div className="w-full max-w-xl mx-auto bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl px-6 py-14 flex flex-col items-center border border-blue-100">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-center tracking-tight text-gray-900 drop-shadow">
          Movie <span className="text-blue-600">&amp;</span> Series Tracker
        </h1>
        <p className="mb-10 text-center text-gray-600 max-w-prose text-lg">
          Keep track of your favorite movies and TV series.
          <br className="hidden sm:block" />
          Sign up to start your own watchlist and never miss a release again.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            href="/signup"
            className="w-full sm:w-auto px-8 py-3 rounded-lg text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow hover:from-blue-700 hover:to-blue-600 transition-all text-center"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-3 rounded-lg text-lg font-semibold bg-gray-200 text-gray-700 shadow hover:bg-gray-300 transition-all text-center"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
