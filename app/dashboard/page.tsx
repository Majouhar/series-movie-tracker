"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBar";
import ItemCard from "../../components/ItemCard";

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
  const [tab, setTab] = useState<"MOVIE" | "SERIES">("MOVIE");

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch("/api/items");
      if (res.status === 401) {
        router.push("/login");
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
    <div className="min-h-screen bg-gradient-to-tr from-gray-50 via-white to-blue-50">
      <NavBar />
      <main className="max-w-4xl mx-auto py-10 px-4 sm:px-8">
        <h1 className="text-4xl font-extrabold mb-8 tracking-tight text-gray-900 drop-shadow-sm">
          Your <span className="text-blue-600">Dashboard</span>
        </h1>

        <div className="mb-10 flex gap-4">
          {["MOVIE", "SERIES"].map((type) => (
            <button
              key={type}
              onClick={() => setTab(type as "MOVIE" | "SERIES")}
              className={`transition-all duration-200 px-6 py-2 rounded-xl font-semibold shadow-sm border
                ${
                  tab === type
                    ? "bg-white bg-opacity-70 border-blue-500 text-blue-700 shadow-md backdrop-blur-sm"
                    : "bg-white bg-opacity-40 border-transparent text-gray-500 hover:bg-opacity-60 hover:text-blue-500"
                }
              `}
            >
              {type === "MOVIE" ? "Movies" : "Series"}
            </button>
          ))}
        </div>

        <section>
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <span className="loader animate-spin rounded-full border-4 border-blue-500 border-t-transparent h-8 w-8 mr-3"></span>
              <span className="text-gray-500 text-lg">Loading...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white/70 border border-gray-200 rounded-lg p-8 text-center shadow-inner">
              <p className="text-gray-400 text-lg">
                You have no {tab === "MOVIE" ? "movies" : "series"} added.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filtered.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>
      </main>
      <style jsx>{`
        .loader {
          display: inline-block;
        }
      `}</style>
    </div>
  );
}
