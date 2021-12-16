import type { NextPage } from "next";
import { useEffect, useState } from "react";

interface newsInterface {
  title: string;
  href: string;
}

type newsGroup = newsInterface[];

const Home: NextPage = () => {
  const [news, setNews] = useState<newsGroup[]>([]);
  const [websites, setWebsites] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/all_news").then((res) =>
      res.json().then((data) => {
        setWebsites(data.pop());
        setNews(data);
      })
    );
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="capitalize font-bold text-center text-4xl text-teal-400 m-2">
        apple news:
      </h1>
      <div className="flex flex-col max-w-fit p-2">
        {news.length > 0 ? (
          news.map((group, groupIndex) => (
            <ul key={groupIndex} className="my-2 max-w-fit p-2">
              <p className="capitalize font-bold text-2xl text-white p-2">
                {websites[groupIndex]}:
              </p>
              {group.map((data, index) => (
                <li
                  key={index}
                  className="m-2 p-2 rounded bg-teal-400 max-w-fit"
                >
                  <a href={data.href} target="_blank" rel="noreferrer">
                    {data.title}
                  </a>
                </li>
              ))}
            </ul>
          ))
        ) : (
          <p className="capitalize text-center text-xl">no news available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
