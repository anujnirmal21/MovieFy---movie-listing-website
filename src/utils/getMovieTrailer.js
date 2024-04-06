import axios from "axios";

const API_KEY = "4e44d9029b1270a757cddc766a1bcb63";

async function getMovieTrailer(id) {
  try {
    // Fetch movie videos
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      {
        params: {
          api_key: API_KEY,
        },
      }
    );

    // Check if videos are available
    if (
      response.data &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      // Filter trailers
      const trailers = response.data.results.filter(
        (video) => video.type === "Trailer" || video.type === "Teaser"
      );

      // Check if any trailers are found
      if (trailers.length > 0) {
        // Get the first trailer link
        const trailerKey = trailers[0].key;
        const trailerLink = `https://www.youtube.com/watch?v=${trailerKey}`; // Assuming YouTube

        return trailerLink;
      } else {
        return null; // No trailers found
      }
    } else {
      return null; // No videos available
    }
  } catch (error) {
    console.error("Error fetching movie trailer:", error);
    return null; // Error occurred
  }
}

export default getMovieTrailer;
