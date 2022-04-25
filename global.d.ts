interface news {
  title: string;
  href: string;
}

type NewsData = { [website: string]: news[] };
