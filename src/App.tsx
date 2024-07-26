import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InvestorsTable from "./components/InvestorsTable";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvestorsTable />} />
      </Routes>
    </Router>
  );
};

export default App;
