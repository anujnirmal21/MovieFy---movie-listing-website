export const config = {
  runtime: "edge",
};

export async function GET(req: Request) {
  const TMDB_API_KEY = "4e44d9029b1270a757cddc766a1bcb63";
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
