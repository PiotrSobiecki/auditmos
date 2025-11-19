import { FC, useMemo } from "react";
import { LINKS } from "@/constants/links";
import useRevealOnIntersect from "@/hooks/useRevealOnIntersect";
import { getRevealStyle } from "@/utils/reveal";

const resources = [
  {
    title: "Audit playbook",
    description:
      "Step-by-step checklist: discovery, scope definition, and report delivery.",
    link: LINKS.RESOURCES.AUDIT_PROCESS,
    action: "Download the process",
  },
  {
    title: "Hiring challenge",
    description:
      "Join the team by auditing sample contracts and sharing your findings.",
    link: LINKS.RESOURCES.WORK_WITH_US,
    action: "See the brief",
  },
  {
    title: "Security contacts",
    description:
      "Directory of security teams across major ecosystems for fast escalation.",
    link: LINKS.RESOURCES.SECURITY_CONTACTS,
    action: "Open directory",
  },
];

const Resources: FC = () => {
  const { ref: sectionRef, isVisible } = useRevealOnIntersect({
    threshold: 0.2,
    rootMargin: "-5% 0px",
  });

  const delaySteps = useMemo(
    () => resources.map((_, index) => index * 110),
    []
  );

  return (
    <section id="resources" className="resources" ref={sectionRef}>
      <div className="container">
        <div
          className="section-header"
          style={getRevealStyle(isVisible, { offset: 40, duration: "1s" })}
        >
          <p className="eyebrow">Resources</p>
          <h2>Resources that bring clarity before you even sign a scope.</h2>
        </div>
        <div className="resources__grid">
          {resources.map((resource, index) => (
            <article
              key={resource.title}
              className="resource-card"
              style={getRevealStyle(isVisible, {
                offset: 50,
                delay: delaySteps[index],
              })}
            >
              <div>
                <p className="resource-card__eyebrow">{resource.title}</p>
                <p>{resource.description}</p>
              </div>
              <a href={resource.link} target="_blank" rel="noreferrer">
                {resource.action}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
