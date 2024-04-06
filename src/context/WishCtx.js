import React, { createContext, useState } from "react";

const WishCtx = createContext();
const WishProvider = ({ children }) => {
  const [addWish, setAddWish] = useState("");
  const [removeWish, setRemoveWish] = useState("");
  const [likeState, setLikeState] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const addtoWish = (movie) => {
    setLikeState(!likeState);

    if (movie && movie !== undefined) {
      setWishlist((prevWishlist) => [...prevWishlist, movie]);
      localStorage.setItem("wishlist", JSON.stringify([...wishlist, movie]));
    }

    setAddWish(movie);
    setRemoveWish("");
    setTimeout(() => {
      setAddWish("");
    }, 1);
    return clearTimeout();
  };

  const removeFromWish = (movie) => {
    setRemoveWish(movie);

    if (movie && movie !== undefined) {
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item.id !== movie.id)
      );
      localStorage.setItem(
        "wishlist",
        JSON.stringify([...wishlist].filter((item) => item.id !== movie.id))
      );
    }

    setAddWish("");
    setLikeState(false);
  };

  return (
    <WishCtx.Provider
      value={{
        addtoWish,
        addWish,
        removeWish,
        removeFromWish,
        likeState,
      }}
    >
      {children}
    </WishCtx.Provider>
  );
};

export { WishCtx, WishProvider };
