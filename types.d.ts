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
