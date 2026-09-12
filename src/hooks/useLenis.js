import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenisInstance } from "../lib/lenisInstance";

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    setLenisInstance(lenis);

    // Keep ScrollTrigger's cached scroll position in sync with Lenis on
    // every Lenis scroll tick, and let GSAP's own ticker (instead of
    // requestAnimationFrame directly) drive Lenis so both stay on the
    // same clock — this is what removes the stutter/jank.
    lenis.on("scroll", ScrollTrigger.update);

    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);
}