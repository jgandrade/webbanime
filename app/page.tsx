import getTopAiringAnime from "@/lib/getTopAiringAnime";
import { TopAnime, VideoPlayer, SearchAnime } from "@/components";

export default async function Root() {
  const topAnimeData: Promise<TopAiringAnime> = getTopAiringAnime();
  const topAnime = await topAnimeData;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SearchAnime />
      {topAnime.results.map((anime: TopAnime, index: number) => {
        return <TopAnime key={`topanime-${index}`} {...anime} />;
      })}
    </main>
  );
}
