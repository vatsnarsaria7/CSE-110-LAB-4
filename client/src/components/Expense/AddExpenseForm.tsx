import React, { useState, useContext } from "react";
import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../../context/AppContext";
import { createExpense } from "../../utils/expense-utils";
const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here

  // const context = useContext(AppContext);
  const { expenses, setExpenses } = useContext(AppContext);

  // Exercise: Create name and cost to state variables
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const maxId =
      expenses.length > 0 ? Math.max(...expenses.map((e) => Number(e.id))) : 0;
    const newId = (maxId + 1).toString();

    const newExpense = {
      id: newId.toString(), // Increment the counter and convert to string
      description: name,
      cost: cost,
    };

    createExpense(newExpense);

    // Add new expense to expenses context array
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

    setName("");
    setCost(0);
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter expense name"
            value={name}
            // HINT: onChange={}
            onChange={(event) => setName(event.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            placeholder="Enter expense cost"
            value={cost}
            // HINT: onChange={}
            onChange={(event) => setCost(Number(event.target.value))}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
