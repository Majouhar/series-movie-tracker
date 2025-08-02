"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../../components/NavBar';

interface SearchResult {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [type, setType] = useState<'movie' | 'series'>('movie');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [added, setAdded] = useState<Set<string>>(new Set());

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}&type=${type}`);
    const data = await res.json();
    setResults(data.results || []);
    setLoading(false);
  };

  const handleAdd = async (imdbId: string) => {
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imdbId }),
    });
    if (res.status === 401) {
      router.push('/login');
      return;
    }
    if (res.ok) {
      setAdded(new Set(added).add(imdbId));
    }
  };

  return (
    <div>
      <NavBar />
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-4">Search Movies &amp; Series</h1>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a title..."
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'movie' | 'series')}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="movie">Movies</option>
            <option value="series">Series</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Search
          </button>
        </form>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            {results.map((item) => (
              <div key={item.imdbID} className="flex items-center space-x-4 p-4 border rounded-md bg-white shadow-sm">
                {item.Poster && item.Poster !== 'N/A' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.Poster} alt={item.Title} className="w-16 h-24 object-cover rounded" />
                ) : (
                  <div className="w-16 h-24 bg-gray-200 flex items-center justify-center rounded text-gray-500 text-sm">No Image</div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.Title}</h3>
                  <p className="text-sm text-gray-500">{item.Year}</p>
                  <p className="text-sm text-gray-500 capitalize">{item.Type}</p>
                </div>
                <button
                  disabled={added.has(item.imdbID)}
                  onClick={() => handleAdd(item.imdbID)}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    added.has(item.imdbID)
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {added.has(item.imdbID) ? 'Added' : 'Add'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}