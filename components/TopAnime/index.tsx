"use client";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const TopAnime = (topAnime: TopAnime) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={`${topAnime.image}`}
        title={`${topAnime.title}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`${topAnime.title}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Watch</Button>
      </CardActions>
    </Card>
  );
};

export { TopAnime };
