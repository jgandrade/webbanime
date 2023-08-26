"use client";
import { Loading } from "@/components/Loading";
import { auth, db } from "@/firebase/firebaseConfig";
import { setUserDetails } from "@/redux/userSlice";
import { Box } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      } else {
        dispatch(
          setUserDetails({
            name: null,
            photo: null,
            favorites: [],
            id: null,
          })
        );
        setIsLoading(false);
      }
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <Box className="mt-10 min-h-screen">
        <Loading />
      </Box>
    );
  }

  return <section>{children}</section>;
}
