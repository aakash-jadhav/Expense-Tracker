function generateRandomColor() {
  const existingBudgetsLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetsLength * 34} 65% 50%`;
}

//local storage
export function fetchData(key) {
  return JSON.parse(localStorage.getItem(key));
}

/**
 * Creates a new budget item in the application's local storage.
 *
 * @param {Object} param0 - An object containing the budget item details.
 * @param {string} param0.name - The name of the budget item.
 * @param {number} param0.amount - The amount of the budget item.
 * @returns {void} - This function does not return a value, it updates the local storage directly.
 */
export function createBudget({ name, amount }) {
  const newItem = {
    id: crypto.randomUUID(), //creates unique id
    name: name,
    createdAt: Date.now(),
    amount: +amount, //+ converts string to number
    color: generateRandomColor(),
  };
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
}

export function createExpense({ name, amount, budgetId }) {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    amount: amount,
    createdAt: Date.now(),
    budgetId: budgetId,
  };
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
}

//format currency
export function formatCurrency(amount) {
  return amount.toLocaleString(undefined, {
    style: "currency",
    currency: "INR",
  });
}

//total spent by budget
export function calculateSpentByBudget(budgetId) {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) return acc;
    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
}

//format percentage
export function formatPercentage(amt) {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
}

/**
 * Formats an epoch timestamp to a localized date string.
 *
 * @param {number} epoch - The epoch timestamp to format.
 * @returns {string} The formatted date string.
 */
export function formatDateToLocaleString(epoch) {
  return new Date(epoch).toLocaleDateString();
}

//get all items from local storage
export function getAllMatchingItems({ category, key, value }) {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
}

//delete item from local storage
export function deleteItem({ key, id }) {
  const exisitingData = fetchData(key);
  if (id) {
    const newData = exisitingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
}
