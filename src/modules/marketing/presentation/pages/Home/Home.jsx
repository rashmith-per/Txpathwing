<<<<<<< HEAD
import OnePlatform from "../../components/OnePlatform/OnePlatform";
import LearnerJourney from "../Learner_journey/Learner_journey";
import Courses from "../Courses/Courses";
=======

import ElevenStages from "../Learner_journey/Learner_journey";

>>>>>>> 49e77f4fdfe160422533fc1dd1db55874db88294
import CTA from "../../components/CTA/CTA";
import OnePlatfrom from "../../components/OnePlatform/OnePlatform";
import ElevenStages from "../../../presentation/pages/Learner_journey/Learner_journey";
import "./Home.css";
import Mode from "../../components/Modes/Modes";
import FAQ from "../../components/FAQ/FAQ";
import Cources from "../../pages/Courses/Courses";

const Home = () => {
  
  return (
    <>
      {/* One Platform Section */}
      <OnePlatform />
      <LearnerJourney />
      <Courses />
      <CTA/>

      {/* Delivery Section */}
      <section className="delivery-section">
        <div className="delivery-container">

          {/* Heading */}
          <div className="delivery-header">
            <p className="delivery-eyebrow">DELIVERY</p>

            <h2>
              Three modes, the same{" "}
              <span>record of progress.</span>
            </h2>

            <p className="delivery-intro">
              Learn in the environment that works best for you — live online,
              face-to-face in the classroom, or a flexible combination of both.
            </p>
          </div>

          {/* Cards */}
          <div className="delivery-grid">
            {deliveryModes.map((mode, index) => (
              <article
                className="delivery-card"
                key={mode.title}
                style={{
                  animationDelay: `${index * 0.12}s`,
                }}
              >
                {/* Image */}
                <div className="delivery-image">
                  <span className="delivery-number">
                    {mode.number}
                  </span>

                  <img
                    src={mode.image}
                    alt={mode.title}
                    loading="lazy"
                  />

                  <span className="delivery-badge">
                    {mode.type}
                  </span>
                </div>

                {/* Content */}
                <div className="delivery-content">
                  <h3>{mode.title}</h3>

                  <p>{mode.description}</p>

                  <a href="#" className="delivery-link">
                    <span>Explore mode</span>

                    <span className="delivery-arrow">
                      ↗
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>
    <Mode />
    <FAQ />
    </>
  );
};

export default Home;