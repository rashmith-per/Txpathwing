import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./modules/marketing/presentation/pages/Home/Home";
import Courses from "./modules/marketing/presentation/pages/Courses/Courses";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/home" element={<Home />} />

        <Route path="/courses" element={<Courses />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;