import "./GetQuotHero.css";

const institution = {
  heroTitle: "Build a Tech Career!",
  heroText:
    "Explore practical technology programs and find the right course for your next career step.",
};

const technologies = [
  { mark: "PY", name: "PYTHON FULL STACK ", angle: "0deg" },
  { mark: "J", name: "JAVA FULL STACK", angle: "60deg" },
  { mark: "AWS", name: "AWS DEVOPS ENGINEER", angle: "120deg" },
  { mark: "AI/ML", name: "MACHINE LEARNING ", angle: "180deg" },
  { mark: "R", name: "REACT.JS", angle: "240deg" },
  { mark: "AI", name: "AGENTIC AI", angle: "300deg" },
];
 
export default function Hero({ onApply }) {
  const highlightedTitle = "Tech Career!";
  const highlightIndex = institution.heroTitle.indexOf(highlightedTitle);

  const handleApply = () => {
    if (onApply) {
      onApply();
      return;
    }

    document.getElementById("gq-enquiry")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
<section id="top" className="hero">
<span className="hero-orbit-bottom" aria-hidden="true" />
<div className="wrap hero-grid">
<div className="hero-copy">
<p className="eyebrow">Learn today. Build what’s next.</p>
<h1>
            {highlightIndex < 0 ? institution.heroTitle : (
<>
                {institution.heroTitle.slice(0, highlightIndex)}
<span className="hero-title-highlight">
                  {institution.heroTitle.slice(highlightIndex)}
</span>
</>
            )}
</h1>
<p className="hero-text">{institution.heroText}</p>
<div className="row">
<button type="button" className="btn big" onClick={handleApply}>Apply Now</button>
<a className="btn ghost big" href="#gq-courses">See courses</a>
</div>
</div>
 
        <div className="hero-art" aria-hidden="true">
<div className="tech-carousel-stage">
<div className="tech-carousel">
              {technologies.map((technology) => (
<div
                  className="tech-card"
                  key={technology.name}
                  style={{ "--angle": technology.angle }}
>
<span className="tech-mark">{technology.mark}</span>
<strong>{technology.name}</strong>
<small>Explore &amp; build</small>
</div>
              ))}
</div>
</div>
</div>
</div>
</section>
  );
}