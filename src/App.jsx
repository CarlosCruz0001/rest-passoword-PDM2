import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ResetPassword from "./ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
