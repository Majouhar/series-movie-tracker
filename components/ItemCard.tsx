"use client";
import { differenceInCalendarDays } from 'date-fns';

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
  if (item.releaseDate) {
    const releaseDate = new Date(item.releaseDate);
    const today = new Date();
    const diff = differenceInCalendarDays(releaseDate, today);
    if (diff <= 0) {
      status = 'Released';
    } else {
      status = `${diff} day${diff === 1 ? '' : 's'} left`;
    }
  } else {
    status = 'Unknown release date';
  }
  return (
    <div className="flex items-center space-x-4 p-4 border rounded-md bg-white shadow-sm">
      {item.poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.poster} alt={item.title} className="w-16 h-24 object-cover rounded" />
      ) : (
        <div className="w-16 h-24 bg-gray-200 flex items-center justify-center rounded text-gray-500 text-sm">No Image</div>
      )}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-500 capitalize">{item.type.toLowerCase()}</p>
      </div>
      <div className="text-sm font-medium text-gray-700">
        {status}
      </div>
    </div>
  );
}