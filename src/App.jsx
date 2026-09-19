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
        <Route path="/events" element={<Events />} />
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/learner-journey" element={<LearnerJourney />} />
        <Route path="/about" element={<About />} />
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
