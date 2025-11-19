import { FC } from "react";
import { CloseSVG } from "./Icons";
import { LINKS } from "@/constants/links";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { label: "home", href: "#top" },
  { label: "services", href: "#services" },
  { label: "audits", href: "#audits", offset: -10 },
  { label: "resources", href: "#resources" },
  { label: "x", href: LINKS.SOCIAL.TWITTER, external: true },
];

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`mobile-menu ${isOpen ? "is-visible" : ""}`}>
      <div
        className="mobile-menu__overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="mobile-menu__panel">
        <div className="mobile-menu__header">
          <p className="mobile-menu__eyebrow">menu</p>
          <button
            className="mobile-menu__close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <CloseSVG />
          </button>
        </div>

        <nav className="mobile-menu__nav">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              data-binary-link="true"
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              aria-label={
                item.label === "x" ? "Follow Auditmos on X" : undefined
              }
              onClick={(event) => {
                if (item.external) {
                  return;
                }

                event.preventDefault();
                onClose();

                let selector = item.href;
                if (item.href === "#top") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  return;
                }

                const target = document.querySelector(selector);

                if (target) {
                  const rect = (target as HTMLElement).getBoundingClientRect();
                  const scrollTarget =
                    window.scrollY +
                    rect.top -
                    (item.offset ?? 0) -
                    (window.innerWidth <= 640 ? 20 : 0);

                  window.scrollTo({
                    top: scrollTarget,
                    behavior: "smooth",
                  });
                }
              }}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={LINKS.ACTIONS.REQUEST_AUDIT}
          target="_blank"
          rel="noreferrer"
          className="btn btn_primary mobile-menu__cta"
          onClick={onClose}
        >
          Request audit
        </a>
      </div>
    </div>
  );
};

export default MobileMenu;
