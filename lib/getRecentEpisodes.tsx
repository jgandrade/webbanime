async function getRecentEpisodes() {
  const response = await fetch(`${process.env.BASE_URL}/recent-episodes`);
  if (!response.ok) throw new Error("Failed to fetch data");
  const dataResponse = await response.json();
  return dataResponse;
}

export { getRecentEpisodes };
