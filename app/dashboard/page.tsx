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
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [animEffect, setAnimEffect] = useState(false);

  const handleDelete = async (id: number) => {
    const item = items.find((i) => i.id === id);
    const confirmed = window.confirm(
      `Are you sure you want to remove "${item?.title}" from your list?`
    );
    if (!confirmed) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        const error = await res.json();
        alert(error?.error || "Failed to delete item.");
      }
    } catch {
      alert("An unexpected error occurred.");
    } finally {
      setDeletingId(null);
    }
  };

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

  useEffect(() => {
    setAnimEffect(true);
  }, []);

  const filtered = items.filter((item) => item.type === tab);

  return (
    <div
      className={`min-h-screen bg-gradient-to-tr from-indigo-900/10 via-fuchsia-900/10 to-blue-900/10 transition-all  duration-4000  ${
        animEffect ? "backdrop-blur-xl" : ""
      }`}
    >
      <NavBar />
      <main className="max-w-4xl mx-auto py-10 px-4 sm:px-8">
        <h1 className="text-4xl font-extrabold mb-8 tracking-tight text-slate-100 drop-shadow-lg">
          Your{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent drop-shadow">
            Dashboard
          </span>
        </h1>

        {/* Glassy Tab Buttons */}
        <div className="mb-10 flex gap-4">
          {["MOVIE", "SERIES"].map((type) => (
            <button
              key={type}
              onClick={() => setTab(type as "MOVIE" | "SERIES")}
              className={`transition-all duration-200 px-6 py-2 rounded-xl font-semibold shadow-lg border text-lg
                ${
                  tab === type
                    ? "bg-gradient-to-tr from-indigo-600/80 via-fuchsia-500/80 to-pink-400/80 border-fuchsia-400/40 text-white ring-2 ring-fuchsia-300/30 backdrop-blur"
                    : "bg-white/20 border-transparent text-slate-100 hover:bg-fuchsia-400/20 hover:text-white hover:border-fuchsia-300/20 backdrop-blur-sm"
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
              <span className="loader animate-spin rounded-full border-4 border-fuchsia-500 border-t-transparent h-8 w-8 mr-3"></span>
              <span className="text-fuchsia-200 text-lg">Loading...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white/20 border border-fuchsia-400/20 rounded-xl p-8 text-center shadow-xl backdrop-blur">
              <p className="text-fuchsia-200 text-lg">
                You have no {tab === "MOVIE" ? "movies" : "series"} added.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filtered.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onToggleWatched={() => handleDelete(item.id)}
                  deleting={deletingId === item.id}
                />
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
