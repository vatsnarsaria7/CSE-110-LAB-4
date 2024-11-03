import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);

  const [amount, setAmount] = useState(budget);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBudget(amount);
    console.log(amount);
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
