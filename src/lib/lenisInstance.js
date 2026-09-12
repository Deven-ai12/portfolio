// Lenis is created once in useLenis() and stashed here so components like
// the navbar can call lenis.scrollTo(...) for anchor links, instead of
// relying on the browser's native (non-smooth, and Lenis-conflicting)
// anchor jump.
export let lenisInstance = null;

export function setLenisInstance(instance) {
  lenisInstance = instance;
}