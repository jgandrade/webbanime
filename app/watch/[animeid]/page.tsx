"use client";
import getAnimeInfo from "@/lib/getAnimeInfo";
import getAnimeEpisodeLinks from "@/lib/getAnimeEpisodeLinks";
import { useParams } from "next/navigation";
import { Box, Button } from "@mui/material";
import { VideoPlayer } from "@/components";
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
    const regex = /-(episode-\d+)/i;
    const animeParsedId = animeid.replace(regex, "").trim();
    console.log(animeParsedId);
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

  return (
    <Box>
      <div className="container max-w-3xl mx-auto flex flex-col px-6">
        {episode && <VideoPlayer videoSource={episode} />}
      </div>

      {animeInfo?.episodes.map((episode, index) => {
        return (
          <Link key={`watch-episode-${index}`} href={`/watch/${episode.id}`}>
            <Button>{episode.number}</Button>
          </Link>
        );
      })}
    </Box>
  );
}
