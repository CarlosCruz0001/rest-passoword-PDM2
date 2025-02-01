import React from "react";
import { Routes, Route } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword"; // Certifique-se de que este arquivo existe

function App() {
  return (
    <Routes>
      <Route path="/" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
