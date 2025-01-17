import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Commitment {
  id: number;
  amount: string;
  currency: string;
}

const assetClasses = [
  { value: "pe", label: "Private Equity" },
  { value: "pd", label: "Private Debt" },
  { value: "re", label: "Real Estate" },
  { value: "inf", label: "Infrastructure" },
  { value: "nr", label: "Natural Resources" },
  { value: "hf", label: "Hedge Funds" },
];

const InvestorDetail: React.FC = () => {
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [selectedAssetClass, setSelectedAssetClass] = useState<string>("pe");
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id && selectedAssetClass) {
      fetch(
        `http://localhost:8000/api/investor/commitment/${selectedAssetClass}/${id}`,
      )
        .then((response) => response.json())
        .then((data) => setCommitments(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [id, selectedAssetClass]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAssetClass(event.target.value);
  };

  return (
    <div>
      <h1 className="heading">Investor {id}</h1>
      <div className="dropdown-container">
        <label htmlFor="assetClass" style={{ display: "none" }}>
          Asset Class:
        </label>
        <select
          id="assetClass"
          value={selectedAssetClass}
          onChange={handleChange}
        >
          {assetClasses.map((ac) => (
            <option key={ac.value} value={ac.value}>
              {ac.label}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>CommitmentID</th>
            <th>Currency</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {commitments &&
            commitments.map((commitment) => (
              <tr key={commitment.id}>
                <td>{commitment.id}</td>
                <td>{commitment.currency}</td>
                <td>{commitment.amount}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvestorDetail;
