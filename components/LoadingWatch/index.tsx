import { Box } from "@mui/material";

const LoadingWatch = () => {
  return (
    <Box className="flex flex-col justify-center items-center mt-10">
      <div className="container max-w-4xl mx-auto flex flex-col items-center px-6 mb-36">
        <div className="w-full sm:min-w-[400px] sm:max-w-[400px] md:min-w-[450px] md:max-w-[450px] lg:min-w-[600px] lg:max-w-[600px] xl:min-w-[800px] xl:max-w-[800px]">
          <div className="h-96 bg-[#292929] animate-pulse"></div>
        </div>
      </div>
      <Box className="grid grid-cols-3 gap-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-8">
        <div className="h-8 bg-[#292929] w-32 animate-pulse"></div>
        <div className="h-8 bg-[#292929] w-32 animate-pulse"></div>
        <div className="h-8 bg-[#292929] w-32 animate-pulse"></div>
        <div className="h-8 bg-[#292929] w-32 animate-pulse"></div>
        <div className="h-8 bg-[#292929] w-32 animate-pulse"></div>
        <div className="h-8 bg-[#292929] w-32 animate-pulse"></div>
        <div className="h-8 bg-[#292929] w-32 animate-pulse"></div>
        <div className="h-8 bg-[#292929] w-32 animate-pulse"></div>
        <div className="h-8 bg-[#292929] w-32 animate-pulse"></div>
        <div className="h-8 bg-[#292929] w-32 animate-pulse"></div>
        <div className="h-8 bg-[#292929] w-32 animate-pulse"></div>
        <div className="h-8 bg-[#292929] w-32 animate-pulse"></div>
        <div className="h-8 bg-[#292929] w-32 animate-pulse"></div>
        <div className="h-8 bg-[#292929] w-32 animate-pulse"></div>
        <div className="h-8 bg-[#292929] w-32 animate-pulse"></div>
        <div className="h-8 bg-[#292929] w-32 animate-pulse"></div>
        <div className="h-8 bg-[#292929] w-32 animate-pulse"></div>
        <div className="h-8 bg-[#292929] w-32 animate-pulse"></div>
        <div className="h-8 bg-[#292929] w-32 animate-pulse"></div>
        <div className="h-8 bg-[#292929] w-32 animate-pulse"></div>
        <div className="h-8 bg-[#292929] w-32 animate-pulse"></div>
        <div className="h-8 bg-[#292929] w-32 animate-pulse"></div>
        <div className="h-8 bg-[#292929] w-32 animate-pulse"></div>
        <div className="h-8 bg-[#292929] w-32 animate-pulse"></div>
      </Box>
    </Box>
  );
};

export { LoadingWatch };
