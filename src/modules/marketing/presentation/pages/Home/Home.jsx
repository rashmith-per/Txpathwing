import React from "react";
import OnePlatform from "../../components/OnePlatform/OnePlatform";
import ElevenStages from "../Learner_journey/Learner_journey";
import Courses from "../Courses/Courses";
import CTA from "../../components/CTA/CTA";
import Mode from "../../components/Modes/Modes";
import FAQ from "../../components/FAQ/FAQ";
import "./Home.css";

const Home = () => {
  return (
    <>
      {/* One Platform Section */}
      <OnePlatform />

      {/* Learner Journey Section */}
      <ElevenStages />

      {/* Courses Section */}
      <Courses />

      {/* CTA / Credential Verification */}
      <CTA />

      {/* Delivery Modes Section */}
      <Mode />

      {/* FAQ Section */}
      <FAQ />
    </>
  );
};

export default Home;