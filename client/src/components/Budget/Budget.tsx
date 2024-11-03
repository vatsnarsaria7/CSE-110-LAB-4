import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { updateBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState(budget);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Update the budget on the backend and await its completion
      await updateBudget(amount);
      // Update the budget in the context
      setBudget(amount);
      console.log("Budget successfully updated to:", amount);
      setError(null); // Clear any previous errors
    } catch (err) {
      // Handle errors gracefully
      console.error("Failed to update budget:", err);
      setError("Failed to update budget. Please try again.");
    }
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <form onSubmit={onSubmit} className="d-flex flex-column gap-2">
        <div className="form-group mb-2">
          <input
            type="number"
            className="form-control"
            id="budget"
            value={amount}
            placeholder="Enter Budget"
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <button type="submit" className="btn btn-primary mt-2">
            Set Budget
          </button>

          <div className="mt-2">Current Budget: {budget}</div>
        </div>
      </form>
    </div>
  );
};

export default Budget;
