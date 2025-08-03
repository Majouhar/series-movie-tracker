"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBar";

interface SearchResult {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"movie" | "series">("movie");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [added, setAdded] = useState<Set<string>>(new Set());

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!query.trim()) {
      setError("Please enter a search term");
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}&type=${type}`);
    const data = await res.json();
    setResults(data.results || []);
    setLoading(false);
  };

  const handleAdd = async (imdbId: string) => {
    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imdbId }),
    });
    if (res.status === 401) {
      router.push("/login");
      return;
    }
    if (res.ok) {
      setAdded(new Set(added).add(imdbId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100">
      <NavBar />
      <div className="max-w-4xl mx-auto py-8 px-3 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-gray-900 text-center tracking-tight">
          Search <span className="text-blue-600">Movies</span> &amp; <span className="text-blue-600">Series</span>
        </h1>
        <form
          onSubmit={handleSearch}
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100 p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-center mb-8"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-4 py-2 rounded-lg border border-gray-300 bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-900 transition-all w-full sm:w-auto"
            placeholder="Enter a title..."
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "movie" | "series")}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-700 transition-all"
          >
            <option value="movie">Movies</option>
            <option value="series">Series</option>
          </select>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Search
          </button>
        </form>
        {error && (
          <div className="mb-4 text-center">
            <p className="text-red-500 bg-red-50 border border-red-200 rounded-md py-2 px-3 inline-block">{error}</p>
          </div>
        )}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <span className="loader animate-spin rounded-full border-4 border-blue-500 border-t-transparent h-8 w-8 mr-3"></span>
            <span className="text-gray-500 text-lg">Searching...</span>
          </div>
        ) : (
          <div>
            {results.length === 0 ? (
              <div className="text-center py-16 text-gray-400 text-lg">No results yet. Try searching for something!</div>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                {results.map((item) => (
                  <div
                    key={item.imdbID}
                    className="flex gap-4 items-center bg-white/80 rounded-xl shadow-md p-4 border border-gray-100 backdrop-blur-md transition-all hover:scale-[1.02]"
                  >
                    {item.Poster && item.Poster !== "N/A" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.Poster}
                        alt={item.Title}
                        className="w-16 h-24 object-cover rounded-md shadow-sm"
                      />
                    ) : (
                      <div className="w-16 h-24 bg-gray-200 flex items-center justify-center rounded-md text-gray-500 text-xs">
                        No Image
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{item.Title}</h3>
                      <p className="text-sm text-gray-500">{item.Year}</p>
                      <p className="text-sm text-gray-500 capitalize">{item.Type}</p>
                    </div>
                    <button
                      disabled={added.has(item.imdbID)}
                      onClick={() => handleAdd(item.imdbID)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg shadow transition-all focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                        added.has(item.imdbID)
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      {added.has(item.imdbID) ? "Added" : "Add"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <style jsx>{`
        .loader {
          display: inline-block;
        }
      `}</style>
    </div>
  );
}
