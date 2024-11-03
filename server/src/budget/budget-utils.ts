import { Request, Response } from "express";

// Function to get the budget
export function getBudget(res: Response, budget: number) {
  res.status(200).send({ data: budget });
}

// Function to update the budget
export function updateBudget(
  req: Request,
  res: Response,
  budget: { amount: number }
) {
  const newBudget = req.body.amount; // Access `amount` directly from `req.body`

  // Validate the new budget amount
  if (typeof newBudget !== "number" || newBudget < 0) {
    return res.status(400).send({ error: "Invalid budget amount" });
  }

  // Update the budget
  budget.amount = newBudget;
  console.log("Updated budget:", budget.amount); // Debugging log to confirm update

  // Send the updated budget in the response
  res.status(200).send({ data: budget.amount });
}
