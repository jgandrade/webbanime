import searchAnime from "@/lib/searchAnime";
import { useParams } from "next/navigation";

export default async function SearchAnime() {
  const params = useParams();
  const { animeid } = params;
  const searchAnimeData: Promise<string> = searchAnime(animeid);
  const searchAnime = await searchAnimeData;

  return (
    
  );
}
