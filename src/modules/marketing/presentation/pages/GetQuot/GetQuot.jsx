
import { useState } from "react";

import GetQuotHero from "./GetQuotHero/GetQuotHero";
import { GetQuotIntro } from "./GetQuotIntro/GetQuotIntro";
import GetQuotCourse from "./GetQuotCourse/GetQuotCourse";
import GetQuotForm from "./GetQuotForm/GetQuotForm";

export default function GetQuot() {
  const [selectedCourse, setSelectedCourse] = useState("");

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
      <GetQuotForm selectedCourse={selectedCourse} />
    </main>
  );
}
