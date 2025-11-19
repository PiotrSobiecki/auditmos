import { FC, useEffect, useState } from "react";
import { LargeLogoSVG } from "./Icons";

const SplashScreen: FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Rozpocznij animację po krótkim opóźnieniu
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 250);

    // Ukryj splash screen po zakończeniu animacji
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`splash-screen ${isAnimating ? "is-animating" : ""}`}>
      <div className="splash-background"></div>
      <div className="splash-content">
        <LargeLogoSVG />
      </div>
    </div>
  );
};

export default SplashScreen;
