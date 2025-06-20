import { CircularProgress } from "@mui/material";
import React from "react";

function Loading() {
  return (
    <div className="w-full min-h-screen space-y-3 flex justify-center items-center flex-col">
      <CircularProgress />
      <p className="text-lg">Loading...</p>
    </div>
  );
}

export default Loading;
