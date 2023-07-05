"use client";
import { LandingPage, Loading } from "@/components";
import { getTopAiringAnime, getRecentEpisodes, getAnimeInfo } from "@/lib";
import { useEffect, useState, useCallback } from "react";

export default async function Root() {
  const [animeDataTop, setAnimeDataTop] = useState<AnimeInfo[]>();
  const [animeDataRecent, setAnimeDataRecent] = useState<AnimeInfo[]>();

  const querySearch = useCallback(async () => {
    const topAiringAnime: Promise<AnimeDataResponse> = getTopAiringAnime();
    const topAiringAnimeData = await topAiringAnime;
    const recentEpisodes: Promise<RecentEpisodes> = getRecentEpisodes();
    const recentEpisodesData = await recentEpisodes;

    const promisesArrTop = topAiringAnimeData.results.map(async (anime) => {
      const animeInfo: Promise<AnimeInfo> = getAnimeInfo(anime.id);
      const animeInfoData = await animeInfo;
      return animeInfoData;
    });

    const promisesArrRecent = recentEpisodesData.results.map(async (anime) => {
      const animeInfo: Promise<AnimeInfo> = getAnimeInfo(anime.id);
      const animeInfoData = await animeInfo;
      return animeInfoData;
    });

    setAnimeDataTop(await Promise.all(promisesArrTop));
    setAnimeDataRecent(await Promise.all(promisesArrRecent));
  }, []);

  useEffect(() => {
    querySearch();
  }, [querySearch]);

  if (!animeDataTop && !animeDataRecent) {
    return <Loading />;
  }

  return (
    <main>
      {animeDataTop && animeDataRecent && (
        <LandingPage
          topAiringAnime={animeDataTop}
          recentEpisodes={animeDataRecent}
        />
      )}
    </main>
  );
}
