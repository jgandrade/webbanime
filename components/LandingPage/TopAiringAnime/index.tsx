import { useState, useEffect, useCallback } from "react";
import { AnimeCard } from "@/components/AnimeCard";
import { Box, Grid } from "@mui/material";
import { getTopAiringAnime, getAnimeInfo } from "@/lib";
import { Loading } from "@/components/Loading";

const TopAiringAnime = () => {
  const [animeDataTop, setAnimeDataTop] = useState<AnimeInfo[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const querySearch = useCallback(async () => {
    const topAiringAnime: Promise<AnimeDataResponse> = getTopAiringAnime();
    const topAiringAnimeData = await topAiringAnime;

    const promisesArrTop = topAiringAnimeData.results.map(async (anime) => {
      const animeInfo: Promise<AnimeInfo> = getAnimeInfo(anime.id);
      const animeInfoData = await animeInfo;
      return animeInfoData;
    });

    setAnimeDataTop(await Promise.all(promisesArrTop));
    setLoading(false);
  }, []);

  useEffect(() => {
    querySearch();
  }, [querySearch]);

  const topAiringAnime = animeDataTop?.map((anime) => {
    return <AnimeCard key={`${anime.title}-top`} anime={anime} />;
  });

  if (loading) {
    return <Loading />;
  }
  
  return (
    <Box className="mt-10">
      <h2 className="text-2xl text-white font-bold mb-4">Top Airing Anime</h2>
      <p className="text-gray-500 mb-8">
        Check out the latest and most popular anime series.
      </p>
      <div className="divider h-0.5 bg-red-600 mb-8"></div>
      <Box className="flex justify-center items-center">
        <Grid className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mx-auto">
          {topAiringAnime}
        </Grid>
      </Box>
    </Box>
  );
};

export default TopAiringAnime;
