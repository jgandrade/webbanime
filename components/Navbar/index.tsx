import { SearchAnime } from "../SearchAnime";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "@/firebase/firebaseConfig";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUserDetails } from "@/redux/userSlice";
import useDetails from "@/hooks/useDetails";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GoogleIcon from "@mui/icons-material/Google";

const Navbar = () => {
  const dispatch = useDispatch();
  const { name, photo, id } = useDetails();

  function logout() {
    signOut(auth)
      .then(() => {
        dispatch(
          setUserDetails({
            name: null,
            photo: null,
            favorites: [],
            id: null,
          })
        );
      })
      .catch((error) => {
        alert(error);
      });
  }

  async function login() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    return signInWithPopup(auth, provider)
      .then(async (result) => {
        GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const docRef = doc(db, "Users", user?.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          return setDoc(doc(db, "Users", user?.uid), {
            name: user?.displayName,
            email: user?.email,
            photo: user?.photoURL,
            favorites: [],
          })
            .then((log) => log)
            .catch((err) => err);
        } else {
          const docRef = doc(db, "Users", user?.uid);
          const data = (await getDoc(docRef)).data();
          dispatch(
            setUserDetails({
              name: data?.name,
              photo: data?.photo,
              favorites: data?.favorites,
              id: user?.uid,
            })
          );
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user?.uid);
        const data = (await getDoc(docRef)).data();
        dispatch(
          setUserDetails({
            name: data?.name,
            photo: data?.photo,
            favorites: data?.favorites,
            id: user?.uid,
          })
        );
      } else {
        dispatch(
          setUserDetails({
            name: null,
            photo: null,
            favorites: [],
            id: null,
          })
        );
      }
    });
  }, [dispatch]);

  return (
    <Box
      component={"nav"}
      display="flex"
      alignItems={"center"}
      className={`navbar`}
      position={"fixed"}
      zIndex={1000}
    >
      <Link href="/">
        <Typography
          variant="h1"
          color={"white"}
          fontWeight={"700"}
          fontSize={"30px"}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          WebbAnime
        </Typography>
      </Link>
      <SearchAnime />
      {name ? (
        <Box className="flex gap-3 justify-center items-center">
          {id && (
            <Link href="/favorites">
              <FavoriteIcon className="text-[#ff5722] cursor-pointer" />
            </Link>
          )}
          {photo && (
            <img
              src={photo}
              alt="profile-pic"
              className="rounded-full mr-2"
              width={50}
            />
          )}
          <button
            className="bg-[#ff5722] hover:bg-[#db603a] text-white font-bold py-2 px-4 rounded-full flex items-center"
            onClick={logout}
          >
            Logout
          </button>
        </Box>
      ) : (
        <button
          className="bg-[#ff5722] hover:bg-[#db603a] text-white font-bold py-2 px-4 rounded-full flex items-center"
          onClick={login}
        >
          Login with <GoogleIcon className="ml-2" />
        </button>
      )}
    </Box>
  );
};

export { Navbar };
