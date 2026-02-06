import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loading } from "@/components/loading";

export default function AppRoutes() {
  const HomePage = React.lazy(() => import("./pages/home/HomePage"));

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
}
