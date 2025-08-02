"use client";
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });
    router.push('/');
  };

  // Determine if user is currently on dashboard or search; highlight accordingly
  const linkClasses = (path: string) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      pathname?.startsWith(path) ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-12 items-center">
          <div className="flex space-x-4">
            <Link href="/dashboard" className={linkClasses('/dashboard')}>
              Dashboard
            </Link>
            <Link href="/search" className={linkClasses('/search')}>
              Search
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}