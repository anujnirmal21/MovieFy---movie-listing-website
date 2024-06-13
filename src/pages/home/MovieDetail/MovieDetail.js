import React, { useEffect, useState } from "react";
import "./MovieDetail.css";
import getMovieTrailer from "../../../utils/getMovieTrailer";
import { useParams } from "react-router-dom";
import axios from "axios";
import YoutubePlayer from "../../../component/header/trailer/YoutubePlayer.js";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const MovieDetail = () => {
  const [currentMovieDetail, setMovie] = useState([]);
  const [trailer, setTrailer] = useState("");
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();

  // Function to get trailer link of a movie

  getMovieTrailer(id)
    .then((trailerLink) => {
      if (trailerLink) {
        setTrailer(trailerLink);
      } else {
        console.log("No trailer found for the movie.");
      }
    })
    .catch((error) => {
      console.error("Error getting movie trailer:", error);
    });

  useEffect(() => {
    const getData = () => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
        )
        .then((response) => {
          setMovie(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getData();
    window.scrollTo(0, 0);

    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [id]);

  // if (currentMovieDetail !== []) {
  //   console.log(currentMovieDetail);
  // }

  if (!loaded) {
    return (
      <SkeletonTheme color="#202020" highlightColor="#444">
        <div className="mt-4 mb-10">
          {/* YouTube Video Skeleton */}
          <Skeleton className="lg:w-[80vw] lg:h-[80vh] object-contain w-[100vw] h-[40vh] flex justify-center items-center bg-neutral-800 rounded-md  mb-10 " />

          {/* Spacing */}
          <Skeleton className=" mt-12 mb-5" height={50} width={300}></Skeleton>

          {/* Poster Image Skeleton */}
          <Skeleton className=" mb-10" height="80vh" />
        </div>
        <div className="mt-4 mb-10">
          {/* YouTube Video Skeleton */}
          <Skeleton className="lg:w-[80vw] lg:h-[80vh] object-contain w-[100vw] h-[40vh] flex justify-center items-center bg-neutral-800 rounded-md  mb-10 " />

          {/* Spacing */}
          <Skeleton className=" mt-12 mb-5" height={50} width={300}></Skeleton>

          {/* Poster Image Skeleton */}
          <Skeleton className=" mb-10" height="80vh" />
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <div>
      <>
        <div className="movie">
          <div className=" mt-4 mb-10">
            <YoutubePlayer videoUrl={trailer} />
          </div>
          <h1 className=" text-[3rem] m-8 p-10 font-bold">Movie Overview</h1>
          <div className="movie__intro">
            <LazyLoadImage
              src={
                currentMovieDetail && currentMovieDetail.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${currentMovieDetail.backdrop_path}`
                  : "https://placehold.it/838x471?text=Loading"
              }
              alt="img"
              width="100%"
              height="inherit"
              effect="blur"
              placeholderSrc="https://placehold.it/838x471?text=Loading"
            />
          </div>
          <div className="movie__detail">
            <div className="movie__detailLeft">
              <div className="movie__posterBox">
                <img
                  className="movie__poster"
                  src={`https://image.tmdb.org/t/p/original${
                    currentMovieDetail ? currentMovieDetail.poster_path : ""
                  }`}
                  alt="img"
                />
              </div>
            </div>
            <div className="movie__detailRight">
              <div className="movie__detailRightTop">
                <div className="movie__name">
                  {currentMovieDetail ? currentMovieDetail.original_title : ""}
                </div>
                <div className="movie__tagline">
                  {currentMovieDetail ? currentMovieDetail.tagline : ""}
                </div>
                <div className="movie__rating">
                  {currentMovieDetail ? currentMovieDetail.vote_average : ""}{" "}
                  <i className="fas fa-star" />
                  <span className="movie__voteCount">
                    {currentMovieDetail
                      ? "(" + currentMovieDetail.vote_count + ") votes"
                      : ""}
                  </span>
                </div>
                <div className="movie__runtime">
                  {currentMovieDetail
                    ? currentMovieDetail.runtime + " mins"
                    : ""}
                </div>
                <div className="movie__releaseDate">
                  {currentMovieDetail
                    ? "Release date: " + currentMovieDetail.release_date
                    : ""}
                </div>
                <div className="movie__genres">
                  {currentMovieDetail && currentMovieDetail.genres
                    ? currentMovieDetail.genres.map((genre) => (
                        <>
                          <span
                            className="movie__genre"
                            id={genre.id}
                            key={genre.id}
                          >
                            {genre.name}
                          </span>
                        </>
                      ))
                    : ""}
                </div>
              </div>
              <div className="movie__detailRightBottom">
                <div className="synopsisText">Synopsis</div>
                <div className=" lg:text-lg text-[2rem]">
                  {currentMovieDetail ? currentMovieDetail.overview : ""}
                </div>
              </div>
            </div>
          </div>

          <div className="movie__links">
            <div className="movie__heading">Useful Links</div>
            {currentMovieDetail && currentMovieDetail.homepage && (
              <a
                href={currentMovieDetail.homepage}
                target="blank"
                style={{ textDecoration: "none" }}
              >
                <p>
                  <span className="movie__homeButton movie__Button">
                    Homepage <i className="newTab fas fa-external-link-alt"></i>
                  </span>
                </p>
              </a>
            )}
            {currentMovieDetail && currentMovieDetail.imdb_id && (
              <a
                href={
                  "https://www.imdb.com/title/" + currentMovieDetail.imdb_id
                }
                target="blank"
                style={{ textDecoration: "none" }}
              >
                <p>
                  <span className="movie__imdbButton movie__Button">
                    IMDb<i className="newTab fas fa-external-link-alt"></i>
                  </span>
                </p>
              </a>
            )}
          </div>

          <div className="movie__heading">Production companies</div>
          <div className="movie__production">
            {currentMovieDetail &&
              currentMovieDetail.production_companies &&
              currentMovieDetail.production_companies.map((company) => (
                <>
                  {company.logo_path && (
                    <span
                      className="productionCompanyImage"
                      key={company.logo_path}
                    >
                      <img
                        className="movie__productionComapany"
                        src={
                          "https://image.tmdb.org/t/p/original" +
                          company.logo_path
                        }
                        alt="img"
                      />
                      <span>{company.name}</span>
                    </span>
                  )}
                </>
              ))}
          </div>
        </div>
      </>
    </div>
  );
};

export default MovieDetail;
