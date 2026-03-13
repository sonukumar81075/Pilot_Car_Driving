import { Hero1 } from "./Hero1";
import { Hero2 } from "./Hero2";

export function Hero({ data }) {
  return (
    <>
      <Hero1 data={data} />
      {/* <Hero2 data={data} /> */}
    </>
  );
}