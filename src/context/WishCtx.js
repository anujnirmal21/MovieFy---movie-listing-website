import React, { createContext, useState } from "react";
const WishCtx = createContext();
const WishProvider = ({ children }) => {
  const [addWish, setAddWish] = useState("");
  const [removeWish, setRemoveWish] = useState("");
  const [likeState, setLikeState] = useState(false);
  const addtoWish = (movie) => {
    setLikeState(true);
    setAddWish(movie);
    setRemoveWish("");
    setTimeout(() => {
      setAddWish("");
    }, 1000);
    return clearTimeout();
  };

  const removeFromWish = (movie) => {
    setRemoveWish(movie);
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
