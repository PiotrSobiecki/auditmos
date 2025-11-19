import { FC, useMemo } from "react";
import useRevealOnIntersect from "@/hooks/useRevealOnIntersect";
import whyVideo from "../../../assets/video/whyauditmos.mp4";
import { LINKS } from "@/constants/links";

const pillars = [
  {
    title: "Deep-dive discovery",
    description:
      "Technical workshops that surface assumptions early, define scope precisely, and eliminate hidden surprises.",
  },
  {
    title: "Collaborative remediation",
    description:
      "We embed into your communication channels and guide engineers through fixes instead of dropping a PDF and leaving.",
  },
  {
    title: "Evergreen support",
    description:
      "Post-audit DevSecOps playbooks and 30-day check-ins keep standards high long after the report ships.",
  },
];

const WhyAuditmos: FC = () => {
  const { ref: sectionRef, isVisible } = useRevealOnIntersect({
    threshold: 0.25,
    rootMargin: "-5% 0px",
  });

  const cardDelaySteps = useMemo(
    () =>
      pillars.map((_, index) => ({
        transitionDelay: `${index * 140 + 200}ms`,
      })),
    []
  );

  return (
    <section className="why section-with-video" ref={sectionRef}>
      <video
        className="section-bg-video"
        autoPlay
        muted
        loop
        playsInline
        poster=""
      >
        <source src={whyVideo} type="video/mp4" />
      </video>
      <div className="container">
        <div
          className={`section-header why__intro${
            isVisible ? " why__intro--visible" : ""
          }`}
        >
          <p className="eyebrow">Why Auditmos</p>
          <h2>
            A process built for fast-moving web3 teams, without trade-offs.
          </h2>
        </div>
        <div className="why__grid">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className={`why__card${isVisible ? " why__card--visible" : ""}`}
              style={cardDelaySteps[index]}
            >
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
        <div
          className={`why__cta${isVisible ? " why__cta--visible" : ""}`}
          style={{ transitionDelay: `${pillars.length * 140 + 300}ms` }}
        >
          <a
            href={LINKS.ACTIONS.REQUEST_AUDIT}
            target="_blank"
            rel="noreferrer"
            className="btn btn_primary"
          >
            Book an audit
          </a>
          <a href={LINKS.ACTIONS.CONTACT} className="btn btn_secondary">
            Walk through the process
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyAuditmos;
