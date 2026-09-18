import React from "react";
import OnePlatform from "../../components/OnePlatform/OnePlatform";
import LearnerJourney from "../Learner_journey/Learner_journey";
import CTA from "../../components/CTA/CTA";
import Mode from "../../components/Modes/Modes";
import FAQ from "../../components/FAQ/FAQ";
import "./Home.css";
import Courses from "../../pages/Courses/Courses";
import TrustSection from "../../components/TrustSection/TrustSection";
import Hero from "../../components/Hero/Hero";
// import Blog from "../Blog/Blog/Blog";
import Pricing from "../../components/Pricing/Pricing";
import HiringPartners from "../../components/HiringPartners/HiringPartner";

const Home = () => {
  return (
    <>
    <Hero/>

      {/* Learner Journey Section */}
      <LearnerJourney />

      {/* Courses Section */}
      <Courses />

      {/* Delivery Modes Section */}
      <Mode />
      <OnePlatform />
      <TrustSection />

       {/* One Platform */}
      
      <HiringPartners />

      {/* CTA / Credential Verification */}
      <CTA />

      <Pricing />

      {/* FAQ Section */}
      <FAQ />
  
    </>
    
  );
}

export default Home;