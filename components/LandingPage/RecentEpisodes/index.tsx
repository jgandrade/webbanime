import { useState, useEffect, useCallback } from "react";
import { AnimeCard } from "@/components/AnimeCard";
import { Box, Grid } from "@mui/material";
import { getRecentEpisodes, getAnimeInfo } from "@/lib";

const RecentEpisodes = () => {
  const [animeDataRecent, setAnimeDataRecent] = useState<AnimeInfo[]>();

  const querySearch = useCallback(async () => {
    const recentEpisodes: Promise<RecentEpisodes> = getRecentEpisodes();
    const recentEpisodesData = await recentEpisodes;

    const promisesArrRecent = recentEpisodesData.results.map(async (anime) => {
      const animeInfo: Promise<AnimeInfo> = getAnimeInfo(anime.id);
      const animeInfoData = await animeInfo;
      return animeInfoData;
    });

    setAnimeDataRecent(await Promise.all(promisesArrRecent));
  }, []);

  useEffect(() => {
    querySearch();
  }, [querySearch]);

  const recentEpisodesAnime = animeDataRecent?.map((anime) => {
    return (
      <AnimeCard
        key={`${anime.title}-recent`}
        anime={anime}
        episodeSpecific={anime.episodes.length - 1}
      />
    );
  });
  return (
    <Box className="mt-10">
      <h2 className="text-2xl text-white font-bold mb-4">Recent Episodes</h2>
      <p className="text-gray-500 mb-8">
        Check out the latest episodes of your favorite anime series.
      </p>
      <div className="divider h-0.5 bg-red-600 mb-8"></div>
      <Box className="flex justify-center items-center">
        <Grid className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mx-auto">
          {recentEpisodesAnime}
        </Grid>
      </Box>
    </Box>
  );
};

export default RecentEpisodes;
