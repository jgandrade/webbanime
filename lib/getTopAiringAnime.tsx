async function getTopAiringAnime() {
  const response = await fetch(`${process.env.BASE_URL}/top-airing`);
  if (!response.ok) throw new Error("Failed to fetch data");
  const dataResponse = await response.json();
  return dataResponse;
}

export default getTopAiringAnime;
