import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to top on every route change.
 * If a hash is present (e.g. /legal#privacy) and the element exists,
 * it will scroll to that section instead.
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // wait for the next paint so the new route's DOM is ready
    requestAnimationFrame(() => {
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
  }, [pathname, hash, key]);

  return null;
}
