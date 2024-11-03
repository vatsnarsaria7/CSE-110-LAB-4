import { getBudget, updateBudget } from "./budget-utils";
import { Request, Response } from "express";

export function createBudgetEndpoints(app: any, budget: { amount: number }) {
  // Get the budget
  app.get("/budget", (req: Request, res: Response) => {
    getBudget(res, budget.amount);
  });

  // Update the budget
  app.put("/budget", (req: Request, res: Response) => {
    updateBudget(req, res, budget); // Pass `req` and `res` to `updateBudget`
  });
}
