import { Expense } from "../../types/types";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const ExpenseItem = (currentExpense: Expense) => {
  // Exercise: Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext);

  const handleDeleteExpense = (currentExpense: Expense) => {
    // Exercise: Remove expense from expenses context array
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== currentExpense.id)
    );
  };
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.name}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button
          data-testid="deleteButton"
          onClick={() => handleDeleteExpense(currentExpense)}
        >
          x
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
