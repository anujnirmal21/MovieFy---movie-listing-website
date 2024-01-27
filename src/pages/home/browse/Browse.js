import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../../component/header/card/Card";
import { genere, releaeseDate } from "../../../constants";
import CheckBoxe from "../../../component/header/checkBox/CheckBoxe";

export default function Browse() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [dropdownToggle, setDropDownToggle] = useState(false);
  const [genereFilter, setGenereFilter] = useState([]);
  const [dateFilter, setDateFilter] = useState([]);
  const [uncheck, setUncheck] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let newData = [];
        for (let i = 1; i <= 20; i++) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${i}`
          );
          newData = [...newData, ...response.data.results];
        }
        setData(newData);
        setOriginalData(newData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    setTimeout(() => {
      setLoaded(true);
    }, 300);
  }, []);

  const handleClick = () => {
    setDropDownToggle(!dropdownToggle);
    setData(originalData);
  };

  const handleApply = () => {
    setDropDownToggle(!dropdownToggle);

    let newData = [...originalData];

    // Filter by genre
    if (genereFilter.length > 0) {
      newData = data.filter((item) =>
        genereFilter.some((genreId) =>
          item.genre_ids.includes(parseInt(genreId))
        )
      );
    }

    // Filter by release date
    if (dateFilter.length > 0) {
      newData = newData.filter((item) =>
        dateFilter.includes(item.release_date.toString().slice(0, 4))
      );
    }

    setData(newData);
    setGenereFilter([]);
    setDateFilter([]);
    setUncheck(true);
  };

  const handleChange = (e) => {
    const genreId = e.target.value;
    setGenereFilter((genereFilter) => {
      if (genereFilter.includes(genreId)) {
        return genereFilter.filter((id) => id !== genreId);
      } else {
        return [...genereFilter, genreId];
      }
    });
  };

  const filterDate = (e) => {
    const year = e.target.value;
    setDateFilter((dateFilter) => {
      if (dateFilter.includes(year)) {
        return dateFilter.filter((y) => y !== year);
      } else {
        return [...dateFilter, year];
      }
    });
  };

  // if (data.length > 1) {
  //   console.log(data);
  // }

  return (
    <div>
      {data.length > 0 && loaded ? (
        <div className=" flex flex-col gap-8">
          <span id="headtext" className=" ml-4">
            Explore All Movies
          </span>
          <div className=" flex justify-center items-start flex-col bg-slate-800 rounded-md">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 p-10 m-10"
              type="button"
              onClick={handleClick}
            >
              <p className=" flex-1 flex-col">
                <span className=" text-2xl">Filters </span>
                <span className="p-3 text-sm">
                  {`Genere:(${genereFilter.length})  release-date:(${dateFilter.length})`}
                </span>
              </p>

              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <ul
              className={`flex gap-20 ml-10 mb-10 ${
                dropdownToggle ? "" : "hidden"
              }`}
            >
              <li>
                <p className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center text-2xl font-serif ">
                  genere
                </p>
                {/* Dropdown menu */}
                <div
                  className={`z-10  w-48 mt-4 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                >
                  <ul
                    className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownCheckboxButton"
                  >
                    {genere.map((item) => (
                      <CheckBoxe
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        handleChange={handleChange}
                        uncheck={uncheck}
                      ></CheckBoxe>
                    ))}
                  </ul>
                </div>
              </li>
              <li>
                <p
                  className="text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-2xl px-5 py-2.5 text-center inline-flex items-center font-serif"
                  type="button"
                >
                  release Date
                </p>
                {/* Dropdown menu */}
                <div
                  className={`z-10  w-48 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                >
                  <ul
                    className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownCheckboxButton"
                  >
                    {releaeseDate.map((item) => (
                      <CheckBoxe
                        key={item}
                        id={item}
                        name={item}
                        handleChange={filterDate}
                        uncheck={uncheck}
                      ></CheckBoxe>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
            <button
              className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 p-10 m-10 h-12 w-20 ${
                dropdownToggle ? "" : "hidden"
              }`}
              type="button"
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
          <div>
            {data.map((movie) => (
              <Card movie={movie} key={Math.random()}></Card>
            ))}
          </div>
        </div>
      ) : (
        <div className=" flex justify-center h-[90vh] items-center">
          <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
        </div>
      )}
    </div>
  );
}
