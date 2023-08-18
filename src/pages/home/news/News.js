import { React, useEffect, useState } from "react";
import CardGenre from "../../../component/header/card/CardGenre";
import "./News.css";
export default function Browse() {
  const [data, setData] = useState([]);
  const url =
    "https://imdb8.p.rapidapi.com/actors/get-all-news?nconst=nm0001667";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "2c7f83a8b6msh385eaddaee2c27cp129166jsndf916b6abebc",
      "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const apicall = async () => {
      const response = await fetch(url, options);
      const data = await response.json();
      setData(data);
    };
    apicall();
  }, []);

  return (
    <>
      <div className="news_page">
        {data.items ? (
          <>
            <h1 className="news_head">News on trending</h1>
            {data.items
              ? data.items.map((item) => {
                  return <CardGenre data={item} key={item.id}></CardGenre>;
                })
              : false}
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
