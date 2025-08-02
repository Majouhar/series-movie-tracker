import { format, parse } from 'date-fns';

const API_KEY = process.env.OMDB_API_KEY || '';
const BASE_URL = 'https://www.omdbapi.com/';

export type OmdbSearchItem = {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
};

export async function searchOMDb(query: string, type: 'movie' | 'series') {
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=${type}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.Response === 'True') {
    return data.Search as OmdbSearchItem[];
  }
  return [];
}

export async function getOMDbDetails(imdbID: string) {
  const url = `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=short`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.Response === 'True') {
    // Parse the "Released" field if it exists (e.g. "15 Mar 2024")
    let releaseDate: Date | null = null;
    if (data.Released && data.Released !== 'N/A') {
      try {
        releaseDate = parse(data.Released, 'dd MMM yyyy', new Date());
      } catch {
        releaseDate = null;
      }
    }
    return {
      imdbId: data.imdbID,
      title: data.Title,
      type: data.Type,
      releaseDate,
      poster: data.Poster !== 'N/A' ? data.Poster : null,
    };
  }
  return null;
}