import { Expense } from "../types";
import { Database } from "sqlite";
import e, { Request, Response } from "express";
import exp from "constants";

export async function createExpenseServer(req: Request, res: Response, db: Database) {

  try {
      // Type casting the request body to the expected format.
      const { id, cost, description } = req.body as { id: string, cost: number, description: string };

      if (!description || !id || !cost) {
          return res.status(400).send({ error: "Missing required fields" });
      }

      await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
      res.status(201).send({ id, description, cost });

  } catch (error) {

      return res.status(400).send({ error: `Expense could not be created, + ${error}` });
  };

}

export async function deleteExpense(
  req: Request,
  res: Response,
  db:Database
) {
  // TO DO: Implement deleteExpense function

  const id = req.params.id;
  
  try{
    const expense_id = db.get("SELECT * from expenses WHERE id = ?", id)

    if(!expense_id){
      return res.status(404).send({error: `Could not find the ID you are looking for.`});
    }
    //Delete the expense
    await db.run("DELETE FROM expenses WHERE id =?", id);
    
    res.status(200).send({ message: "Expense deleted"});

  } catch(error){
    return res.status(500).send({error: `Could not delete expense, +${error}`});
  }

}

export async function getExpenses(req: Request, res: Response, db: Database) {
  try{
    //Get All expenses from db
    const expenses = await db.all("SELECT * from EXPENSES;");
    // Send expenses as the response
    res.status(200).send({ data: expenses });

  } catch (error) {
    res.status(500).send({ error: `Could not get expenses, + ${error}` });
  }
}
