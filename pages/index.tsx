import DaysSinceLaunch from '@components/DaysSinceLaunch';
import NewsCard from '@components/NewsCard';
import type { NextPage } from 'next';
import Head from 'next/head';

type Props = NewsData | null;

const getNews = async function (): Promise<Props> {
  try {
    const res = await fetch(process.env.API_URL + 'all_news');
    const data = await res.json();

    return {
      news: data.news as newsGroup[],
      websites: data.websites as string[],
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function getServerSideProps() {
  const newsData = await getNews();
  return {
    props: {
      newsData,
    },
  };
}

const Home: NextPage<{ newsData: Props | null }> = ({ newsData }) => {
  return (
    <>
      <Head>
        <title>Apple Rumors</title>
      </Head>
      <div className='m-4 flex flex-col items-center justify-center gap-8'>
        <h1 className='text-center text-6xl font-bold capitalize text-teal-400'>
          apple rumors
        </h1>
        <DaysSinceLaunch />
        {newsData !== null ? (
          <NewsCard {...newsData} />
        ) : (
          <p className='text-6xl text-white'>Error No News Found :(</p>
        )}
      </div>
    </>
  );
};

export default Home;
