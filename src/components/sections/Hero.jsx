"use client"

import { useEffect } from "react";
import { Hero1 } from "./Hero1";
import { Hero2 } from "./Hero2";

export function Hero({ data }) {

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch("/api/reviews");
      const reviews = await res.json(); 
    };
    fetchReviews();
  }, []);
  return (
    <>
      <Hero1 data={data} />
      {/* <Hero2 data={data} /> */}
    </>
  );
} 