"use client";

import { useState, useEffect, RefObject } from "react";

interface IntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
}

function useIntersectionObserver(
  ref: RefObject<Element | null>,
  options: IntersectionObserverOptions = {}
): boolean {
  const { threshold = 0.1, root = null, rootMargin = "0px", triggerOnce = true } = options;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else {
          if (!triggerOnce) {
            setIsVisible(false);
          }
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, root, rootMargin, triggerOnce]);

  return isVisible;
}

export default useIntersectionObserver;
