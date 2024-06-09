import React, { useEffect, useState, useContext } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import "./Card.css";
import { WishCtx } from "../../../context/WishCtx";

export default function Card({ movie, type, id }) {
  const [isLoading, setisLoading] = useState(true);
  const { addtoWish, removeFromWish } = useContext(WishCtx);
  const [Wish, setWish] = useState(id);
  function handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
    if (Wish) {
      removeFromWish(movie);
      setWish(!Wish);
    } else {
      addtoWish(movie);
      setWish(!Wish);
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 2000);
  }, [type]);

  return (
    <>
      {isLoading ? (
        <div className="cards">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2}></Skeleton>
          </SkeletonTheme>
        </div>
      ) : movie !== undefined ? (
        <Link
          to={`/movie/${movie.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className="cards">
            <span className="wishbtn-sm">
              <button onClick={handleClick} id="wishbtn">
                <i
                  className="fa fa-heart fa-2x"
                  id={id || Wish ? "wished" : "wished-rmv"}
                  aria-hidden="true"
                ></i>
              </button>
            </span>
            <img
              className="cards_img"
              alt="poster"
              src={
                movie && movie.poster_path
                  ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                  : "https://cdn.dribbble.com/userupload/8749861/file/original-fa2a616798cf8402c11a8daecb2206f7.png?resize=400x300&vertical=center"
              }
            />
            <div className="card_overlay">
              <div className="cards_title">
                {movie ? movie.original_title : ""}
              </div>
              <div className="cards_runtime">
                {movie ? movie.release_date : ""}
                <span className="card_rating">
                  {movie ? movie.vote_average : ""}
                  <i className="fas fa-star"> </i>
                </span>
              </div>
              <div className="cards_description">
                {movie ? movie.overview.slice(0, 118) + "..." : ""}
              </div>
            </div>
          </div>
        </Link>
      ) : (
        ""
      )}
    </>
  );
}
