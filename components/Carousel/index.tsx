import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Carousel = ({ animeData }: { animeData: AnimeDataResponse }) => {
  const animeToDisplay = animeData.results.map((anime, index) => {
    return (
      <Box key={`${anime.title}-carousel-${index}`} className="flex relative">
        <Image
          src={anime.image}
          alt={`${anime.title}-carousel-${index}`}
          width={200}
          height={200}
          className="object-contain"
        />
      </Box>
    );
  });

  return (
    <Box>
      <Slider {...settings}>{animeToDisplay}</Slider>
    </Box>
  );
};

export { Carousel };
