import { Box, Grid } from "@mui/material";

const Loading = () => {
  const loaderSkeletons = Array.from(Array(24).keys()).map(
    (skeleton, index) => {
      return (
        <Box
          key={`skeleton-${index}`}
          className="bg-[#222222] animate-pulse rounded shadow-md w-[180px] h-[267px] flex flex-col justify-around"
        >
          <Box className="p-4">
            <Box className="bg-gray-700 w-full mb-2 h-40" />
            <Box className="h-4 bg-gray-700 w-full" />
          </Box>
          <Box className="flex justify-start p-4">
            <Box className="h-6 w-16 bg-gray-700" />
          </Box>
        </Box>
      );
    }
  );
  return (
    <Box className="mt-20">
      <Box className="w-64 h-8 bg-gray-500 rounded animate-pulse mb-4"></Box>
      <Box className="w-40 h-4 bg-gray-400 rounded animate-pulse mb-8"></Box>
      <Box className="w-64 h-0.5 bg-red-600 mb-8"></Box>
      <Box className="flex justify-center items-center">
        <Grid className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mx-auto">
          {loaderSkeletons}
        </Grid>
      </Box>
    </Box>
  );
};

export { Loading };
