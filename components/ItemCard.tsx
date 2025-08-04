"use client";
import { differenceInCalendarDays, format } from "date-fns";
import { useEffect, useState } from "react";

export interface ItemCardProps {
  item: {
    id: number;
    imdbId: string;
    title: string;
    type: string;
    releaseDate: string | null;
    poster: string | null;
  };
  onToggleWatched: () => void;
  deleting: boolean;
}

const EyeIcon = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.269 2.943 9.542 7-1.273 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeClosedIcon = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <ellipse
      cx="12"
      cy="12"
      rx="8"
      ry="2"
      stroke="currentColor"
      fill="currentColor"
      className="opacity-80"
    />
  </svg>
);

export default function ItemCard({
  item,
  onToggleWatched,
  deleting,
}: ItemCardProps) {
  const [blink, setBlink] = useState(false);
  // Determine release status
  let status: string;
  let statusColor = "text-gray-700";
  if (item.releaseDate) {
    const releaseDate = new Date(item.releaseDate);
    const today = new Date();
    const diff = differenceInCalendarDays(releaseDate, today);
    if (diff <= 0) {
      status = "Released";
      statusColor = "text-green-600";
    } else {
      status = `${diff} day${diff === 1 ? "" : "s"} left`;
      statusColor = "text-blue-600";
    }
  } else {
    status = "Unknown release date";
    statusColor = "text-gray-400";
  }
  useEffect(() => {
    let intervalId: any;
    if (deleting) {
      intervalId = setInterval(() => {
        setBlink((prev) => !prev);
      }, 100);
    }
    return () => clearInterval(intervalId);
  }, [deleting]);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl shadow-lg p-4 hover:scale-[1.02] transition-transform duration-150">
      <div className="relative">
        {item.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.poster}
            alt={item.title}
            className="w-20 h-28 object-cover rounded-xl shadow-sm bg-white/50"
          />
        ) : (
          <div className="w-20 h-28 bg-gray-200 flex items-center justify-center rounded-xl text-gray-400 text-xs font-medium shadow-inner">
            No Image
          </div>
        )}

        {/* Watched toggle button */}
        <button
          type="button"
          onClick={onToggleWatched}
          disabled={deleting}
          className={`absolute top-1 right-1 bg-white/80 rounded-full p-1 shadow transition 
            ring-2 ring-emerald-400`}
        >
          {blink ? (
            <EyeClosedIcon
              className={`w-5 h-5 cursor-pointer text-emerald-500 text-gray-300"}`}
            />
          ) : (
            <EyeIcon
              className={`w-5 h-5 cursor-pointer text-emerald-500 text-gray-300"}`}
            />
          )}
        </button>
      </div>
      <div className="flex-1 w-full">
        <h3 className="text-xl font-semibold mb-1 text-gray-900">
          {item.title}
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <span className="text-sm capitalize text-gray-500">
            {item.type.toLowerCase()}
          </span>
          {item.releaseDate && (
            <span className="text-sm text-gray-400">
              {format(new Date(item.releaseDate), "MMM d, yyyy")}
            </span>
          )}
        </div>
      </div>
      <div className={`text-sm font-semibold ${statusColor} mt-2 sm:mt-0`}>
        {status}
      </div>
    </div>
  );
}
