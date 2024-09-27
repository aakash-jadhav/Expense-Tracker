import React from "react";
import { deleteItem, fetchData } from "../helpers";
import { useLoaderData } from "react-router-dom";
import Table from "../components/Table";
import { toast } from "react-toastify";

export async function expensesLoader() {
  const expenses = await fetchData("expenses");
  return { expenses };
}
export async function expensesAction({ request }) {
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
      console.error(error);
      toast.error("There was problem deleting your expense", error.message);
      throw new Error("There was problem deleting your expense", error.message);
    }
  }
}
export default function ExpensesPage() {
  const { expenses } = useLoaderData();
  return (
    <div className="grid-lg">
      <h2>All Expenses</h2>
      {expenses?.length > 0 ? (
        <div className="grid-md">
          <h3>
            Recent Expenses <small> ({expenses.length} total)</small>
          </h3>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No Expenses to show</p>
      )}
    </div>
  );
}
