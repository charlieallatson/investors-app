import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InvestorDetail from "./InvestorDetail";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: "456",
          amount: "50m",
          currency: "GPB",
        },
      ]),
  }),
) as jest.Mock;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "1234" }),
}));

describe("InvestorDetail", () => {
  test("renders details for investor", async () => {
    render(<InvestorDetail />);

    expect(screen.getByText("Investor 1234")).toBeInTheDocument();

    const selectElement = screen.getByText("Private Equity");
    expect(selectElement).toBeInTheDocument();

    fireEvent.change(selectElement, { target: { value: "re" } });

    await waitFor(() => {
      expect(screen.getByText("Real Estate")).toBeInTheDocument();
      expect(screen.getByText("456")).toBeInTheDocument();
      expect(screen.getByText("50m")).toBeInTheDocument();
      expect(screen.getByText("GPB")).toBeInTheDocument();
    });
  });

  test("changes asset class and fetches new data", async () => {
    render(<InvestorDetail />);

    const selectElement = document.getElementById("assetClass");
    if (selectElement) {
      fireEvent.change(selectElement, { target: { value: "pd" } });
    } else {
      throw "Can't find element";
    }

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:8000/api/investor/commitment/pd/1234",
      );
    });
  });
});
