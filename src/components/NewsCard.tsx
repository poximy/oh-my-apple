import type { FC } from 'react';
import React from 'react';
import Image from 'next/image';

const parseUrl = function (url: string): string {
  let domain = '';

  for (let i = 8; i < url.length - 4; i++) {
    domain += url[i];
  }

  return domain;
};

const NewsCard: FC<{ newsData: [string, news[]] }> = ({ newsData }) => {
  const [url, news] = newsData;
  const title = parseUrl(url);

  return (
    <ul className='flex w-full flex-col gap-2 md:w-5/6 lg:w-3/4'>
      <a href={url} className='w-fit text-white'>
        <p className='font-mono text-2xl font-bold capitalize hover:underline'>
          {title}
        </p>
      </a>
      {news.map((news, index) => (
        <NewsItem key={index} title={news.title} href={url + news.href} />
      ))}
    </ul>
  );
};

const NewsItem: FC<news> = ({ href, title }) => {
  return (
    <li className='group relative bg-secondary hover:bg-secondary-light'>
      <a href={href} target='_blank' rel='noreferrer'>
        <p className='p-2 text-lg group-hover:underline'>{title}</p>
      </a>
      <div className='absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100'>
        <Image src='/launch.svg' width={32} height={32} alt='launch icon' />
      </div>
    </li>
  );
};

export default NewsCard;
