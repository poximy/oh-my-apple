import DaysSinceLaunch from '@components/DaysSinceLaunch';
import NewsCard from '@components/NewsCard';
import type { NextPage } from 'next';
import Head from 'next/head';

interface Props {
  newsData: NewsData | null;
}

const getNews = async function () {
  try {
    const res = await fetch(process.env.API_URL + '/all_news');
    const newsData = await res.json();
    return newsData as NewsData;
  } catch {
    return null;
  }
};

export async function getStaticProps() {
  const newsData = await getNews();
  return {
    props: {
      newsData,
    },
    revalidate: 60,
  };
}

const Home: NextPage<Props> = ({ newsData }) => {
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
        {newsData === null ? (
          <p className='text-6xl text-white'>Error No News Found :(</p>
        ) : (
          <>
            {Object.entries(newsData).map((newsData, index) => (
              <NewsCard key={index} newsData={newsData}/>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
