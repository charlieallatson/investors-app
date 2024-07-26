import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InvestorsTable from "./components/InvestorsTable";
import InvestorDetail from "./components/InvestorDetail";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvestorsTable />} />
        <Route path="/investors/:id" element={<InvestorDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
