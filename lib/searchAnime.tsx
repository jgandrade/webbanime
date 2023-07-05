async function searchAnime(animeSearchQuery: string) {
  const baseUrl = process.env.BASE_URL;
  const response = await fetch(`${baseUrl}/${animeSearchQuery}`);
  if (!response.ok) throw new Error("Failed to fetch data");
  const dataResponse = await response.json();
  return dataResponse;
}

export { searchAnime };
