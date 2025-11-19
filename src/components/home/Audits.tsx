import { CSSProperties, FC, useMemo, useState } from "react";
import useRevealOnIntersect from "@/hooks/useRevealOnIntersect";
import { getRevealStyle } from "@/utils/reveal";
import auditsVideo from "../../../assets/video/kafelek.mp4";
//import tileVideo from "../../../assets/video/kafelek234.mp4";

interface Audit {
  name: string;
  reportUrl: string;
  date: string;
}

interface AuditCardProps extends Audit {
  style?: CSSProperties;
  className?: string;
}

const AuditCard: FC<AuditCardProps> = ({
  name,
  reportUrl,
  date,
  style,
  className = "",
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Generujemy siatkę punktów
  const gridSize = 30; // Co ile pikseli punkt
  const gridPoints = [];

  if (isHovered) {
    const cardWidth = 400; // Przybliżona szerokość karty
    const cardHeight = 360; // Przybliżona wysokość karty

    for (let y = 0; y <= cardHeight; y += gridSize) {
      for (let x = 0; x <= cardWidth; x += gridSize) {
        const distance = Math.sqrt(
          Math.pow(x - mousePos.x, 2) + Math.pow(y - mousePos.y, 2)
        );
        const maxDistance = 120; // Promień wpływu
        const effect = Math.max(0, 1 - distance / maxDistance);

        gridPoints.push({
          x,
          y,
          scale: 1 + effect * 2.5, // Powiększenie
          color:
            effect > 0
              ? `rgba(147, 51, 234, ${effect})`
              : "rgba(255, 255, 255, 0.15)", // Fioletowy gradient
        });
      }
    }
  }

  return (
    <article
      className={`audit-card ${className}`.trim()}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* <video
        className="audit-card__video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={tileVideo} type="video/mp4" />
      </video>*/}
      {isHovered && (
        <svg
          className="audit-card__grid"
          viewBox="0 0 400 360"
          preserveAspectRatio="none"
        >
          {gridPoints.map((point, i) => (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r={2 * point.scale}
              fill={point.color}
              style={{
                transition: "all 0.1s ease-out",
              }}
            />
          ))}
        </svg>
      )}
      <div className="audit-card__content">
        <p className="audit-card__label">Secured</p>
        <h3>{name}</h3>
        <p className="audit-card__date">{date}</p>
        <a
          href={reportUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn_secondary"
        >
          Read more
        </a>
      </div>
    </article>
  );
};

const Audits: FC = () => {
  const [showAll, setShowAll] = useState(false);
  const INITIAL_DISPLAY_COUNT = 6;
  const { ref: sectionRef, isVisible } = useRevealOnIntersect({
    threshold: 0.2,
    rootMargin: "-5% 0px",
  });

  const audits: Audit[] = [
    {
      name: "Cookie3 Gated Leaderboard",
      reportUrl:
        "https://github.com/auditmos/audits/blob/main/2025_07_28_COOKIE3_GATED_LEADERBOARD.pdf",
      date: "July 28, 2025",
    },
    {
      name: "Honey Fun Token",
      reportUrl:
        "https://github.com/auditmos/audits/blob/main/2025_01_30_HONEY_FUN_TOKEN.pdf",
      date: "January 30, 2025",
    },
    {
      name: "Cookie3 Airdrop Farming Lock",
      reportUrl:
        "https://github.com/auditmos/audits/blob/main/2025_01_08_COOKIE3_AIRDROP_FARMING_LOCK.pdf",
      date: "January 8, 2025",
    },
    {
      name: "AI Agent Layer",
      reportUrl:
        "https://github.com/auditmos/audits/blob/main/2024_11_08_AI_AGENT_LAYER.pdf",
      date: "November 8, 2024",
    },
    {
      name: "Cookie3",
      reportUrl:
        "https://github.com/auditmos/audits/blob/main/2024_06_04_COOKIE3.pdf",
      date: "June 4, 2024",
    },
    {
      name: "Alaska Gold Rush",
      reportUrl:
        "https://github.com/auditmos/audits/blob/main/2024_04_15_ALASKA_GOLD_RUSH.pdf",
      date: "April 15, 2024",
    },
    {
      name: "SpartaDEX",
      reportUrl:
        "https://github.com/auditmos/audits/blob/main/2024_04_10_SPARTADEX.pdf",
      date: "April 10, 2024",
    },
    {
      name: "StarHeroes",
      reportUrl:
        "https://github.com/auditmos/audits/blob/main/2024_02_26_STARHEROES.pdf",
      date: "February 26, 2024",
    },
    {
      name: "GameSwift",
      reportUrl:
        "https://github.com/auditmos/audits/blob/main/2023_23_06_GAMESWIFT.pdf",
      date: "June 23, 2023",
    },
    {
      name: "RoboHero",
      reportUrl:
        "https://github.com/auditmos/audits/blob/main/2022_03_04_ROBOHERO.pdf",
      date: "March 4, 2022",
    },
    {
      name: "LunaVerse",
      reportUrl:
        "https://github.com/auditmos/audits/blob/main/2022_02_22_LUNAVERSE.pdf",
      date: "February 22, 2022",
    },
    {
      name: "Terrnado",
      reportUrl:
        "https://github.com/auditmos/audits/blob/main/2022_02_10_TERRNADO.pdf",
      date: "February 10, 2022",
    },
    {
      name: "Kujira Orca",
      reportUrl:
        "https://github.com/auditmos/audits/blob/main/2022_01_24_KUJIRA_ORCA.pdf",
      date: "January 24, 2022",
    },
    {
      name: "Bitlocus Token Lock",
      reportUrl:
        "https://github.com/auditmos/audits/blob/main/2022_01_20_BITLOCUS_TOKEN_LOCK.pdf",
      date: "January 20, 2022",
    },
    {
      name: "PlayNity",
      reportUrl:
        "https://github.com/auditmos/audits/blob/main/2021_12_15_PLAYNITY.pdf",
      date: "December 15, 2021",
    },
    {
      name: "MintDAO",
      reportUrl:
        "https://github.com/auditmos/audits/blob/main/2021_12_05_MINTDAO.pdf",
      date: "December 5, 2021",
    },
    {
      name: "Bitlocus",
      reportUrl:
        "https://github.com/auditmos/audits/blob/main/2021_11_25_BITLOCUS.pdf",
      date: "November 25, 2021",
    },
    {
      name: "Loop Finance",
      reportUrl:
        "https://github.com/auditmos/audits/blob/main/2021_11_05_LOOP.pdf",
      date: "November 5, 2021",
    },
    {
      name: "TerraLand",
      reportUrl:
        "https://github.com/auditmos/audits/blob/main/2021_11_04_TERRALAND.pdf",
      date: "November 4, 2021",
    },
    {
      name: "Loop Finance",
      reportUrl:
        "https://github.com/auditmos/audits/blob/main/2021_10_10_LOOP.pdf",
      date: "October 10, 2021",
    },
    {
      name: "StarTerra",
      reportUrl:
        "https://github.com/auditmos/audits/blob/main/2021_08_21_STARTERRA.pdf",
      date: "August 21, 2021",
    },
  ];

  const displayedAudits = showAll
    ? audits
    : audits.slice(0, INITIAL_DISPLAY_COUNT);

  const sectionHeaderStyle = useMemo(
    () => getRevealStyle(isVisible, { offset: 35, duration: "1s" }),
    [isVisible]
  );

  const getCardStyle = (index: number) =>
    getRevealStyle(isVisible, {
      delay: index * 70,
      offset: 55,
    });

  const actionsStyle = useMemo(
    () =>
      getRevealStyle(isVisible, {
        delay: displayedAudits.length * 45,
        offset: 35,
      }),
    [displayedAudits.length, isVisible]
  );

  return (
    <section id="audits" className="audits section-with-video" ref={sectionRef}>
      <video className="section-bg-video" autoPlay muted loop playsInline>
        <source src={auditsVideo} type="video/mp4" />
      </video>
      <div className="container">
        <div className="section-header" style={sectionHeaderStyle}>
          <p className="eyebrow">work</p>
          <h2>Reports that help founders make faster, confident decisions.</h2>
        </div>
        <div className="audits__grid">
          {displayedAudits.map((audit, index) => (
            <AuditCard
              key={audit.name}
              {...audit}
              style={getCardStyle(index)}
            />
          ))}
        </div>
        {audits.length > INITIAL_DISPLAY_COUNT && (
          <div className="section-actions" style={actionsStyle}>
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn btn_secondary"
            >
              {showAll ? "Show fewer" : "Show more"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Audits;
