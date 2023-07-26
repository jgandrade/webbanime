import { Box } from "@mui/material";
import TopAiringAnime from "./TopAiringAnime";
import RecentEpisodes from "./RecentEpisodes";

const LandingPage = () => {
  return (
    <Box className="flex flex-col justify-center items-center mt-10">
      <TopAiringAnime />
      <RecentEpisodes />
    </Box>
  );
};

export { LandingPage };
