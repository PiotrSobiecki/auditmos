import { FC, useEffect, useRef } from "react";
import { LogoSVG } from "../shared/Icons";
import { LINKS } from "@/constants/links";

const CHARS = "01";

const TILE_LINKS = [
  { label: "home", href: "/" },
  { label: "services", href: "/#services" },
  { label: "audits", href: "/#audits" },
  { label: "resources", href: "/#resources" },
  { label: "company info", href: LINKS.SOCIAL.COMPANY_INFO, external: true },
  { label: "contact", href: LINKS.ACTIONS.CONTACT, external: true },
];

const Footer: FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const targets = Array.from(
      footer.querySelectorAll<HTMLElement>("[data-binary-link='true']")
    );
    if (!targets.length) return;

    const originalTexts = new Map<HTMLElement, string>();
    const handlers = new Map<HTMLElement, () => void>();
    const runningTimers = new Map<HTMLElement, number>();

    targets.forEach((element) => {
      originalTexts.set(element, element.textContent?.trim() || "");
    });

    const scrambleText = (element: HTMLElement) => {
      const originalText = originalTexts.get(element) || "";
      if (!originalText) return;

      const width = element.offsetWidth;
      element.style.minWidth = `${width}px`;

      if (runningTimers.has(element)) {
        window.clearInterval(runningTimers.get(element));
      }

      let iteration = 0;
      const maxIterations = Math.max(6, originalText.length * 3);
      let currentIteration = 0;

      const intervalId = window.setInterval(() => {
        if (currentIteration >= maxIterations) {
          element.textContent = originalText;
          element.style.minWidth = "";
          window.clearInterval(intervalId);
          runningTimers.delete(element);
          return;
        }

        element.textContent = originalText
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

      runningTimers.set(element, intervalId);
    };

    targets.forEach((element) => {
      const handler = () => scrambleText(element);
      handlers.set(element, handler);
      element.addEventListener("mouseenter", handler);
      element.addEventListener("focus", handler);
    });

    return () => {
      handlers.forEach((handler, element) => {
        element.removeEventListener("mouseenter", handler);
        element.removeEventListener("focus", handler);
      });
      runningTimers.forEach((id) => window.clearInterval(id));
    };
  }, []);

  return (
    <footer className="site-footer" ref={footerRef}>
      <div className="container footer__tiles">
        {TILE_LINKS.map((tile) => (
          <a
            key={tile.label}
            href={tile.href}
            target={tile.external ? "_blank" : undefined}
            rel={tile.external ? "noreferrer" : undefined}
            className="footer__tile"
            data-binary-link="true"
          >
            {tile.label}
          </a>
        ))}
      </div>
      <div className="container footer__about">
        <LogoSVG />
        <p>
          Clarity, velocity, and collaboration for web3 teams who refuse to
          compromise on security.
        </p>
      </div>
      <div className="footer__bottom">
        <p>© 2025 auditmos. all rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
