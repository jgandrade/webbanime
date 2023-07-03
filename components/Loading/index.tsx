import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <CircularProgress />
    </div>
  );
};

export { Loading };
