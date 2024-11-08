import React from "react";
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";

//loader
export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];
  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    toast.error("The budget you are trying to view does not exist");
    throw new Error("Budget not found");
  }
  return { budget, expenses };
}
//action
export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.error("Expense deleted!");
    } catch (error) {
      toast.error("There was problem deleting your expense", error.message);
      throw new Error("There was problem deleting your expense", error.message);
    }
  }
  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created`);
    } catch (error) {
      console.error(error);
      throw new Error("There was problem creating your expense", error.message);
    }
  }
}
//component
export default function BudgetPage() {
  const { budget, expenses } = useLoaderData();
  return (
    <div className="grid-lg" style={{ "--accent": budget.color }}>
      <h1 className="h2">
        <span className="accent">{budget.name}</span>
        Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses?.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name} </span>Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
}
