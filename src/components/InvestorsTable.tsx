import React, { useState, useEffect } from "react";

interface Investor {
  firm_id: string;
  firm_name: string;
  firm_type: string;
  date_added: string;
  address: string;
}

const InvestorsTable: React.FC = () => {
  const [investors, setInvestors] = useState<Investor[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/investors")
      .then((response) => response.json())
      .then((data) => setInvestors(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <table id="investors-table">
      <thead>
        <tr>
          <th>FirmID</th>
          <th>FirmName</th>
          <th>Type</th>
          <th>DateAdded</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {investors.map((investor) => (
          <tr key={investor.firm_id}>
            <td>{investor.firm_id}</td>
            <td>{investor.firm_name}</td>
            <td>{investor.firm_type}</td>
            <td>{new Date(investor.date_added).toLocaleDateString()}</td>
            <td>{investor.address}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvestorsTable;
