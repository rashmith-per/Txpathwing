import "./GetQuotHero.css";
import java from "../Heroimages/Java.png";
import python from "../Heroimages/Python.png";
import aws from "../Heroimages/Aws.png";
import ai_ml from "../Heroimages/ml.png";
import react from "../Heroimages/React.png";
import ai from "../Heroimages/Agentic.png";
const institution = {
    heroTitle: "Start Building Your Tech Career!",
    heroText:
        " Get industry-oriented training, work on real-time projects, gain internship experience and prepare for your career in technology.",
};

const technologies = [
    { markImage: python, name: "PYTHON FULL STACK ", angle: "0deg" },
    { markImage: java, name: "JAVA FULL STACK", angle: "60deg" },
    { markImage: aws, name: "AWS DEVOPS ENGINEER", angle: "120deg" },
    { markImage: ai_ml, name: "MACHINE LEARNING ", angle: "180deg" },
    { markImage: react, name: "REACT.JS", angle: "240deg" },
    { markImage: ai, name: "AGENTIC AI", angle: "300deg" },
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
                                    <span className="tech-mark">
                                        <img src={technology.markImage} width="50px" height="50px" alt={technology.name} />
                                    </span>
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