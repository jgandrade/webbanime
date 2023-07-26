"use client";
import { AnimeCard, Loading } from "@/components";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { searchAnime, getAnimeInfo } from "@/lib";
import { Box, Grid } from "@mui/material";

export default async function SearchAnime() {
  const params = useParams();
  const { animeid } = params;
  const [animeData, setAnimeData] = useState<AnimeInfo[]>();

  const querySearch = useCallback(async () => {
    const searchAnimeResponse: Promise<AnimeDataResponse> =
      searchAnime(animeid);
    const searchAnimeData = await searchAnimeResponse;

    const promisesArr = searchAnimeData.results.map(async (search) => {
      const animeInfo: Promise<AnimeInfo> = getAnimeInfo(search.id);
      const animeInfoData = await animeInfo;
      return animeInfoData;
    });

    setAnimeData(await Promise.all(promisesArr));
  }, [animeid]);

  useEffect(() => {
    querySearch();
  }, [querySearch]);

  if (!animeData) {
    return (
      <Box className="mt-10">
        <Loading />
      </Box>
    );
  }

  return (
    <Box className="mt-10">
      <h2 className="text-2xl text-white font-bold mb-4">
        Search Anime Results
      </h2>
      <p className="text-gray-500 mb-8">
        Below here are your results. Search found{" "}
        {animeData && animeData?.length} results in total.
      </p>
      <div className="divider h-0.5 bg-red-600 mb-8"></div>
      <Box className="flex justify-center items-center">
        <Grid className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mx-auto">
          {animeData?.map((anime: AnimeInfo, index: number) => {
            return <AnimeCard key={`search-${index}`} anime={anime} />;
          })}
        </Grid>
      </Box>
    </Box>
  );
}
