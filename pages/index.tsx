import type { NextPage } from "next";
import NewsCard from "../components/NewsCard";

interface Props {
  news: newsGroup[];
  websites: string[];
  daysSinceLaunch: string;
}

const calculateDaysSinceLaunch = () => {
  const date1 = new Date("9/6/2019");
  const date2 = new Date();

  // @ts-ignore
  return parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
};

const getNews = async () => {
  const res = await fetch(process.env.API_URL + "all_news");
  const data = await res.json();

  const websites: string[] = data.pop();
  const news: newsGroup[] = data;

  return [news, websites];
};

export async function getServerSideProps() {
  const daysSinceLaunch = calculateDaysSinceLaunch();
  const [news, websites] = await getNews();

  return {
    props: {
      news,
      websites,
      daysSinceLaunch,
    },
  };
}

const Home: NextPage<Props> = ({ news, websites, daysSinceLaunch }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="capitalize font-bold text-center text-6xl text-teal-400 m-2">
        apple news
      </h1>
      <div className="flex justify-center flex-col rounded bg-teal-400 text-black my-2 p-2">
        <h2 className="text-2xl">
          Days since Galaxy Fold launch but, no iPhone Fold:
        </h2>
        <p className="text-center text-4xl">{daysSinceLaunch}</p>
      </div>
      <NewsCard news={news} websites={websites} />
    </div>
  );
};

export default Home;
