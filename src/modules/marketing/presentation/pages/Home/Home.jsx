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

      {/* Learner Journey Section */}
      <LearnerJourney />

      {/* Courses Section */}
      <Cources />

      {/* Delivery Modes Section */}
      <Mode />
      
      <TrustSection />

       {/* One Platform */}
      <OnePlatform />

      {/* CTA / Credential Verification */}
      <CTA />

      {/* FAQ Section */}
      <FAQ />
    </>
  );
}

export default Home;