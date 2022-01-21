import type { NextPage } from "next";

interface newsInterface {
  title: string;
  href: string;
}

type newsGroup = newsInterface[];

interface Props {
  news: newsGroup[];
  websites: string[];
  daysSinceLaunch: string;
}

export async function getServerSideProps() {
  const date1 = new Date("9/6/2019");
  const date2 = new Date();
  // @ts-ignore
  const daysSinceLaunch = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);

  const res = await fetch(process.env.API_URL + "all_news");
  const data = await res.json();

  const websites: string[] = data.pop();
  const news: newsGroup[] = data;

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
      <div className="flex flex-col max-w-fit p-2">
        {news.length > 0 ? (
          news.map((group, groupIndex) => (
            <ul key={groupIndex} className="my-2 max-w-fit p-2">
              <p className="capitalize font-bold text-4xl text-white p-2">
                {websites[groupIndex]}:
              </p>
              {group.map((data, index) => (
                <li
                  key={index}
                  className="text-xl m-2 p-2 rounded bg-teal-400 max-w-fit"
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
