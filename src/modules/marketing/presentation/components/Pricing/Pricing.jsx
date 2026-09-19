import { useEffect, useRef, useState } from "react";
import "./Pricing.css";

const pricingPlans = [
  {
    name: "FREE",
    price: "₹0",
    description: "Audit free courses, keep your profile.",
    features: [
      "Free course catalogue",
      "Community discussion",
      "Skill profile & job feed",
      "No certificate",
    ],
    buttonText: "Create account",
  },
  {
    name: "LEARNER PRO",
    badge: "MOST CHOSEN",
    price: "₹1,499",
    period: "/ month",
    description: "Everything in the catalogue, plus the AI tutor.",
    features: [
      "All paid courses & practice tests",
      "AI Learning Assistant + coding labs",
      "Proctored exams & certificates",
      "Priority placement pool",
    ],
    buttonText: "Start 7-day trial",
  },
  {
    name: "INSTITUTION",
    price: "Quoted",
    period: "per seat band",
    description: "For colleges and training providers.",
    features: [
      "Own tenant, domain, branding",
      "Bulk import & department reports",
      "Industry-academia curriculum",
      "Placement drive tooling",
    ],
    buttonText: "Talk to us",
  },
  {
    name: "ENTERPRISE",
    price: "Quoted",
    period: "annual",
    description: "For corporate L&D and compliance.",
    features: [
      "SSO, HRMS & CRM integration",
      "Mandatory training + audit trail",
      "Manager & department dashboards",
      "99.9% uptime SLA",
    ],
    buttonText: "Talk to us",
  },
];

export default function Pricing() {
  const [learnerPrice, setLearnerPrice] = useState(0);
  const pricingRef = useRef(null);

  useEffect(() => {
    const section = pricingRef.current;

    if (!section) return;

    let animationStarted = false;
    let animationFrame;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animationStarted) return;

        animationStarted = true;

        const startTime = performance.now();
        const duration = 1200;

        const animatePrice = (currentTime) => {
          const progress = Math.min(
            (currentTime - startTime) / duration,
            1
          );

          const value = Math.floor(progress * 1499);

          setLearnerPrice(value);

          if (progress < 1) {
            animationFrame = requestAnimationFrame(animatePrice);
          }
        };

        animationFrame = requestAnimationFrame(animatePrice);
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(".pricing-card");
    const buttons = document.querySelectorAll(".pricing-button");

    const handleCardMove = (event) => {
      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();

      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (mouseY - centerY) / 10;
      const rotateY = (centerX - mouseX) / 10;

      card.style.setProperty("--mouse-x", `${mouseX}px`);
      card.style.setProperty("--mouse-y", `${mouseY}px`);

      card.style.transform = `
        perspective(800px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)
        scale(1.02)
      `;
    };

    const handleCardLeave = (event) => {
      event.currentTarget.style.transform =
        "perspective(800px) rotateX(0) rotateY(0) translateY(0) scale(1)";
    };

    const handleButtonMove = (event) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();

      const x =
        event.clientX -
        rect.left -
        rect.width / 2;

      const y =
        event.clientY -
        rect.top -
        rect.height / 2;

      button.style.transform = `
        translate(${x * 0.15}px, ${y * 0.3}px)
      `;
    };

    const handleButtonLeave = (event) => {
      event.currentTarget.style.transform =
        "translate(0, 0)";
    };

    cards.forEach((card) => {
      card.addEventListener("mousemove", handleCardMove);
      card.addEventListener("mouseleave", handleCardLeave);
    });

    buttons.forEach((button) => {
      button.addEventListener("mousemove", handleButtonMove);
      button.addEventListener("mouseleave", handleButtonLeave);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mousemove", handleCardMove);
        card.removeEventListener("mouseleave", handleCardLeave);
      });

      buttons.forEach((button) => {
        button.removeEventListener("mousemove", handleButtonMove);
        button.removeEventListener("mouseleave", handleButtonLeave);
      });
    };
  }, []);

  return (
    <section className="pricing-section">

      <div className="pricing-background">
        <div className="pricing-orb pricing-orb-one"></div>
        <div className="pricing-orb pricing-orb-two"></div>
        <div className="pricing-orb pricing-orb-three"></div>
      </div>

      <div
        className="pricing-container"
        ref={pricingRef}
      >

        {/* Heading */}
        <div className="pricing-header">

          <p className="pricing-label">
            PRICING
          </p>

          <h1>
            Plans that grow
            <br />
            <span>with your journey.</span>
          </h1>

          <p className="pricing-intro">
            All figures are indicative for the prototype.
            Institutional and enterprise agreements are
            quoted per seat band.
          </p>

        </div>


        {/* Pricing Cards */}
        <div className="pricing-grid">

          {pricingPlans.map((plan, index) => (

            <article
              className="pricing-card"
              key={plan.name}
              style={{
                "--card-delay": `${index * 120}ms`,
              }}
            >

              {/* Spotlight */}
              <div className="pricing-spotlight"></div>


              {/* Card Header */}
              <div className="pricing-card-top">

                <span className="pricing-plan-name">
                  {plan.name}
                </span>

                {plan.badge && (
                  <span className="pricing-badge">
                    {plan.badge}
                  </span>
                )}

              </div>


              {/* Price */}
              <div className="pricing-price">

                <h2>
                  {plan.name === "LEARNER PRO"
                    ? `₹${learnerPrice.toLocaleString()}`
                    : plan.price}
                </h2>

                {plan.period && (
                  <span>
                    {plan.period}
                  </span>
                )}

              </div>


              {/* Description */}
              <p className="pricing-description">
                {plan.description}
              </p>


              {/* Features */}
              <ul className="pricing-features">

                {plan.features.map((feature) => (

                  <li key={feature}>

                    <span className="feature-check">
                      ✓
                    </span>

                    <span>
                      {feature}
                    </span>

                  </li>

                ))}

              </ul>


              {/* Button */}
              <button
                type="button"
                className="pricing-button"
              >
                <span>
                  {plan.buttonText}
                </span>

                <span className="pricing-button-arrow">
                  →
                </span>
              </button>

            </article>

          ))}

        </div>

      </div>

    </section>
  );
}