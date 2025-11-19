import { FC, useEffect, useMemo, useState } from "react";
import useRevealOnIntersect from "@/hooks/useRevealOnIntersect";

const stats = [
  {
    value: "20+",
    label: "audits shipped with zero incidents",
    detail: "Full visibility from scoping through remediation.",
  },
  {
    value: "$10M+",
    label: "capital protected",
    detail: "From launchpads to L2 infrastructure.",
  },
  {
    value: "24h",
    label: "average time to first fixes",
    detail: "Our team plugs into your core squad immediately.",
  },
];

const BINARY_SEQUENCE_LENGTH = 28;

const generateBinaryString = () =>
  Array.from({ length: BINARY_SEQUENCE_LENGTH })
    .map(() => (Math.random() > 0.5 ? "1" : "0"))
    .join("");

const Stats: FC = () => {
  const { ref: sectionRef, isVisible } = useRevealOnIntersect({
    threshold: 0.35,
    rootMargin: "-10% 0px",
  });
  const [binaryText, setBinaryText] = useState(generateBinaryString);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const interval = setInterval(() => {
      setBinaryText(generateBinaryString());
    }, 400);

    return () => clearInterval(interval);
  }, [isVisible]);

  const cardDelaySteps = useMemo(
    () =>
      stats.map((_, index) => ({
        transitionDelay: `${index * 120}ms`,
      })),
    []
  );

  return (
    <section className="stats" ref={sectionRef}>
      <div className="container">
        <div
          className={`section-header stats__intro${
            isVisible ? " stats__intro--visible" : ""
          }`}
        >
          <p className="eyebrow">Trust signals</p>
          <small className="section-header__binary" aria-hidden="true">
            {binaryText}
          </small>
          <h2>Transparent metrics instead of marketing slogans.</h2>
        </div>
        <div className="stats__grid">
          {stats.map((stat, index) => (
            <article
              className={`stats__card${
                isVisible ? " stats__card--visible" : ""
              }`}
              key={stat.label}
              style={cardDelaySteps[index]}
            >
              <span className="stats__value">{stat.value}</span>
              <p className="stats__label">{stat.label}</p>
              <p className="stats__detail">{stat.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
