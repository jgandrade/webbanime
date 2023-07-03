import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import getAnimeInfo from "@/lib/getAnimeInfo";

const AnimeCard = async (anime: AnimeQueryType) => {
  const animeInfo: Promise<AnimeInfo> = getAnimeInfo(anime.id);
  const animeInfoData = await animeInfo;
  
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={`${anime.image}`}
        title={`${anime.title}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`${anime.title}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/watch/${animeInfoData.episodes[0].id}-episode-1`}>
          <Button size="small">Watch</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export { AnimeCard };
