import React, { useState } from "react";
import "./pagination.css";

export default function Pagination({
  totalitems,
  itemPerPage,
  setCurrentPage,
}) {
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalitems / itemPerPage); i++) {
    pages.push(i);
  }

  console.log(totalitems + " " + itemPerPage);
  const [CurrentView, setCurrentView] = useState();

  function handleChange(item) {
    setCurrentView(item);
    setCurrentPage(item);
  }
  return (
    <div className="page-box">
      {pages.map((item, idx) => (
        <button
          className={`page-mark ${CurrentView === item ? "marked" : "non"}`}
          key={idx}
          onClick={() => handleChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
