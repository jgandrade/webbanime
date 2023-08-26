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
import { useEffect, useState } from "react";
import { setUserDetails } from "@/redux/userSlice";
import useDetails from "@/hooks/useDetails";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/navigation";
import { Search } from "@mui/icons-material";

const Navbar = () => {
  const dispatch = useDispatch();
  const { name, photo, id } = useDetails();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState<string>("");
  const router = useRouter();
  const handleChange = (value: string) => {
    setQuery(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    router.push(`/search/${query}`);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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
            .then((_) => window.location.reload())
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
      <Box className="hidden md:flex">
        <SearchAnime />
      </Box>
      <button
        className="bg-[#ff5722] hover:bg-[#db603a] text-white font-bold py-2 px-4 rounded-full flex items-center md:hidden"
        onClick={toggleMobileMenu}
      >
        ☰
      </button>
      {mobileMenuOpen && (
        <div className="flex flex-col items-center justify-center fixed top-0 right-0 h-full bg-[#333333] w-full p-4 transform translate-x-0 transition-transform duration-300 ease-in-out md:hidden">
          <button
            className="absolute top-2 right-2 text-white text-3xl"
            onClick={toggleMobileMenu}
          >
            ✕
          </button>
          <Box className="relative items-center">
            <form
              onSubmit={(event) => handleSubmit(event)}
              className="flex items-center"
            >
              <input
                type="text"
                placeholder="Search Anime"
                value={query}
                onChange={(event) => handleChange(event.target.value)}
                spellCheck={false}
              />
              <button
                className="absolute right-3 top-[10px] text-[#DC2626]"
                type="submit"
              >
                <Search />
              </button>
            </form>
          </Box>
          {name ? (
            <Box className="flex flex-col gap-3 justify-center items-center mt-5">
              <Link href="/favorites" onClick={() => setMobileMenuOpen(false)}>
                <button className="bg-[#ff5722] hover:bg-[#db603a] cursor-pointer text-white font-bold py-2 px-4 rounded-full flex items-center">
                  Favorites <FavoriteIcon />
                </button>
              </Link>
              {photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photo}
                  alt="profile-pic"
                  className="rounded-full mr-2"
                  width={50}
                />
              )}
              <button
                className="bg-[#ff5722] hover:bg-[#db603a] text-white font-bold py-2 px-4 rounded-full flex items-center"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
              >
                Logout
              </button>
            </Box>
          ) : (
            <button
              className="bg-[#ff5722] hover:bg-[#db603a] text-white font-bold py-2 px-4 rounded-full flex items-center mt-5"
              onClick={() => {
                login();
                setMobileMenuOpen(false);
              }}
            >
              Login with <GoogleIcon className="ml-2" />
            </button>
          )}
        </div>
      )}
      {name ? (
        <Box className="gap-3 justify-center items-center hidden md:flex">
          <Link href="/favorites">
            <FavoriteIcon className="text-[#ff5722] cursor-pointer" />
          </Link>
          {photo && (
            // eslint-disable-next-line @next/next/no-img-element
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
          className="bg-[#ff5722] hover:bg-[#db603a] text-white font-bold py-2 px-4 rounded-full hidden md:flex items-center"
          onClick={login}
        >
          Login with <GoogleIcon className="ml-2" />
        </button>
      )}
    </Box>
  );
};

export { Navbar };
