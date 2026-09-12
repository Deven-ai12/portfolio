// A plain mutable object updated by GSAP ScrollTrigger and read every
// frame inside the R3F render loop. Keeping this outside React state means
// scrolling never triggers a React re-render — only the canvas redraws.
export const scrollState = {
  progress: 0, // 0 (top of page) -> 1 (bottom of page)
  velocity: 0, // signed scroll speed, used for a brief motion-blur style tilt
  mouseX: 0, // normalized -1..1
  mouseY: 0, // normalized -1..1
};
