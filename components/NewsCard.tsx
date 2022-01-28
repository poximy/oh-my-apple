import type { FC } from "react";

interface Props {
  news: newsGroup[];
  websites: string[];
}

const NewsCard: FC<Props> = ({ news, websites }) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Loops over group */}
      {news.length > 0 ? (
        news.map((group, groupIndex) => (
          <ul key={groupIndex} className="flex flex-col gap-2">
            <p className="capitalize font-bold text-4xl text-white p-2">
              {websites[groupIndex]}:
            </p>
            {/* Loop over news title */}
            {group.map((data, index) => (
              <li
                key={index}
                className="text-xl p-2 max-w-max bg-teal-400 hover:bg-cyan-400
                          rounded hover:rounded-xl transition-all duration-500 ease-linear"
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
