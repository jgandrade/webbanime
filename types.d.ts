type TopAnime = {
  id: "string";
  title: "string";
  image: "string";
  genres: string[];
};

type TopAiringAnime = {
  currentPage: number;
  results: TopAnime[];
};
