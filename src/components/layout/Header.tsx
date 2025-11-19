import { FC, useEffect, useRef } from "react";
import { LogoSVG, MenuButtonSVG } from "../shared/Icons";
import { FaXTwitter } from "react-icons/fa6";
import { LINKS } from "@/constants/links";

interface HeaderProps {
  onMenuToggle: () => void;
}

const NAV_ITEMS = [
  { label: "home", href: "/" },
  { label: "services", href: "/#services" },
  { label: "audits", href: "/#audits" },
  { label: "resources", href: "/#resources" },
];

const CHARS = "01";

const Header: FC<HeaderProps> = ({ onMenuToggle }) => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const links = navRef.current?.querySelectorAll("a");
    if (!links) return;

    const handlers = new Map<HTMLAnchorElement, () => void>();
    const originalTexts = new Map<HTMLAnchorElement, string>();

    // Zapisz oryginalne teksty z NAV_ITEMS
    links.forEach((link, index) => {
      const text = NAV_ITEMS[index]?.label || "";
      originalTexts.set(link, text);
      link.dataset.text = text;
    });

    const scrambleText = (element: HTMLAnchorElement) => {
      const originalText = originalTexts.get(element) || "";
      if (!originalText) return;

      const originalWidth = element.offsetWidth;
      element.style.minWidth = `${originalWidth}px`;

      let iteration = 0;
      const maxIterations = originalText.length * 3;
      let currentIteration = 0;

      const interval = setInterval(() => {
        if (currentIteration >= maxIterations) {
          element.textContent = originalText;
          clearInterval(interval);
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
    };

    links.forEach((link) => {
      const handler = () => scrambleText(link);
      handlers.set(link, handler);
      link.addEventListener("mouseenter", handler);
    });

    return () => {
      handlers.forEach((handler, link) => {
        link.removeEventListener("mouseenter", handler);
      });
    };
  }, []);

  return (
    <header className="site-header">
      <div className="container header__inner">
        <a href="/" className="brand">
          <LogoSVG />
        </a>

        <nav className="site-nav" ref={navRef}>
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header__cta">
          <a
            href={LINKS.ACTIONS.REQUEST_AUDIT}
            target="_blank"
            rel="noreferrer"
            className="btn btn_primary"
          >
            Request audit
          </a>
          <a
            href={LINKS.SOCIAL.TWITTER}
            target="_blank"
            rel="noreferrer"
            className="header__x-link"
            aria-label="Follow Auditmos on X"
          >
            <FaXTwitter />
          </a>
          <button
            className="button_mobile"
            onClick={onMenuToggle}
            aria-label="Open mobile menu"
          >
            <MenuButtonSVG />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
