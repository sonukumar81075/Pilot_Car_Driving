"use client";

import React from "react";
import Lottie from "lottie-react";

// LottieFiles car animation JSON (replace with your preferred file if needed)
const CAR_ANIMATION_URL =
  "https://assets1.lottiefiles.com/packages/lf20_vf6g7n5f.json";

export function FooterCarAnimation() {
  const [animationData, setAnimationData] = React.useState(null);

  React.useEffect(() => {
    let mounted = true;
    fetch(CAR_ANIMATION_URL)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (mounted && data) setAnimationData(data);
      })
      .catch(() => {
        // Silent fail: footer should not break if animation is unavailable.
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (!animationData) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-0 z-0 w-full opacity-30"
    >
      <div className="mx-auto w-full max-w-4xl px-4">
        <Lottie
          animationData={animationData}
          loop
          autoplay
          className="h-24 w-full md:h-28 lg:h-32"
        />
      </div>
    </div>
  );
}

