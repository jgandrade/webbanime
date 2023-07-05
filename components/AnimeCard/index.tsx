import {
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Card,
} from "@mui/material";
import Link from "next/link";
import type { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { setCurrentWatchData } from "@/redux/watchSlice";

const AnimeCard = ({
  anime,
  episodeSpecific,
}: {
  anime: AnimeInfo;
  episodeSpecific?: number;
}) => {
  const dispatch: Dispatch = useDispatch();
  const handleAnimeWatch = (animeId: string, animetitle: string) => {
    dispatch(setCurrentWatchData({ animeId: animeId, animetitle: animetitle }));
  };

  return (
    <Card
      sx={{
        backgroundColor: "#222",
        color: "#fff",
        maxWidth: 180,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
        transition: "0.3s",
        "&:hover": { transform: "scale(1.1)" },
      }}
    >
      <CardMedia
        sx={{
          height: 0,
          paddingTop: "100%", // Maintain aspect ratio 1:1 (square)
          backgroundPosition: "center",
        }}
        image={anime.image}
        title={anime.title}
      />
      <CardContent sx={{ padding: "8px" }}>
        <Typography gutterBottom variant="body2" component="div" noWrap>
          {anime.title}
        </Typography>
      </CardContent>
      <CardActions>
        {anime.episodes.length > 0 && (
          <Link
            href={`/watch/${
              episodeSpecific && episodeSpecific > -1
                ? anime.episodes[episodeSpecific].id
                : anime.episodes[0].id
            }&id=${anime.id}`}
            onClick={() => handleAnimeWatch(anime.id, anime.title)}
          >
            <Button
              size="small"
              sx={{
                color: "#fff",
                backgroundColor: "#ff5722",
                "&:hover": { backgroundColor: "#e53935" },
              }}
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
