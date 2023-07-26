import { SearchAnime } from "../SearchAnime";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

const Navbar = () => {
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
    </Box>
  );
};

export { Navbar };
