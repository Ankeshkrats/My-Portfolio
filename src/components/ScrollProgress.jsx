import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const scrollHeight = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setWidth(pct);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reset progress bar whenever the route changes
  useEffect(() => {
    setWidth(0);
  }, [location.pathname]);

  return <div id="scroll-progress" style={{ width: `${width}%` }} />;
}