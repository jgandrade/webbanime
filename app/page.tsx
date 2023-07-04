import getTopAiringAnime from "@/lib/getTopAiringAnime";
import { SearchAnime } from "@/components";
import { Box } from "@mui/material";

export default async function Root() {
  const topAiringAnime: Promise<AnimeDataResponse> = getTopAiringAnime();
  const topAiringAnimeData = await topAiringAnime;

  return (
    <main>
      <SearchAnime />
    </main>
  );
}
