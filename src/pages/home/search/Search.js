import React, { useEffect, useState } from "react";
import "./Search.css";
import axios from "axios";
import Card from "../../../component/header/card/Card";
import { Link } from "react-router-dom";

export default function Search({ input }) {
  const [searchItem, setSearchItem] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
  const loadWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

  useEffect(() => {
    setSearchItem(input);
  }, [input]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = [];
        for (let i = 0; i < 20; i++) {
          requests.push(
            axios.get(
              `https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${
                i + 1
              }`
            )
          );
        }
        const responses = await Promise.all(requests);
        const newData = responses.flatMap((response) => response.data.results);
        setData(newData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchItem) {
      const filtered = data.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchItem.toLowerCase())
      );
      const uniqueFiltered = Array.from(
        new Set(filtered.map((movie) => movie.id))
      ).map((id) => filtered.find((movie) => movie.id === id));
      setFilteredData(uniqueFiltered);

      const searchFiltered = data.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchItem.toLowerCase())
      );
      const uniqueSearchFiltered = Array.from(
        new Set(searchFiltered.map((movie) => movie.id))
      ).map((id) => searchFiltered.find((movie) => movie.id === id));

      setSearchFilter(
        uniqueSearchFiltered.length > 0
          ? uniqueSearchFiltered
          : [{ id: 0, result: "No results" }]
      );
    } else {
      setFilteredData([]);
      setSearchFilter([]);
    }
  }, [searchItem, data]);

  return (
    <>
      <div className="suggestion" id={input ? "visible" : ""}>
        {searchFilter.map((item) => (
          <div
            id={input && item ? "visible" : ""}
            className="blockSearch"
            key={item.id}
          >
            <span id="page">
              {item.result ? (
                item.result
              ) : (
                <Link
                  to={`/movie/${item.id}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {item.original_title}
                </Link>
              )}
            </span>
          </div>
        ))}
      </div>
      {searchItem === "" ? (
        <div className="searchpage">moviefy search page</div>
      ) : (
        ""
      )}
      {searchItem !== "" ? (
        <div className="searchSection">
          <h2 className="searchWord">{`Movies results for "${searchItem}"`}</h2>
          {filteredData.length > 0 ? (
            filteredData.map((movie) => (
              <Card
                key={movie.id}
                movie={movie}
                id={
                  loadWishlist.some((item) => item.id === movie.id)
                    ? true
                    : false
                }
              ></Card>
            ))
          ) : (
            <div className="searchpage">
              No search results for "{searchItem}"
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
