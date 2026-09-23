import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./modules/marketing/presentation/components/Header/Header";
import Footer from "./modules/marketing/presentation/components/Footer/Footer";
import Home from "./modules/marketing/presentation/pages/Home/Home";
import LearnerJourney from "./modules/marketing/presentation/pages/Learner_journey/Learner_journey";
import About from "./modules/marketing/presentation/pages/About/About";
import Events from "./modules/marketing/presentation/pages/Events/Events";
import Marketplace from "./modules/marketing/presentation/pages/MarketPlace/MarketPlace";
import SignIn from "./modules/marketing/presentation/pages/SignIn/SignIn";
import Blog from "./modules/marketing/presentation/pages/Blog/Blog";
import CareersHero from "./modules/marketing/presentation/pages/Careers/Careers";
import Organization from "./modules/marketing/presentation/pages/Contact/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  const { pathname } = useLocation();
  const hideLayout = ["/login"].includes(pathname);

  return (
    <>
      <ScrollToTop />
      {!hideLayout && <Header />}

      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/careers" element={<CareersHero />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/learner-journey" element={<LearnerJourney />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Organization/>}/>
        <Route path="/login" element={<SignIn />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
