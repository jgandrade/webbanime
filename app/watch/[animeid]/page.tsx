"use client";
import { getAnimeEpisodeLinks, getAnimeInfo } from "@/lib";
import { useParams } from "next/navigation";
import { Box, Button } from "@mui/material";
import { LoadingWatch, VideoPlayer } from "@/components";
import { useState, useCallback, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Link from "next/link";

export default function WatchAnime() {
  const [animeInfo, setAnimeInfo] = useState<AnimeInfo>();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentEpisode, setCurrentEpisode] = useState<string | undefined>(
    undefined
  );
  const itemsPerPage = 40;
  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;
  const episodesToShow: AnimeInfo["episodes"] | undefined =
    animeInfo?.episodes.slice(startIndex, endIndex);

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

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
    const page = animeid.split("page")[1];
    const [, episodeNumber, ,] = animeid.split(/-episode-|&id=/);
    const parsedAnimeId = animeid.split("3D")[1];
    const parsedAnimeForEpisode = animeid.split("%26")[0];
    const animeInfo: Promise<AnimeInfo> = getAnimeInfo(
      parsedAnimeId.split("%26")[0]
    );
    const animeInfoData = await animeInfo;
    const animeEpisode: Promise<AnimeEpisode> = getAnimeEpisodeLinks(
      parsedAnimeForEpisode
    );
    const animeEpisodeData = await animeEpisode;

    setEpisode(animeEpisodeData.sources);
    setAnimeInfo(animeInfoData);
    setCurrentEpisode(episodeNumber.split("%")[0]);
    if (page) {
      setCurrentPage(Number(page.split("%3D")[1]));
    }
  }, [animeid]);

  useEffect(() => {
    updateEpisode();
  }, [updateEpisode]);

  if (!animeInfo || !episode) {
    return (
      <Box className="mt-20 flex justify-center items-center flex-col">
        <LoadingWatch />
      </Box>
    );
  }

  return (
    <Box className="mt-20 flex justify-center items-center flex-col">
      <h2 className="text-2xl text-white font-bold mb-4">{animeInfo.title}</h2>
      <p className="text-gray-500 mb-8 w-[60%]">{animeInfo.description}</p>
      <div className="divider h-0.5 bg-red-600 mb-8 w-[60%]"></div>
      <Box className="flex flex-col justify-center items-center mt-10">
        <Box className="container max-w-4xl mx-auto flex flex-col items-center px-6 mb-14">
          {episode && (
            <div className="w-full sm:min-w-[600px] sm:max-w-[600px] md:min-w-[600px] md:max-w-[600px] lg:min-w-[600px] lg:max-w-[600px] xl:min-w-[800px] xl:max-w-[800px]">
              <VideoPlayer videoSource={episode} />
            </div>
          )}
        </Box>
        <Box className="grid grid-cols-3 gap-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-8">
          {episodesToShow?.map((episode, index) => (
            <Link
              key={`watch-episode-${index}`}
              href={`/watch/${episode.id}&id=${animeInfo.id}&page=${currentPage}`}
            >
              <button
                className={`px-4 py-2 rounded-l-lg rounded-r-lg focus:outline-none focus:ring focus:border-red-500 ${
                  currentEpisode === String(episode.number)
                    ? "bg-[#DC2626]"
                    : "bg-gray-900"
                }  text-gray-200 hover:bg-red-500 hover:text-white`}
              >
                Episode {episode.number}
              </button>
            </Link>
          ))}
        </Box>
        <Pagination
          count={Math.ceil(animeInfo.episodes.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="primary"
          className="mt-8"
        />
      </Box>
    </Box>
  );
}
