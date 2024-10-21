import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);

  const [amount, setAmount] = useState(0);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBudget(amount);
    console.log(amount);
  };
  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            id="budget"
            value={amount}
            placeholder="Enter Budget"
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <button type="submit">Set Budget</button>
        </div>

        <div>Current Budget: {budget}</div>
      </form>
    </div>
  );
};

export default Budget;
