import type { FC } from 'react';

interface Props {
  news: newsGroup[];
  websites: string[];
}

const NewsGroup: FC<{ websiteName: string }> = props => {
  return (
    <ul className='flex flex-col gap-2'>
      <p className='p-2 text-4xl font-bold capitalize text-white'>
        {props.websiteName}
      </p>
      {props.children}
    </ul>
  );
};

const NewsItem: FC<newsInterface> = ({ href, title }) => {
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

const NewsCard: FC<Props> = ({ news, websites }) => {
  return (
    <div className='flex flex-col gap-4'>
      {/* Loops over a group of news */}
      {news.length > 0 ? (
        news.map((group, groupIndex) => (
          <NewsGroup key={groupIndex} websiteName={websites[groupIndex]}>
            {group.map((data, ItemIndex) => (
              <NewsItem key={ItemIndex} {...data} />
            ))}
          </NewsGroup>
        ))
      ) : (
        <p className='text-center text-xl capitalize'>No News Available</p>
      )}
    </div>
  );
};

export default NewsCard;
