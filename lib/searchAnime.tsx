async function getTopAiringAnime(animeSearchQuery: string) {
  const response = await fetch(`${process.env.BASE_URL}/${animeSearchQuery}`);
  if (!response.ok) throw new Error("Failed to fetch data");
  const dataResponse = await response.json();
  return dataResponse;
}

export default getTopAiringAnime;
