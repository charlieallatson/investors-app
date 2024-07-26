import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import InvestorsTable from "./InvestorsTable";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          firm_id: "1234",
          firm_name: "Firm A",
          firm_type: "Type A",
          date_added: "2023-01-01",
          address: "Address A",
        },
      ]),
  }),
) as jest.Mock;

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("InvestorsTable", () => {
  test("renders table with investors data", async () => {
    render(<InvestorsTable />);

    expect(screen.getByText("FirmID")).toBeInTheDocument();
    expect(screen.getByText("FirmName")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("DateAdded")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Firm A")).toBeInTheDocument();
    });
  });

  test("navigates to investor details on row click", async () => {
    render(<InvestorsTable />);

    await waitFor(() => {
      expect(screen.getByText("Firm A")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Firm A").closest("tr")!);

    expect(mockNavigate).toHaveBeenCalledWith("/investors/1234");
  });
});
