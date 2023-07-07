async function getAnimeInfo(animeId: string) {
  if (animeId === "jujutsu-kaisen-2nd-season")
    animeId = "jujutsu-kaisen-tv-2nd-season";
  const baseUrl = process.env.BASE_URL;
  const response = await fetch(`${baseUrl}/info/${animeId}`);
  if (!response.ok) throw new Error("Failed to fetch data");
  const dataResponse = await response.json();
  return dataResponse;
}

export { getAnimeInfo };
