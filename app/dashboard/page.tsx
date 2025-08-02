"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../../components/NavBar';
import ItemCard from '../../components/ItemCard';

interface Item {
  id: number;
  imdbId: string;
  title: string;
  type: string;
  releaseDate: string | null;
  poster: string | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'MOVIE' | 'SERIES'>('MOVIE');

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch('/api/items');
      if (res.status === 401) {
        router.push('/login');
        return;
      }
      const data = await res.json();
      setItems(data.items || []);
      setLoading(false);
    }
    fetchItems();
  }, [router]);

  const filtered = items.filter((item) => item.type === tab);

  return (
    <div>
      <NavBar />
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-4">Your Dashboard</h1>
        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => setTab('MOVIE')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              tab === 'MOVIE' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => setTab('SERIES')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              tab === 'SERIES' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Series
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : filtered.length === 0 ? (
          <p>You have no {tab === 'MOVIE' ? 'movies' : 'series'} added.</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}