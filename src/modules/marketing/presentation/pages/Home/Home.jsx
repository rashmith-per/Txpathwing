import OnePlatform from "../../components/OnePlatform/OnePlatform";
import CTA from "../../components/CTA/CTA";
import Mode from "../../components/Modes/Modes";
import FAQ from "../../components/FAQ/FAQ";
import "./Home.css";
import Courses from "../../pages/Courses/Courses";
import Hero from "../../components/Hero/Hero";
import HiringPartners from "../../components/HiringPartners/HiringPartner";
import WhoWeAre from "../../components/WhoWeAre/WhoWeAre";
import StudentReviews from "../StudentReviews/StudentReviews";
import Programtraning from "../../components/ProgramTraning/programtraning";
import InternshipSection from "../../components/Internship/Internship";
 
const Home = () => {
  return (
    <>
      <Hero />

      

      {/* who we are Section */}
      <WhoWeAre />
      {/* Delivery Modes Section */}
      <OnePlatform />
 
      < Programtraning />

      <Mode />

      < InternshipSection/>
 
      {/* Courses Section */}
      <Courses />
     
      <HiringPartners />
 
      {/* CTA / Credential Verification */}
      <CTA />
 
 
      <StudentReviews/>
 
      {/* FAQ Section */}
      <FAQ />
 
    </>
   
  );
}
 
export default Home;
 