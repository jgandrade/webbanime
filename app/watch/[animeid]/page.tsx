"use client";
import { getAnimeEpisodeLinks, getAnimeInfo } from "@/lib";
import { useParams } from "next/navigation";
import { Box, Button } from "@mui/material";
import { Loading, VideoPlayer } from "@/components";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";

export default function WatchAnime() {
  const [animeInfo, setAnimeInfo] = useState<AnimeInfo>();
  const [episode, setEpisode] = useState<
    {
      url: string;
      isM3U8: boolean;
      quality: string;
    }[]
  >();

  const params = useParams();
  const { animeid } = params;

  const updateEpisode = useCallback(async () => {
    const animeParsedId = animeid
      .replace(/-episode-\d+$/, "")
      .replace(/-$/, "")
      .replace(/--+/g, "-");
    const animeInfo: Promise<AnimeInfo> = getAnimeInfo(animeParsedId);
    const animeInfoData = await animeInfo;
    const animeEpisode: Promise<AnimeEpisode> = getAnimeEpisodeLinks(animeid);
    const animeEpisodeData = await animeEpisode;
    setEpisode(animeEpisodeData.sources);
    setAnimeInfo(animeInfoData);
  }, [animeid]);

  useEffect(() => {
    updateEpisode();
  }, [updateEpisode]);

  if (!animeInfo || !episode) {
    return <Loading />;
  }

  return (
    <Box className="flex flex-col justify-center items-center">
      <div className="container max-w-3xl mx-auto flex flex-col px-6 mb-36">
        {episode && <VideoPlayer videoSource={episode} />}
      </div>

      <Box>
        {animeInfo?.episodes.map((episode, index) => {
          return (
            <Link key={`watch-episode-${index}`} href={`/watch/${episode.id}`}>
              <Button>{episode.number}</Button>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
}
