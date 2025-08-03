"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    router.push("/");
  };

  const linkClasses = (path: string) =>
    `px-4 py-2 rounded-lg font-semibold transition-all duration-150
    ${
      pathname?.startsWith(path)
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
    }`;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 shadow-lg">
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
            className="px-4 py-2 rounded-lg font-semibold text-gray-700 bg-white/80 hover:bg-red-50 hover:text-red-500 border border-transparent hover:border-red-200 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-red-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
