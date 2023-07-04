import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const AnimeCard = (anime: AnimeInfo) => {
  return (
    <Card sx={{ backgroundColor: "#333", color: "#fff", maxWidth: 250 }}>
      <CardMedia
        sx={{
          height: 0,
          paddingTop: "100%", // Maintain aspect ratio 1:1 (square)
          backgroundPosition: "center",
        }}
        image={`${anime.image}`}
        title={`${anime.title}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`${anime.title}`}
        </Typography>
      </CardContent>
      <CardActions>
        {anime.episodes.length > 0 && (
          <Link href={`/watch/${anime.episodes[0].id}`}>
            <Button
              size="small"
              sx={{ color: "#ccc", "&:hover": { color: "#fff" } }}
            >
              Watch
            </Button>
          </Link>
        )}
      </CardActions>
    </Card>
  );
};

export { AnimeCard };
