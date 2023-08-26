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
import { useCallback } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import useDetails from "@/hooks/useDetails";
import { setUserDetails } from "@/redux/userSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";

const AnimeCard = ({
  anime,
  episodeSpecific,
}: {
  anime: AnimeInfo;
  episodeSpecific?: number;
}) => {
  const dispatch: Dispatch = useDispatch();
  const { id, name: userName, photo, favorites } = useDetails();
  const handleAnimeWatch = (animeId: string, animetitle: string) => {
    dispatch(setCurrentWatchData({ animeId: animeId, animetitle: animetitle }));
  };

  const addToFavorites = useCallback(
    async (animeId: string) => {
      const docRef = doc(db, "Users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        dispatch(
          setUserDetails({
            id: id,
            name: userName,
            photo: photo,
            favorites: [...favorites, animeId],
          })
        );

        return setDoc(doc(db, "Users", id), {
          ...docSnap.data(),
          favorites: [...favorites, animeId],
        })
          .then((_) => _)
          .catch((err) => err);
      }
    },
    [dispatch, favorites, id, photo, userName]
  );

  const removeFromFavorites = useCallback(
    async (animeId: string) => {
      const docRef = doc(db, "Users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        dispatch(
          setUserDetails({
            id: id,
            name: userName,
            photo: photo,
            favorites: [
              ...favorites.filter((favorite: string) => favorite !== animeId),
            ],
          })
        );

        return setDoc(doc(db, "Users", id), {
          ...docSnap.data(),
          favorites: [
            ...favorites.filter((favorite: string) => favorite !== animeId),
          ],
        })
          .then((_) => _)
          .catch((err) => err);
      }
    },
    [dispatch, favorites, id, photo, userName]
  );

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
      <CardActions className="flex justify-start items-center gap-3 w-full">
        {anime.episodes.length > 0 && (
          <Link
            href={`/watch/${
              episodeSpecific && episodeSpecific > -1
                ? anime.episodes[episodeSpecific].id
                : anime.episodes[0].id
            }?id=${anime.id}`}
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
        {id ? (
          favorites?.some((e: any) => e === anime.id) ? (
            <Button
              onClick={() => removeFromFavorites(anime.id)}
              size="small"
              sx={{
                color: "#fff",
                backgroundColor: "#ff5722",
                "&:hover": { backgroundColor: "#e53935" },
              }}
            >
              <HeartBrokenIcon />
            </Button>
          ) : (
            <Button
              onClick={() => addToFavorites(anime.id)}
              size="small"
              sx={{
                color: "#fff",
                backgroundColor: "#ff5722",
                "&:hover": { backgroundColor: "#e53935" },
              }}
            >
              <FavoriteIcon />
            </Button>
          )
        ) : null}
      </CardActions>
    </Card>
  );
};

export { AnimeCard };
