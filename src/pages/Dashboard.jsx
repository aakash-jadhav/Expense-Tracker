import { Link, useLoaderData } from "react-router-dom";
import Intro from "../components/Intro";
//helper function
import { createBudget, createExpense, deleteItem, fetchData } from "../helpers";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

//loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

//action
export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${formData.userName}!`);
    } catch (error) {
      throw new Error("There was a problem creating your account.");
    }
  }
  if (_action === "createBudget") {
    try {
      //create budget
      createBudget({ name: values.newBudget, amount: values.newBudgetAmount });
      return toast.success("Budget created!");
    } catch (error) {
      throw new Error("There was a problem creating your budget.");
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

export default function Dashboard() {
  const { userName, budgets, expenses } = useLoaderData();

  const tableElement = expenses && expenses.length > 0 && (
    <div className="grid-md">
      <h2>Recent Expenses</h2>
      <Table
        expenses={expenses
          .sort((a, b) => b.createdAt - a.createdAt)
          .slice(0, 8)}
      />
      {expenses.length > 8 && (
        <Link to="expenses" className="btn btn--dark">
          View all expenses
        </Link>
      )}
    </div>
  );
  const existingBudget = (
    <div className="grid-lg">
      <div className="flex-lg">
        <AddBudgetForm />
        <AddExpenseForm budgets={budgets || []} />
      </div>
      <h2>Existing Budgets</h2>
      <div className="budgets">
        {budgets?.map((budget) => (
          <BudgetItem key={budget.id} budget={budget} />
        ))}
      </div>
      {tableElement}
    </div>
  );
  const newBudget = (
    <div className="grid-sm">
      <p>Personal budgetting is the secret to financial freedom</p>
      <p>Create a budget to get Started!</p>
      <AddBudgetForm />
    </div>
  );

  const isLoggedIn = (
    <div className="dashboard">
      <h1>
        Welcome back, <span className="accent">{userName}</span>
      </h1>
      <div className="grid-sm">
        {budgets && budgets.length > 0 ? existingBudget : newBudget}
      </div>
    </div>
  );
  return <>{userName ? isLoggedIn : <Intro />}</>;
}
