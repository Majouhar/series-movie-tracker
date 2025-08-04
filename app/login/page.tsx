"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push("/dashboard");
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-900/10 via-fuchsia-900/10 to-blue-900/10 px-2 py-8">
      <div className="w-full max-w-md bg-white/10 rounded-2xl shadow-2xl px-6 py-10 sm:px-8 space-y-8 border border-fuchsia-400/20">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-slate-100 mb-2 drop-shadow">
          Login to your{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
            account
          </span>
        </h2>
        {error && (
          <div className="bg-red-100/10 border border-red-400/20 rounded-md py-2 px-3 text-center">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg border border-fuchsia-400/30 bg-white/20 px-4 py-2 shadow-sm placeholder-slate-400 text-slate-100 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-300/30 focus:outline-none transition-all"
                placeholder="Email address"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border border-fuchsia-400/30 bg-white/20 px-4 py-2 shadow-sm placeholder-slate-400 text-slate-100 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-300/30 focus:outline-none transition-all"
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg text-white font-semibold text-lg bg-gradient-to-r from-indigo-600/80 via-fuchsia-500/80 to-pink-500/80 hover:from-fuchsia-400 hover:to-pink-600 shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-fuchsia-300/30 ring-2 ring-fuchsia-300/10"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-slate-300">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-fuchsia-400 hover:underline hover:text-pink-400 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
