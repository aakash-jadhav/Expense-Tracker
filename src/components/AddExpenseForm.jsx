import { PlusCircleIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef } from "react";
import { useFetcher, Form } from "react-router-dom";

/**
 * Renders a form for adding a new expense to a budget.
 *
 * @param {Object} props - The component props.
 * @param {Array<{ id: string, name: string, createdAt: number }>} props.budgets - An array of budget objects, each with an id, name, and createdAt timestamp.
 * @returns {JSX.Element} - The rendered expense form.
 */
export default function AddExpenseForm({ budgets }) {
  const fetcher = useFetcher();
  const formRef = useRef();
  const focusRef = useRef();
  const isSubmitting = fetcher.state === "submitting";

  const buttonText = (
    <>
      <span>Add Expense</span>
      <PlusCircleIcon width={20} />
    </>
  );
  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add New{" "}
        <span className="accent">
          {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
        </span>{" "}
        Expense
      </h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g. Coffee"
              ref={focusRef}
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount Name</label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g. 350"
              required
            />
          </div>
        </div>
        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="newExpenseBudget">Budget Category</label>
          <select name="newExpenseBudget" id="newExpenseBudget" required>
            {budgets
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((budget) => {
                return (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                );
              })}
          </select>
        </div>
        <input type="hidden" name="_action" value="createExpense" />
        <button className="btn btn--dark" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <span>Submitting...</span> : buttonText}
        </button>
      </fetcher.Form>
    </div>
  );
}
