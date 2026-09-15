<<<<<<< HEAD
import React from "react";
import OnePlatform from "../../components/OnePlatform/OnePlatform";
import ElevenStages from "../Learner_journey/Learner_journey";
import Courses from "../Courses/Courses";
import CTA from "../../components/CTA/CTA";
=======

import LearnerJourney from "../Learner_journey/Learner_journey";




import CTA from "../../components/CTA/CTA";
import OnePlatfrom from "../../components/OnePlatform/OnePlatform";
import "./Home.css";
>>>>>>> 030362553fbc18fa5b02349719c22c8ece528015
import Mode from "../../components/Modes/Modes";
import FAQ from "../../components/FAQ/FAQ";
import "./Home.css";

const Home = () => {
  return (
    <>
<<<<<<< HEAD
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
=======
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
>>>>>>> 030362553fbc18fa5b02349719c22c8ece528015
      <FAQ />
    </>
  );
};

export default Home;