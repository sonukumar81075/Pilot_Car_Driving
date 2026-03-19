import React, { Suspense } from "react";
import PackagesClient from "./packages-client";

export default function PackagesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white pb-16 pt-24 md:pt-28" />}>
      <PackagesClient />
    </Suspense>
  );
}

