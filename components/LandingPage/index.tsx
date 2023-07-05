import { Box } from "@mui/material";
import TopAiringAnime from "./TopAiringAnime";
import RecentEpisodes from "./RecentEpisodes";

const LandingPage = ({
  topAiringAnime,
  recentEpisodes,
}: {
  topAiringAnime: AnimeInfo[];
  recentEpisodes: AnimeInfo[];
}) => {
  return (
    <Box className="flex flex-col justify-center items-center mt-5">
      <TopAiringAnime data={topAiringAnime} />
      <RecentEpisodes data={recentEpisodes} />
    </Box>
  );
};

export { LandingPage };
