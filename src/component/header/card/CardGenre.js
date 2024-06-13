import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./CardGenre.css";

export default function CardGenre({ data }) {
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setisLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="sectionCards">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2}></Skeleton>
          </SkeletonTheme>
        </div>
      ) : (
        <div>
          {data ? (
            <>
              <div className="section">
                <div className="titleImage">
                  <img className="imgItem" src={data.image.url} alt="title" />
                </div>
                <div className="news">
                  <a id="Link" href={data.link} target="blank">
                    <h3 className="title">{data.head}</h3>
                  </a>
                  <p className="content">{data.body}</p>
                  <span className="uploadTime">
                    {`Pubished on ${data.publishDateTime.slice(0, 10)}`}
                  </span>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}
