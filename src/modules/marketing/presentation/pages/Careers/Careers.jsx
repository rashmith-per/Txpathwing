import React, { useState } from "react";
import SEO from "../SEO/SEO";
import CareerHero from "./CareerHero";
import WhyTXPathwing from "./WhyTXPathwing";
import CareerTeams from "./CareerTeams";
import OpenPositions from "./OpenPositions";
import CareerGrowth from "./CareerGrowth";
import LearningDevelopment from "./LearningDevelopment";
import LifeAtTXPathwing from "./LifeAtTXPathwing";
import EmployeeStories from "./EmployeeStories";
import BenefitsPerks from "./BenefitsPerks";
import HiringProcess from "./HiringProcess";
import InternshipSection from "./InternshipSection";
import CareerCTA from "./CareerCTA";
import ResumeModal from "./ResumeModal";
import { initialJobs } from "../Careers/Career";
import "./Careers.css";

const Careers = () => {
  // Backend-ready jobs state (initially populated from careerData.js)
  // Later: useEffect(() => { fetch('/api/careers/jobs/').then(...) }, []);
  const [jobs] = useState(initialJobs);

  // Department filter state shared between CareerTeams and OpenPositions
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  // Application / Resume Modal states
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [selectedJobForModal, setSelectedJobForModal] = useState(null);

  const handleApplyJob = (job) => {
    setSelectedJobForModal(job);
    setIsResumeModalOpen(true);
  };

  const handleOpenGeneralResume = () => {
    setSelectedJobForModal(null);
    setIsResumeModalOpen(true);
  };

  const handleDepartmentSelect = (deptName) => {
    setSelectedDepartment(deptName);
  };

  const handleFilterInternships = () => {
    setSelectedDepartment("All");
  };

  const handleFilterEntryLevel = () => {
    setSelectedDepartment("All");
  };

  return (
    <main className="careers-page-main">
      <SEO
        title="Careers"
        description="Build your career with TX Pathwing. Explore open positions in engineering, training, design, operations, and student mentorship."
        canonicalUrl="/careers"
      />

      {/* 4. HERO SECTION */}
      <CareerHero
        onExploreClick={() => {
          const el = document.getElementById("open-positions");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        onLifeClick={() => {
          const el = document.getElementById("life-at-txpathwing");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      />

      {/* 5. WHY TX PATHWING */}
      <WhyTXPathwing />

      {/* 6. FIND YOUR TEAM */}
      <CareerTeams onSelectDepartment={handleDepartmentSelect} />

      {/* 7. OPEN POSITIONS */}
      <OpenPositions
        jobs={jobs}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        onApplyJob={handleApplyJob}
        onOpenResumeModal={handleOpenGeneralResume}
      />

      {/* 8. CAREER GROWTH */}
      <CareerGrowth />

      {/* 9. LEARNING & DEVELOPMENT */}
      <LearningDevelopment />

      {/* 10. LIFE AT TX PATHWING */}
      <LifeAtTXPathwing />

      {/* 11. EMPLOYEE STORIES */}
      <EmployeeStories />

      {/* 12. BENEFITS & PERKS */}
      <BenefitsPerks />

      {/* 13. HIRING PROCESS */}
      <HiringProcess />

      {/* 14. FRESHERS & INTERNSHIPS */}
      <InternshipSection
        onFilterInternships={handleFilterInternships}
        onFilterEntryLevel={handleFilterEntryLevel}
      />

      {/* 15 & 16. RESUME SUBMISSION & FINAL CTA */}
      <CareerCTA
        onSubmitResumeClick={handleOpenGeneralResume}
        onExploreClick={() => {
          const el = document.getElementById("open-positions");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      />

      {/* Shared Application / Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        selectedJob={selectedJobForModal}
      />
    </main>
  );
};

export default Careers;
