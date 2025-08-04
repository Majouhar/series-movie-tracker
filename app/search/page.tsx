"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBar";
import { THEME } from "../../lib/constants";

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
    const res = await fetch(
      `/api/search?q=${encodeURIComponent(query.trim())}&type=${type}`
    );
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
    <div className={`min-h-screen bg-gradient-to-tr ${THEME.background} `}>
      <NavBar />
      <div className="max-w-4xl mx-auto py-8 px-3 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-slate-100 text-center tracking-tight drop-shadow-lg">
          Search{" "}
          <span
            className={`bg-gradient-to-r ${THEME.textClass} bg-clip-text text-transparent`}
          >
            Movies
          </span>{" "}
          &amp;{" "}
          <span
            className={`bg-gradient-to-r ${THEME.textReverse} bg-clip-text text-transparent`}
          >
            Series
          </span>
        </h1>
        <form
          onSubmit={handleSearch}
          className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-fuchsia-400/20 p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-center mb-8"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-4 py-2 rounded-lg border border-fuchsia-400/30 bg-white/20 shadow focus:outline-none focus:ring-2 focus:ring-fuchsia-300/30 text-slate-100 placeholder:text-slate-300 transition-all w-full sm:w-auto backdrop-blur"
            placeholder="Enter a title..."
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "movie" | "series")}
            className="px-4 py-2 rounded-lg border border-fuchsia-400/20 bg-white/20 shadow focus:outline-none focus:ring-2 focus:ring-fuchsia-300/30 text-slate-100 transition-all backdrop-blur"
          >
            <option value="movie">Movies</option>
            <option value="series">Series</option>
          </select>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-600/80 via-fuchsia-500/80 to-pink-500/80 hover:from-fuchsia-400 hover:to-pink-600 shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-fuchsia-300/30 ring-2 ring-fuchsia-300/10"
          >
            Search
          </button>
        </form>
        {error && (
          <div className="mb-4 text-center">
            <p className="text-red-400 bg-red-100/10 border border-red-400/20 rounded-md py-2 px-3 inline-block">
              {error}
            </p>
          </div>
        )}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <span className="loader animate-spin rounded-full border-4 border-fuchsia-500 border-t-transparent h-8 w-8 mr-3"></span>
            <span className="text-fuchsia-200 text-lg">Searching...</span>
          </div>
        ) : (
          <div>
            {results.length === 0 ? (
              <div className="text-center py-16 text-slate-400 text-lg">
                No results yet. Try searching for something!
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                {results.map((item) => (
                  <div
                    key={item.imdbID}
                    className="flex gap-4 items-center bg-white/10 rounded-2xl shadow-xl p-4 border border-fuchsia-400/20 backdrop-blur-xl transition-all hover:scale-[1.03]"
                  >
                    {item.Poster && item.Poster !== "N/A" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.Poster}
                        alt={item.Title}
                        className="w-16 h-24 object-cover rounded-lg shadow-md bg-white/20"
                      />
                    ) : (
                      <div className="w-16 h-24 bg-slate-300/10 flex items-center justify-center rounded-lg text-slate-400 text-xs">
                        No Image
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-100">
                        {item.Title}
                      </h3>
                      <p className="text-sm text-slate-300">{item.Year}</p>
                      <p className="text-sm text-slate-400 capitalize">
                        {item.Type}
                      </p>
                    </div>
                    <button
                      disabled={added.has(item.imdbID)}
                      onClick={() => handleAdd(item.imdbID)}
                      className={`px-4 py-2 text-sm font-semibold rounded-lg shadow transition-all ring-2 ring-fuchsia-300/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-300/30 
                        ${
                          added.has(item.imdbID)
                            ? "bg-slate-500/30 text-slate-200 cursor-not-allowed"
                            : "bg-gradient-to-r from-green-500/80 to-green-400/70 text-white hover:from-green-400 hover:to-fuchsia-400/80"
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
