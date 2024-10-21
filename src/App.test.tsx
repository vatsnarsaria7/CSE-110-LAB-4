import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("Expenses", () => {
  test("Create an Expense:", () => {
    render(<App />);
    const budgetInput = screen.getByPlaceholderText("Enter Budget");
    const budgetButton = screen.getByText("Set Budget");
    fireEvent.change(budgetInput, { target: { value: 100000 } });

    const expenseName = screen.getByPlaceholderText("Enter expense name");
    const expenseCost = screen.getByPlaceholderText("Enter expense cost");
    const addExpenseButton = screen.getByText("Save");

    fireEvent.change(expenseName, { target: { value: "Private Jet Fuel" } });
    fireEvent.change(expenseCost, { target: { value: 50000 } });
    fireEvent.click(addExpenseButton);

    const expRemaining = "Remaining: $50000";
    const expSpent = "Spent so far: $50000";

    expect(screen.queryByText("Private Jet Fuel")).toBeInTheDocument;
    expect(screen.queryByText("Remaining: $50000")).toBeInTheDocument;
    expect(screen.queryByText("Spent so far: $50000")).toBeInTheDocument;
  });

  test("Delete an Expense:", () => {
    render(<App />);
    //Create an expense
    const budgetInput = screen.getByPlaceholderText("Enter Budget");
    const budgetButton = screen.getByText("Set Budget");
    fireEvent.change(budgetInput, { target: { value: 100000 } });

    const expenseName = screen.getByPlaceholderText("Enter expense name");
    const expenseCost = screen.getByPlaceholderText("Enter expense cost");
    const addExpenseButton = screen.getByText("Save");

    fireEvent.change(expenseName, { target: { value: "Private Jet Fuel" } });
    fireEvent.change(expenseCost, { target: { value: 50000 } });
    fireEvent.click(addExpenseButton);

    const expRemaining = "Remaining: $50000";
    const expSpent = "Spent so far: $50000";

    //Verify expense was created
    expect(screen.queryByText("Private Jet Fuel")).toBeInTheDocument;
    expect(screen.queryByText("Remaining: $50000")).toBeInTheDocument;
    expect(screen.queryByText("Spent so far: $50000")).toBeInTheDocument;

    //Delete Expense
    const deleteButton = screen.getByTestId("deleteButton");
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Private Jet Fuel")).not.toBeInTheDocument;
    expect(screen.queryByText("Remaining: $100000")).toBeInTheDocument;
    expect(screen.queryByText("Spent so far: $100000")).toBeInTheDocument;
  });

  test("Budget Balance Verification", () => {
    render(<App />);
    const budgetInput = screen.getByPlaceholderText("Enter Budget");
    const budgetButton = screen.getByText("Set Budget");
    fireEvent.change(budgetInput, { target: { value: 5000 } });

    const expenseName = screen.getByPlaceholderText("Enter expense name");
    const expenseCost = screen.getByPlaceholderText("Enter expense cost");
    const addExpenseButton = screen.getByText("Save");

    fireEvent.change(expenseName, { target: { value: "Car Wash" } });
    fireEvent.change(expenseCost, { target: { value: 200 } });
    fireEvent.click(addExpenseButton);

    fireEvent.change(expenseName, { target: { value: "Groceries" } });
    fireEvent.change(expenseCost, { target: { value: 300 } });
    fireEvent.click(addExpenseButton);

    fireEvent.change(expenseName, { target: { value: "Dinner Date" } });
    fireEvent.change(expenseCost, { target: { value: 200 } });
    fireEvent.click(addExpenseButton);

    const expRemaining = "Remaining: $4300";
    const expSpent = "Spent so far: $700";

    expect(screen.queryByText("Remaining: $4300")).toBeInTheDocument;
    expect(screen.queryByText("Spent so far: $700")).toBeInTheDocument;

    const deleteButtons = screen.getAllByTestId("deleteButton");

    fireEvent.click(deleteButtons[1]);
    expect(screen.queryByText("Remaining: $4600")).toBeInTheDocument;
    expect(screen.queryByText("Spent so far: $400")).toBeInTheDocument;
  });
});
