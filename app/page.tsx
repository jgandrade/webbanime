import getTopAiringAnime from "@/lib/getTopAiringAnime";
import { AnimeCard, SearchAnime } from "@/components";

export default async function Root() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <SearchAnime />
    </main>
  );
}
