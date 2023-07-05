import { AnimeCard } from "@/components/AnimeCard";
import { Box, Grid } from "@mui/material";

const TopAiringAnime = ({ data }: { data: AnimeInfo[] }) => {
  const topAiringAnime = data.map((anime) => {
    return <AnimeCard key={anime.title} anime={anime} />;
  });
  return (
    <Box className="mt-10">
      <h2 className="text-2xl text-white font-bold mb-4">Top Airing Anime</h2>
      <p className="text-gray-500 mb-8">
        Check out the latest and most popular anime series.
      </p>
      <div className="divider h-0.5 bg-red-600 mb-8"></div>
      <Box className="flex justify-center items-center">
        <Grid className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mx-auto">
          {topAiringAnime}
        </Grid>
      </Box>
    </Box>
  );
};

export default TopAiringAnime;
