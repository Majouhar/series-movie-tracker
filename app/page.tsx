import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <h1 className="text-4xl font-extrabold mb-6 text-center">Movie &amp; Series Tracker</h1>
      <p className="mb-8 text-center text-gray-600 max-w-prose">
        Keep track of your favorite movies and TV series. Sign up to start your own watchlist and never miss a release again.
      </p>
      <div className="flex space-x-4">
        <Link href="/signup" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">Sign Up</Link>
        <Link href="/login" className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">Login</Link>
      </div>
    </div>
  );
}