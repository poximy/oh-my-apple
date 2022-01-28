import DaysSinceLaunch from "@components/DaysSinceLaunch";
import NewsCard from "@components/NewsCard";

import type { NextPage } from "next";

type Props = NewsData | null;

const getNews = async () => {
  try {
    const res = await fetch(process.env.API_URL + "all_news");
    const data = await res.json();

    const websites: string[] = data.pop();
    const news: newsGroup[] = data;

    return {
      news,
      websites,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function getStaticProps() {
  const newsData = await getNews();
  return {
    props: {
      newsData,
    },
    revalidate: 900,
  };
}

const Home: NextPage<{ newsData: Props | null }> = ({ newsData }) => {
  return (
    <div className="flex flex-col gap-8 justify-center items-center m-4">
      <h1 className="capitalize font-bold text-center text-6xl text-teal-400">
        apple news
      </h1>
      <DaysSinceLaunch />
      {newsData !== null ? (
        <NewsCard {...newsData} />
      ) : (
        <p className="text-white text-6xl">Error No News Found :(</p>
      )}
    </div>
  );
};

export default Home;
