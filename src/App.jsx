import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout></MainLayout>} />
      </Routes>
    </div>
  );
}

export default App;
