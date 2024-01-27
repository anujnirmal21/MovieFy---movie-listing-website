import { React, useEffect, useState } from "react";
import CardGenre from "../../../component/header/card/CardGenre";
import "./News.css";
import Pagination from "../../../component/header/pagination/Pagination";
import axios from "axios";

export default function Browse() {
  const [data, setData] = useState([]);
  const url =
    "https://imdb8.p.rapidapi.com/actors/get-all-news?nconst=nm0001667";

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "2c7f83a8b6msh385eaddaee2c27cp129166jsndf916b6abebc",
        "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
      },
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(url, options);
        setData(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  //pagination logic
  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  let pageContent = [];

  if (data.length > 1) {
    pageContent = data.slice(firstItem, lastItem);
  }

  return (
    <>
      <div className="news_page">
        {pageContent.length > 1 ? (
          <>
            <h1 className=" text-3xl">
              <span className=" text-red-600 text-3xl font-bold">MovieFy </span>
              News
            </h1>
            {pageContent
              ? pageContent.map((item) => {
                  return (
                    <div className=" flex flex-col">
                      <CardGenre data={item} key={item.id}></CardGenre>
                    </div>
                  );
                })
              : false}
            <Pagination
              totalitems={data.length}
              itemPerPage={itemsPerPage}
              setCurrentPage={setCurrentPage}
            ></Pagination>
          </>
        ) : (
          <div className="before">
            <i class="fa fa-spinner fa-4x" aria-hidden="true"></i>
          </div>
        )}
      </div>
    </>
  );
}
