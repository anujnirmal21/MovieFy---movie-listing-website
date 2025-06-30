export const config = {
  runtime: "edge",
};

export async function GET(req) {
  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const url = new URL(req.url);
  const path = url.pathname.replace("/api/tmdb/", "");
  const search = url.search;

  const tmdbUrl = `https://api.themoviedb.org/3/${path}${
    search ? search + "&" : "?"
  }api_key=${TMDB_API_KEY}`.replace("?&", "?");

  const response = await fetch(tmdbUrl);
  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
