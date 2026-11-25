import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import GetQuotHero from "./GetQuotHero/GetQuotHero";
import { GetQuotIntro } from "./GetQuotIntro/GetQuotIntro";
import GetQuotCourse from "./GetQuotCourse/GetQuotCourse";
import GetQuotForm from "./GetQuotForm/GetQuotForm";

export default function GetQuot() {
  const [selectedCourse, setSelectedCourse] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#enquiry-form") {
      const formSection = document.getElementById("enquiry-form");

      if (formSection) {
        formSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [location]);

  return (
    <main className="gq">
      {/* Hero section */}
      <GetQuotHero />

      {/* Training and Internship Introduction */}
      <GetQuotIntro />

      {/* Course Selection */}
      <GetQuotCourse
        selectedCourse={selectedCourse}
        onSelectCourse={setSelectedCourse}
      />

      {/* Enquiry Form */}
      <section id="enquiry-form">
        <GetQuotForm selectedCourse={selectedCourse} />
      </section>
    </main>
  );
}