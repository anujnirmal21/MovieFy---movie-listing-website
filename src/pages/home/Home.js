import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./Home.css";
import { Link } from "react-router-dom";
import Movie from "../../component/header/movielist/Movie";
import TrendToday from "../../component/header/trending/TrendToday";
import Wishlist from "../../component/header/wishlist/Wishlist";
import Error from "../home/Error/Error.js";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import RecommandedAlert from "../../component/RecommandedAlert.js";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [close, setClose] = useState(true);
  const [error, setError] = useState(null); // New state to handle errors

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
        );
        setPopularMovies(response.data.results);
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error); // Set the error state if request fails
        setLoaded(true);
      }
    };

    fetchMovies();
  }, []);

  if (error) {
    // Render error message or redirect to a network error page
    return <Error />;
  }

  return (
    <>
      {popularMovies.length > 0 && loaded ? (
        <div className="poster">
          <Carousel
            showThumbs={false}
            autoPlay={true}
            transitionTime={800}
            infiniteLoop={true}
            showStatus={false}
            interval={5000}
          >
            {popularMovies.map((movie) => {
              return (
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={`/movie/${movie.id}`}
                  key={movie.id}
                >
                  <div className="poster_image">
                    <LazyLoadImage
                      className="img"
                      src={`https://image.tmdb.org/t/p/original${
                        movie && movie.backdrop_path
                      }`}
                      alt="movie_image"
                      effect="blur"
                    />
                  </div>

                  <div className="posterImage_overlay">
                    <div className="posterImage_title">
                      {movie ? movie.original_title : ""}
                    </div>
                    <div className="posterImage_runtime">
                      {movie ? movie.release_date : ""}
                      <span className="posterImage_rating">
                        {movie ? movie.vote_average : ""}
                        <i className="fas fa-star"> </i>
                      </span>
                    </div>
                    <div className="poster_description">
                      {movie ? movie.overview : ""}
                    </div>
                  </div>
                </Link>
              );
            })}
          </Carousel>
          <TrendToday></TrendToday>
          <Movie></Movie>
          <Wishlist></Wishlist>
        </div>
      ) : (
        <div className=" flex justify-center h-[90vh] items-center relative">
          {close && <RecommandedAlert setClose={setClose} />}
          <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
        </div>
      )}
    </>
  );
}
