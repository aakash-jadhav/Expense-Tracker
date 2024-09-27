import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//layouts
import Main, { mainLoader } from "./layout/Main";
import Error from "./pages/Error";
//Action
import { logoutAction } from "./actions/logout";
import ExpensesPage, {
  expensesAction,
  expensesLoader,
} from "./pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";
import deleteBudget from "./actions/deleteBudget";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      loader: mainLoader,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
          loader: dashboardLoader,
          errorElement: <Error />,
          action: dashboardAction,
        },
        {
          path: "budget/:id",
          element: <BudgetPage />,
          loader: budgetLoader,
          errorElement: <Error />,
          action: budgetAction,
          children: [
            {
              path: "delete",
              action: deleteBudget,
            },
          ],
        },
        {
          path: "/expenses",
          element: <ExpensesPage />,
          loader: expensesLoader,
          action: expensesAction,
          errorElement: <Error />,
        },
        {
          path: "logout",
          action: logoutAction,
        },
      ],
    },
  ]);
  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
