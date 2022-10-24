import Head from 'next/head';
import type { NextPage } from 'next';

import NewsCard from '@components/NewsCard';

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
    revalidate: 900,
  };
}

const Home: NextPage<Props> = ({ newsData }) => {
  return (
    <>
      <Head>
        <title>Apple Rumors</title>
      </Head>
      <div className='flex flex-col items-center gap-8 text-white'>
        <nav className='text-center font-mono text-white'>
          <h1 className='text-4xl font-bold capitalize'>apple rumors</h1>
        </nav>
        {newsData === null ? (
          <p className='col-span-3 text-4xl'>Error No News Found :(</p>
        ) : (
          <>
            {Object.entries(newsData).map(newsData => (
              <NewsCard key={newsData[0]} newsData={newsData} />
            ))}
          </>
        )}
        <footer className='font-mono'>
          <p>
            Made by{' '}
            <a className='hover:underline' href='https://github.com/poximy'>
              Poximy
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default Home;
