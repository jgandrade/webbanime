type AnimeQueryType = {
  id: "string";
  title: "string";
  image: "string";
  genres: string[];
};

type AnimeDataResponse = {
  currentPage: number;
  results: AnimeQueryType[];
};

type AnimeInfo = {
  id: string;
  title: string;
  genres: string[];
  totalEpisodes: number;
  image: string;
  releaseDate: string;
  description: string;
  subOrDub: string;
  type: string;
  status: string;
  otherName: string;
  episodes: {
    id: string;
    number: number;
    url: string;
  }[];
};

type AnimeEpisode = {
  sources: {
    url: string;
    isM3U8: boolean;
    quality: string;
  }[];
  download: string;
};
