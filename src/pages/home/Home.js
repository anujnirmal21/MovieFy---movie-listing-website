import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./Home.css";
import { Link } from "react-router-dom";
import Movie from "../../component/header/movielist/Movie";
import TrendToday from "../../component/header/trending/TrendToday";
import Wishlist from "../../component/header/wishlist/Wishlist";
import axios from "axios";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const apicall = async () => {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
        );
        setPopularMovies(response.data.results);
      };

      apicall();
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  return (
    <>
      {popularMovies && loaded ? (
        <div className="poster">
          <Carousel
            showThumbs={true}
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
                    <img
                      src={`https://image.tmdb.org/t/p/original${
                        movie && movie.backdrop_path
                      }`}
                      alt="movie_image"
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
        <div className=" flex justify-center h-[90vh] items-center">
          <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
        </div>
      )}
    </>
  );
}
