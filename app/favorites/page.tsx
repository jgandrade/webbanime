"use client";
import { AnimeCard } from "@/components";
import { useEffect, useState, useCallback } from "react";
import { getAnimeInfo } from "@/lib";
import { Box, Grid } from "@mui/material";
import useDetails from "@/hooks/useDetails";
import { useRouter } from "next/navigation";

export default async function Favorites() {
  const [animeData, setAnimeData] = useState<AnimeInfo[]>([]);
  const { favorites, id } = useDetails();
  const router = useRouter();

  const queryFavorites = useCallback(async () => {
    if (favorites?.length > 0 && id) {
      const promisesArr = favorites.map(async (favorite: string) => {
        const animeInfo: Promise<AnimeInfo> = getAnimeInfo(favorite);
        const animeInfoData = await animeInfo;
        return animeInfoData;
      });

      const promisesResolvedArr = await Promise.all(promisesArr);

      const tweakedResolvedArr = promisesResolvedArr.map((animeInfo, index) => {
        animeInfo.id = favorites[index];
        return animeInfo;
      });

      setAnimeData(tweakedResolvedArr);
    }
  }, [favorites, id]);

  useEffect(() => {
    queryFavorites();
  }, [queryFavorites]);

  useEffect(() => {
    if (!id) {
      router.push("/");
    }
  }, [id, router]);

  return (
    <Box className="mt-20 min-h-screen">
      <h2 className="text-2xl text-white font-bold mb-4">
        Your Favorite Animes
      </h2>
      <p className="text-gray-500 mb-8">
        Below here are your results. Favorites found{" "}
        {animeData && animeData?.length} results in total.
      </p>
      <div className="divider h-0.5 bg-red-600 mb-8"></div>
      <Box className="flex justify-center items-center">
        <Grid className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mx-auto w-full">
          {animeData?.map((anime: AnimeInfo, index: number) => {
            return <AnimeCard key={`search-${index}`} anime={anime} />;
          })}
        </Grid>
      </Box>
    </Box>
  );
}
