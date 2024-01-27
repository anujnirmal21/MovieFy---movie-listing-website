import React, { useEffect, useState, useCallback } from "react";
import Card from "../card/Card";
import "./Movie.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Movie() {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();
  const classValue = type ? type : "popular";

  const getData = useCallback(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${
          type ? type : "popular"
        }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      )
      .then((response) => {
        setMovieList(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [type]);

  useEffect(() => {
    const idx = setTimeout(getData, 100);

    return () => {
      clearTimeout(idx);
    };
  }, [getData]);

  useEffect(() => {
    const id = setTimeout(getData, 100);

    return () => {
      clearTimeout(id);
    };
  }, [type, getData]);

  return (
    <>
      <div className="movie_list">
        <h2 className="list_title">
          <Link
            to="/movies/popular"
            id="hover"
            style={{ textDecoration: "none" }}
          >
            <span
              id="headtext"
              className={classValue === "popular" ? classValue : "none"}
            >
              Popular
            </span>
          </Link>
          <Link
            to="/movies/top_rated"
            id="hover"
            style={{ textDecoration: "none" }}
          >
            <span
              id="headtext"
              className={classValue === "top_rated" ? classValue : "none"}
            >
              Top_Rated
            </span>
          </Link>
          <Link
            to="/movies/upcoming"
            id="hover"
            style={{ textDecoration: "none" }}
          >
            <span
              id="headtext"
              className={classValue === "upcoming" ? classValue : ""}
            >
              Upcoming
            </span>
          </Link>
        </h2>
        <div className="list_cards">
          {movieList.map((movie) => {
            return <Card key={movie.id} movie={movie} type={type}></Card>;
          })}
        </div>
      </div>
    </>
  );
}
