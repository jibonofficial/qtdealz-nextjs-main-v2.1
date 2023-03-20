import React from "react";

interface Props {
  root?: React.MutableRefObject<null> | undefined;
  target: React.MutableRefObject<HTMLButtonElement | null>;
  onIntersect: Function;
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

export function useIntersectionObserver({
  root,
  target,
  onIntersect,
  threshold = 0.3,
  rootMargin = "0px",
  enabled = false,
}: Props) {
  React.useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      }
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [target.current, enabled]);
}
