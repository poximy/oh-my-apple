interface newsInterface {
  title: string;
  href: string;
}

type newsGroup = newsInterface[];

interface NewsData {
  news: newsGroup[];
  websites: string[];
}
