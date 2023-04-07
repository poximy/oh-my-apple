import type { PageServerLoad } from './$types';

export const load = (async () => {
  const res = await fetch('https://api.apple.poximy.com/all_news');
  const newsData: NewsData = await res.json();

  for (const domain in newsData) {
    if (newsData[domain] === null) {
      delete newsData[domain];
    }
  }

  return newsData;
}) satisfies PageServerLoad;

interface news {
  title: string;
  href: string;
}

type NewsData = { [website: string]: news[] };
