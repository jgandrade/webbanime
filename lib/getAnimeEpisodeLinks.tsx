async function getAnimeEpisodeLinks(animeIdAndEpisode: string) {
  const baseUrl = process.env.BASE_URL;
  const response = await fetch(`${baseUrl}/watch/${animeIdAndEpisode}`);
  if (!response.ok) throw new Error("Failed to fetch data");
  const dataResponse = await response.json();
  return dataResponse;
}

export default getAnimeEpisodeLinks;
