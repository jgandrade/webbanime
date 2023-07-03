import getTopAiringAnime from "@/lib/getTopAiringAnime";
import { AnimeCard, SearchAnime } from "@/components";

export default async function Root() {
  const topAnimeData: Promise<AnimeDataResponse> = getTopAiringAnime();
  const topAnime = await topAnimeData;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SearchAnime />
      {topAnime.results.map((anime: AnimeQueryType, index: number) => {
        return <AnimeCard key={`topanime-${index}`} {...anime} />;
      })}
    </main>
  );
}
