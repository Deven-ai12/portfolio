import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState } from "../three/scrollState";

gsap.registerPlugin(ScrollTrigger);

export default function useSceneScroll() {
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scrollState.velocity = self.getVelocity() / 1000;
        scrollState.progress = self.progress;
      },
    });

    const onMove = (e) => {
      scrollState.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      trigger.kill();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
}
