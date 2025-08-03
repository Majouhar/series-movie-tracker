"use client";
import { differenceInCalendarDays, format } from 'date-fns';

export interface ItemCardProps {
  item: {
    id: number;
    imdbId: string;
    title: string;
    type: string;
    releaseDate: string | null;
    poster: string | null;
  };
}

export default function ItemCard({ item }: ItemCardProps) {
  // Determine release status
  let status: string;
  let statusColor = "text-gray-700";
  if (item.releaseDate) {
    const releaseDate = new Date(item.releaseDate);
    const today = new Date();
    const diff = differenceInCalendarDays(releaseDate, today);
    if (diff <= 0) {
      status = 'Released';
      statusColor = "text-green-600";
    } else {
      status = `${diff} day${diff === 1 ? '' : 's'} left`;
      statusColor = "text-blue-600";
    }
  } else {
    status = 'Unknown release date';
    statusColor = "text-gray-400";
  }
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl shadow-lg p-4 hover:scale-[1.02] transition-transform duration-150">
      {item.poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.poster} alt={item.title} className="w-20 h-28 object-cover rounded-xl shadow-sm bg-white/50" />
      ) : (
        <div className="w-20 h-28 bg-gray-200 flex items-center justify-center rounded-xl text-gray-400 text-xs font-medium shadow-inner">
          No Image
        </div>
      )}
      <div className="flex-1 w-full">
        <h3 className="text-xl font-semibold mb-1 text-gray-900">{item.title}</h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <span className="text-sm capitalize text-gray-500">
            {item.type.toLowerCase()}
          </span>
          {item.releaseDate && (
            <span className="text-sm text-gray-400">
              {format(new Date(item.releaseDate), 'MMM d, yyyy')}
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
