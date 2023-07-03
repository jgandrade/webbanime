import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const AnimeCard = (anime: AnimeQueryType) => {
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
        <Button size="small">Watch</Button>
      </CardActions>
    </Card>
  );
};

export { AnimeCard };
