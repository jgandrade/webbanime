"use client";
import searchAnime from "@/lib/searchAnime";
import { AnimeCard } from "@/components";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import getAnimeInfo from "@/lib/getAnimeInfo";
import { Box } from "@mui/material";

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

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        flexWrap: "wrap",
        padding: "5em"
      }}
    >
      {animeData?.map((anime: AnimeInfo, index: number) => {
        return (
          <Box
            key={`search-${index}`}
            sx={{ width: "300px", height: "400px", flex: "0 0 300px" }}
          >
            <AnimeCard {...anime} />
          </Box>
        );
      })}
    </Box>
  );
}
