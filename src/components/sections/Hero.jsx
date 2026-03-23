"use client"

import { useEffect } from "react";
import { Hero1 } from "./WhyChoosePilot";
import { Hero2 } from "./Hero2";

export function Hero({ data }) {

 
  return (
    <> 
      <Hero2 data={data} />
    </>
  );
} 