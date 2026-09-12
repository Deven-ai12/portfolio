import { lenisInstance } from "./lenisInstance";

export function scrollToId(id) {
  const el = document.querySelector(id);
  if (!el) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(el, {
      offset: -72,
      duration: 1.3,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}