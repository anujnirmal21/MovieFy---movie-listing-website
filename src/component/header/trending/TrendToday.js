import { React, useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "./TrendToday.css";
import axios from "axios";
import Card from "../card/Card";

export default function TrendToday() {
  const [data, setData] = useState([]);
  let i = 0;
  function inc() {
    i = i + 4;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day?api_key=2c85d687d912de1229c6aaf23b41b705&language=en-US"
        );
        setData(res.data.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h2 id="headtext">Featured Today</h2>
      <div className="featured">
        <Carousel showIndicators={false} showStatus={false} showThumbs={true}>
          {data.map((data, idx, arr) => {
            if (idx < arr.length - 4) {
              const firstCard = arr[i + 0];
              const secondCard = arr[i + 1];
              const thirdCard = arr[i + 2];
              const fourthCard = arr[i + 3];
              inc();
              return (
                <div className="trend_card" key={data.id}>
                  {firstCard && <Card movie={firstCard}></Card>}
                  {secondCard && <Card movie={secondCard}></Card>}
                  {thirdCard && <Card movie={thirdCard}></Card>}
                  {fourthCard && <Card movie={fourthCard}></Card>}
                </div>
              );
            } else {
              return <span key={data.id}>hello</span>;
            }
          })}
        </Carousel>
      </div>
    </>
  );
}
