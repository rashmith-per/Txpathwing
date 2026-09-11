import OnePlatform from "../../components/OnePlatform/OnePlatform";
import ElevenStages from "../Learner_journey/Learner_journey";
import Courses from "../Courses/Courses";
import CTA from "../../components/CTA/CTA";
import "./Home.css";

const deliveryModes = [
  {
    number: "01",
    type: "Live online",
    title: "Online live",
    description:
      "Join instructor-led sessions from anywhere with real-time interaction, discussion and guided learning.",
    image:
      "https://images.pexels.com/photos/7014767/pexels-photo-7014767.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    number: "02",
    type: "In person",
    title: "Classroom",
    description:
      "Learn face-to-face with instructors and peers in a focused, structured classroom environment.",
    image:
      "https://images.unsplash.com/photo-1758270703928-6a8597669abc?auto=format&fit=crop&fm=jpg&q=80&w=1400",
  },
  {
    number: "03",
    type: "Flexible",
    title: "Hybrid",
    description:
      "Combine classroom learning with online sessions for a flexible experience without losing instructor connection.",
    image:
      "https://images.pexels.com/photos/5905710/pexels-photo-5905710.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
];

function Home() {
  return (
    <>
      {/* One Platform Section */}
      <OnePlatform />
      <ElevenStages />
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
    </>
  );
}

export default Home;