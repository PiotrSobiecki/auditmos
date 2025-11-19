import { FC, useEffect, useRef } from "react";
import useRevealOnIntersect from "@/hooks/useRevealOnIntersect";
import backgroundVideo from "../../../assets/video/hero_3.mp4";

const CHARS = "01";

const Hero: FC = () => {
  const scrollTextRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const { ref: heroRef, isVisible: isHeroVisible } = useRevealOnIntersect({
    threshold: 0.2,
    rootMargin: "0px 0px -20% 0px",
  });

  // Scramble effect dla p przy ładowaniu
  useEffect(() => {
    const lead = leadRef.current;
    const leadText =
      "We combine smart-contract audits, token design reviews, and DevSecOps enablement into one streamlined engagement so you can scale with confidence.";

    if (!lead) {
      return;
    }

    if (!isHeroVisible) {
      lead.textContent = leadText;
      lead.style.opacity = "1";
      return;
    }

    lead.textContent = leadText;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const runScramble = () => {
      lead.style.opacity = "1";
      let iteration = 0;
      const maxIterations = leadText.length;
      let currentIteration = 0;

      intervalId = setInterval(() => {
        if (currentIteration >= maxIterations) {
          lead.textContent = leadText;
          if (intervalId) {
            clearInterval(intervalId);
          }
          return;
        }

        lead.textContent = leadText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return leadText[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");

        iteration += 1;
        currentIteration++;
      }, 20);
    };

    timeoutId = setTimeout(runScramble, 400);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
      lead.textContent = leadText;
      lead.style.opacity = "1";
    };
  }, [isHeroVisible]);

  useEffect(() => {
    const scrollText = scrollTextRef.current;
    if (!scrollText) return;

    const originalText = "Scroll to discover";
    let isScrambling = false;

    const scrambleText = () => {
      if (isScrambling) return;
      isScrambling = true;

      let iteration = 0;
      const maxIterations = originalText.length * 3;
      let currentIteration = 0;

      const interval = setInterval(() => {
        if (currentIteration >= maxIterations) {
          scrollText.textContent = originalText;
          clearInterval(interval);
          isScrambling = false;
          return;
        }

        scrollText.textContent = originalText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return originalText[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");

        iteration += 1 / 3;
        currentIteration++;
      }, 30);
    };

    const handleClick = () => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    };

    scrollText.addEventListener("mouseenter", scrambleText);
    scrollText.addEventListener("click", handleClick);
    scrollText.style.cursor = "pointer";

    const scrollContainer = scrollText.closest(".hero__scroll");
    if (scrollContainer) {
      const arrow = scrollContainer.querySelector("svg");
      if (arrow) {
        arrow.addEventListener("click", handleClick);
        arrow.style.cursor = "pointer";
      }
      scrollContainer.addEventListener("click", handleClick);
      (scrollContainer as HTMLElement).style.cursor = "pointer";
    }

    return () => {
      scrollText.removeEventListener("mouseenter", scrambleText);
      scrollText.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <video
        ref={videoRef}
        className="hero__video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className="container hero__grid">
        <div className="hero__content">
          <h1
            className={`hero__title${
              isHeroVisible ? " hero__title--visible" : ""
            }`}
          >
            Zero-compromise security for web3 teams who build with intention.
          </h1>
        </div>
        <div className="hero__panel">
          <p ref={leadRef} className="hero__lead">
            We combine smart-contract audits, token design reviews, and
            DevSecOps enablement into one streamlined engagement so you can
            scale with confidence.
          </p>
        </div>
      </div>
      <div className="hero__scroll">
        <span ref={scrollTextRef}>Scroll to discover</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
