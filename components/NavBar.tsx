"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  // Updated for glass + violet-indigo accent
  const linkClasses = (path: string) =>
    `px-4 py-2 rounded-lg font-semibold transition-all duration-150
    ${
      pathname?.startsWith(path)
        ? "bg-gradient-to-tr from-indigo-600/70 to-fuchsia-500/70 text-white shadow-xl backdrop-blur-sm ring-2 ring-fuchsia-300/30"
        : "text-slate-100/90 hover:bg-gradient-to-r hover:from-indigo-500/40 hover:to-fuchsia-500/30 hover:text-white hover:shadow-lg hover:backdrop-blur"
    }`;

  return (
    <nav className="bg-slate-900/50 backdrop-blur-xl border-b border-violet-300/20 shadow-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/dashboard" className={linkClasses("/dashboard")}>
              Dashboard
            </Link>
            <Link href="/search" className={linkClasses("/search")}>
              Search
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg font-semibold bg-white/20 text-slate-100 hover:bg-fuchsia-400/30 hover:text-white border border-white/10 hover:border-fuchsia-300/30 transition-all shadow focus:outline-none focus:ring-2 focus:ring-fuchsia-300/30 backdrop-blur"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
