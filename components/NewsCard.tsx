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
    <li
      className='rounded bg-teal-400
      transition-all duration-300 ease-linear hover:scale-[1.025] hover:bg-cyan-400'
    >
      <a href={href} target='_blank' rel='noreferrer'>
        <p className='p-2 text-2xl md:text-xl'>{title}</p>
      </a>
    </li>
  );
};

const NewsCard: FC<Props> = ({ news, websites }) => {
  return (
    <div className='flex flex-col gap-4'>
      {/* Loops over group */}
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
