//Function to get budget from backend. Method: GET

export const fetchBudget = async (): Promise<number> => {
  const response = await fetch("/budget");
  if (!response.ok) {
    throw new Error("Failed to fetch budget");
  }

  const data = await response.json();
  return data.budget;
};

export const updateBudget = async (budget: number): Promise<number> => {
  const response = await fetch("/budget", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: budget }),
  });

  if (!response.ok) {
    throw new Error("Failed to update budget");
  }

  const data = await response.json();
  return data.data;
};
