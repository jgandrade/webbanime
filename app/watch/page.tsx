"use client";
import searchAnime from "@/lib/searchAnime";
import { AnimeCard } from "@/components";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

export default async function WatchAnime() {
  const params = useParams();
  const { animeid } = params;
  const [animeData, setAnimeData] = useState<AnimeQueryType[]>();

  const querySearch = useCallback(async () => {
    const searchAnimeResponse: Promise<AnimeDataResponse> =
      searchAnime(animeid);
    const searchAnimeData = await searchAnimeResponse;
    setAnimeData(searchAnimeData.results);
  }, [animeid]);

  useEffect(() => {
    querySearch();
  }, [querySearch]);

  return (
    <>
      {animeData?.map((anime: AnimeQueryType, index: number) => {
        return <AnimeCard key={`search-${index}`} {...anime} />;
      })}
    </>
  );
}
