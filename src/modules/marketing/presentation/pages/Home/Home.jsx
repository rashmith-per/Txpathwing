
import LearnerJourney from "../Learner_journey/Learner_journey";




import CTA from "../../components/CTA/CTA";
import OnePlatfrom from "../../components/OnePlatform/OnePlatform";
import "./Home.css";
import Mode from "../../components/Modes/Modes";
import FAQ from "../../components/FAQ/FAQ";
import Cources from "../../pages/Courses/Courses";

const Home = () => {
  return (
    <>
      {/* One Platform */}
      <OnePlatfrom />

      {/* Learner Journey */}
    <LearnerJourney />

      {/* Courses */}
      <Cources />

      {/* CTA */}
      <CTA />

      {/* Modes */}
      <Mode />

      {/* FAQ */}
      <FAQ />
    </>
  );
};

export default Home;