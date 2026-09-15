import React from "react";
import OnePlatform from "../../components/OnePlatform/OnePlatform";
import LearnerJourney from "../Learner_journey/Learner_journey";
import CTA from "../../components/CTA/CTA";
import Mode from "../../components/Modes/Modes";
import FAQ from "../../components/FAQ/FAQ";
import "./Home.css";
import Cources from "../../pages/Courses/Courses";
import TrustSection from "../../components/TrustSection/TrustSection";
import Hero from "../../components/Hero/Hero";

const Home = () => {
  return (
    <>
    <Hero/>
      {/* One Platform */}
      <OnePlatfrom />

      {/* Learner Journey Section */}
      <LearnerJourney />

      {/* Courses Section */}
      <Courses />

      {/* CTA / Credential Verification */}
      <CTA />

      {/* Delivery Modes Section */}
      <Mode />
      
      <TrustSection />

      {/* FAQ Section */}
      <FAQ />
    </>
  );
};

export default Home;