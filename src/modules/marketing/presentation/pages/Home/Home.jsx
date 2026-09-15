import OnePlatfrom from "../../components/OnePlatform/OnePlatform";
import ElevenStages from "../../../presentation/pages/Learner_journey/Learner_journey";
import "./Home.css";
import Mode from "../../components/Modes/Modes";
import FAQ from "../../components/FAQ/FAQ";
import Cources from "../../pages/Courses/Courses";

const Home = () => {
  
  return (
    <>
    <OnePlatfrom />
    <ElevenStages />
    <Cources />
    <Mode />
    <FAQ />
    </>
  );
};

export default Home;