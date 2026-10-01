import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const hasTouchPoints = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(hasCoarsePointer || hasTouchPoints);
  }, []);

  return isTouch;
}
