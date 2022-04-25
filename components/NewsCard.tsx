import type { FC } from 'react';
import React from 'react';

const parseUrl = function (url: string): string {
  let domain = ''

  for (let i = 8; i < url.length - 4; i++) {
    domain += url[i]
  }

  return domain
}

const NewsCard: FC<{ newsData: [string, news[]] }> = ({newsData}) => {
  const [url, news] = newsData;
  const title = parseUrl(url);

  return (
    <ul className='flex flex-col gap-2 w-full md:w-4/5 lg:w-2/3'>
      <p className='p-2 text-4xl font-bold capitalize text-white'>
        {title}
      </p>
      {news.map((news, index) => (
        <>
          <NewsItem key={index} title={news.title} href={url + news.href} />
        </>
      ))}
    </ul>
  );
};

const NewsItem: FC<news> = ({ href, title }) => {
  return (
    <li className='group relative rounded bg-teal-400'>
      <a href={href} target='_blank' rel='noreferrer'>
        <p className='p-2 text-2xl group-hover:underline md:text-xl'>{title}</p>
      </a>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='absolute top-0 right-0 h-6 w-6 fill-gray-800 opacity-0
        group-hover:opacity-100'
        viewBox='0 0 20 20'
        fill='currentColor'
      >
        <path d='M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z' />
        <path d='M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z' />
      </svg>
    </li>
  );
};

export default NewsCard
