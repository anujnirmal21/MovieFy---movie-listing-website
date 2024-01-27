import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/header/Header";
import Home from "./pages/home/Home";
import MovieDetail from "./pages/home/MovieDetail/MovieDetail";
import Sticky from "react-stickynode";
import Search from "./pages/home/search/Search";
import News from "./pages/home/news/News";
import Footer from "./component/header/footer/Footer";
import Error from "./pages/home/Error/Error";
import Browse from "./pages/home/browse/Browse";

export default function App() {
  const [init, setInit] = useState();

  function getValue(value) {
    setInit(value);
  }

  return (
    <>
      <div className="App">
        <Router>
          {/* stickynode library */}
          <Sticky innerZ={5000} top="#header" bottomBoundary="#body">
            <Header inputValue={getValue}></Header>
          </Sticky>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route
              path="/movie/:id"
              element={<MovieDetail></MovieDetail>}
            ></Route>
            <Route
              path="/search"
              element={<Search input={init}></Search>}
            ></Route>
            <Route path="/news" element={<News></News>}></Route>
            <Route path="/movies/:type" element={<Home></Home>}></Route>
            <Route path="/browse" element={<Browse></Browse>}></Route>
            <Route path="*" element={<Error></Error>}></Route>
          </Routes>
        </Router>
      </div>
      <Footer></Footer>
    </>
  );
}
