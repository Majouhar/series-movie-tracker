import Link from "next/link";
import { THEME } from "../lib/constants";

export default function Home() {
  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-tr ${THEME.background}  px-2`}
    >
      <div className="w-full max-w-xl mx-auto bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl px-6 py-14 flex flex-col items-center border border-fuchsia-400/20">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-center tracking-tight text-slate-100 drop-shadow-xl">
          Movie{" "}
          <span
            className={`bg-gradient-to-r ${THEME.textClass} bg-clip-text text-transparent`}
          >
            &amp;
          </span>{" "}
          Series Tracker
        </h1>
        <p className="mb-10 text-center text-slate-300 max-w-prose text-lg">
          Keep track of your favorite movies and TV series.
          <br className="hidden sm:block" />
          Sign up to start your own watchlist and never miss a release again.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            href="/signup"
            className="w-full sm:w-auto px-8 py-3 rounded-lg text-lg font-semibold bg-gradient-to-r from-indigo-600/80 via-fuchsia-500/80 to-pink-500/80 text-white shadow-xl hover:from-fuchsia-500 hover:to-pink-600 transition-all text-center focus:outline-none focus:ring-2 focus:ring-fuchsia-300/30 ring-2 ring-fuchsia-300/10"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-3 rounded-lg text-lg font-semibold bg-white/20 text-slate-100 shadow hover:bg-fuchsia-400/20 transition-all text-center focus:outline-none focus:ring-2 focus:ring-fuchsia-300/30 border border-fuchsia-400/10"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
