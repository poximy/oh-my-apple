import type { FC } from "react";

interface Props {
  news: newsGroup[];
  websites: string[];
}

const NewsCard: FC<Props> = ({ news, websites }) => {
  return (
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
  );
};

export default NewsCard;
