import React, { useContext, useEffect, useState } from "react";
import { WishCtx } from "../../../context/WishCtx";
import Card from "../card/Card";
import "./Wishlist.css";

export default function Wishlist() {
  const { addWish, removeWish } = useContext(WishCtx);
  const [wishlist, setWishlist] = useState([]);
  const [addwishlist, setAddWishlist] = useState(addWish ? addWish : "");
  const movieSection = document.querySelector(".movie_list");

  function scrollUp(e) {
    e.stopPropagation();
    movieSection.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    const loadWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(loadWishlist);
  }, []);

  useEffect(() => {
    setAddWishlist(addWish);
  }, [addWish]);

  useEffect(() => {
    if (addwishlist && addwishlist !== undefined) {
      setWishlist((prevWishlist) => [...prevWishlist, addwishlist]);
    }
  }, [addwishlist]);

  useEffect(() => {
    if (removeWish) {
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item.id !== removeWish.id)
      );
    }
  }, [removeWish]);

  return (
    <>
      <h2 className="titleW">
        <span id="headtext">Your wishlist</span>
      </h2>
      <div className="wishlist">
        {wishlist.length > 0 && addwishlist !== undefined ? (
          wishlist.map((items) => {
            return <Card movie={items} key={items.id} id={items.id}></Card>;
          })
        ) : (
          <div className="cards" onClick={scrollUp}>
            <button id="scroll">
              <i className="fa fa-plus fa-1x" aria-hidden="true">
                <span id="scroll">Add</span>
              </i>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
