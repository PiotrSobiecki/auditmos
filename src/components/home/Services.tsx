import { FC, useRef, useMemo, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import coverImage from "../../../assets/img/cover.png";
import useRevealOnIntersect from "../../hooks/useRevealOnIntersect";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  title: string;
  description: string;
  category: string;
  accentImage?: string;
}

const services: Service[] = [
  {
    title: "Smart Contract & L2 Audits",
    description:
      "Full-stack reviews of architecture, testing, deployments, and threat modeling.",
    category: "Security",
    accentImage:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
  },
  {
    title: "Token Listing Readiness",
    description:
      "Documentation, tokenomics, and liquidity plans tailored for CEX and DEX listings.",
    category: "Growth",
    accentImage:
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
  },
  {
    title: "DevSecOps Enablement",
    description:
      "Workshops and CI/CD automation that keep security standards high post-audit.",
    category: "Enablement",
    accentImage:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
  },
  {
    title: "Risk & Compliance",
    description:
      "Risk mapping plus hands-on support for GDPR, SOC 2, and investor reporting.",
    category: "Governance",
    accentImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  },
  {
    title: "Incident Response Playbooks",
    description:
      "Battle-tested runbooks for exploits covering comms, channels, and action plans.",
    category: "Operations",
    accentImage:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
  },
  {
    title: "On-demand Research",
    description:
      "Rapid due diligence on partners, tooling, and integrations before production.",
    category: "Advisory",
    accentImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  },
];

interface ServiceCardProps {
  service: Service;
  index: number;
  totalCards: number;
  isVisible: boolean;
  delayStyle: React.CSSProperties;
}

const ServiceCard: FC<ServiceCardProps> = ({
  service,
  index,
  isVisible,
  delayStyle,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCompactStack, setIsCompactStack] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCompactStack(window.innerWidth <= 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !isVisible) return;

    // Czekamy aż karta się pojawi (reveal animation)
    const timer = setTimeout(() => {
      // GSAP ScrollTrigger animacja dla każdej karty
      gsap.to(card, {
        scale: 0.95,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top 140px",
          end: "bottom 140px",
          scrub: true,
        },
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === card) {
          trigger.kill();
        }
      });
    };
  }, [isVisible]);

  const baseTop = isCompactStack ? 90 : 140;
  const verticalStep = isCompactStack ? 18 : 30;
  const horizontalStep = isCompactStack ? 8 : 15;

  const stickyTop = baseTop + index * verticalStep;
  const leftOffset = index * horizontalStep;

  return (
    <article
      ref={cardRef}
      className={`service-card service-card--stack ${
        isVisible ? "service-card--visible" : ""
      }`}
      style={{
        position: "sticky",
        top: `${stickyTop}px`,
        marginLeft: `${leftOffset}px`,
        marginBottom: "100px",
        transformOrigin: "center top",
        backgroundImage: `url(${coverImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...delayStyle,
      }}
    >
      {service.accentImage && (
        <div
          className="service-card__accent"
          style={{
            backgroundImage: `url(${service.accentImage})`,
          }}
        />
      )}
      <div className="service-card__overlay"></div>
      <div className="service-card__content">
        <span className="service-card__tag">{service.category}</span>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </div>
    </article>
  );
};

const Services: FC = () => {
  const { ref: sectionRef, isVisible } = useRevealOnIntersect({
    threshold: 0.08,
    rootMargin: "0px",
  });

  const cardDelaySteps = useMemo(
    () =>
      services.map((_, index) => ({
        transitionDelay: `${index * 140 + 200}ms`,
      })),
    []
  );

  return (
    <section id="services" className="services" ref={sectionRef}>
      <div className="container">
        <div
          className={`section-header services__intro ${
            isVisible ? "services__intro--visible" : ""
          }`}
        >
          <p className="eyebrow">Services</p>
          <h2>Modular engagements matched to the pace of your roadmap.</h2>
        </div>
        <div className="services__stack">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              totalCards={services.length}
              isVisible={isVisible}
              delayStyle={cardDelaySteps[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
