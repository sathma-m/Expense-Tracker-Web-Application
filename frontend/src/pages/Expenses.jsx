import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/Dashboardheader";

function Expenses() {
  const navigate = useNavigate();

  const [selectedMonth, setSelectedMonth] = useState(() => {
    return (
      localStorage.getItem("expenseTrackerSelectedMonth") || "September"
    );
  });

  const [monthlyData, setMonthlyData] = useState(() => {
  return (
    JSON.parse(localStorage.getItem("expenseTrackerMonthlyData")) || {}
  );
});
const [editingExpense, setEditingExpense] = useState(null);

const [expenseForm, setExpenseForm] = useState({
  name: "",
  amount: "",
  description: "",
  category: "",
});
useEffect(() => {
  localStorage.setItem(
    "expenseTrackerMonthlyData",
    JSON.stringify(monthlyData)
  );
}, [monthlyData]);

  const currentMonthData = monthlyData[selectedMonth] || {
    income: 0,
    expenses: [],
  };
  const handleDelete = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this expense?"
  );

  if (confirmDelete) {
    setMonthlyData({
      ...monthlyData,
      [selectedMonth]: {
        ...currentMonthData,
        expenses: currentMonthData.expenses.filter(
          (expense) => expense.id !== id
        ),
      },
    });
  }
};

const handleEdit = (expense) => {
  setEditingExpense(expense);

  setExpenseForm({
    name: expense.name,
    amount: expense.amount,
    description: expense.description,
    category: expense.category,
  });
};
const handleSaveChanges = () => {
  if (
    !expenseForm.name ||
    !expenseForm.amount ||
    !expenseForm.description ||
    !expenseForm.category
  ) {
    alert("Please fill in all fields.");
    return;
  }

  const updatedExpenses = currentMonthData.expenses.map(
    (expense) =>
      expense.id === editingExpense.id
        ? {
            ...expense,
            name: expenseForm.name,
            amount: Number(expenseForm.amount),
            description: expenseForm.description,
            category: expenseForm.category,
          }
        : expense
  );

  setMonthlyData({
    ...monthlyData,
    [selectedMonth]: {
      ...currentMonthData,
      expenses: updatedExpenses,
    },
  });

  setEditingExpense(null);

  setExpenseForm({
    name: "",
    amount: "",
    description: "",
    category: "",
  });
};
  return (
  <div className="dashboard-page">

    <DashboardHeader />

    <div className="dashboard-content">

        {/* Back Button */}
        <button
          className="back-dashboard-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        {/* Page Header */}
        <div className="expenses-page-header">
          <div>
            <h1>All Expenses</h1>
            <p>View and manage all your expenses.</p>
          </div>

          {/* Month Selector */}
          <div className="month-box">
            <label>Month</label>

            <select
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value);

                localStorage.setItem(
                  "expenseTrackerSelectedMonth",
                  e.target.value
                );
              }}
            >
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
          </div>
        </div>

        {editingExpense && (
  <div className="expense-form all-expenses-edit-form">
    <h3>Edit Expense</h3>

    <input
      type="text"
      placeholder="Expense Name"
      value={expenseForm.name}
      onChange={(e) =>
        setExpenseForm({
          ...expenseForm,
          name: e.target.value,
        })
      }
    />

    <input
      type="number"
      placeholder="Amount"
      value={expenseForm.amount}
      onChange={(e) =>
        setExpenseForm({
          ...expenseForm,
          amount: e.target.value,
        })
      }
    />

    <input
      type="text"
      placeholder="Description"
      value={expenseForm.description}
      onChange={(e) =>
        setExpenseForm({
          ...expenseForm,
          description: e.target.value,
        })
      }
    />

    <select
      value={expenseForm.category}
      onChange={(e) =>
        setExpenseForm({
          ...expenseForm,
          category: e.target.value,
        })
      }
    >
      <option value="">Select Category</option>
      <option value="Food & Dining">Food & Dining</option>
      <option value="Transport">Transport</option>
      <option value="Bills">Bills</option>
      <option value="Shopping">Shopping</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Other">Other</option>
    </select>

    <div className="expense-form-buttons">
      <button
        type="button"
        onClick={() => setEditingExpense(null)}
      >
        Cancel
      </button>

      <button
  type="button"
  onClick={handleSaveChanges}
>
  Save Changes
</button>
    </div>
  </div>
)}

        {/* All Expenses */}
        <div className="all-expenses-card">

          <div className="all-expenses-card-header">
            <div>
              <h2>{selectedMonth} Expenses</h2>

              <p>
                {currentMonthData.expenses.length} expenses recorded
              </p>
            </div>
          </div>

          {currentMonthData.expenses.length === 0 ? (

            <div className="no-expenses">
              <p>No expenses recorded for {selectedMonth}.</p>
            </div>

          ) : (

            <div className="all-expenses-list">

              {currentMonthData.expenses
                .slice()
                .reverse()
                .map((expense) => (

                  <div
                    className="all-expense-item"
                    key={expense.id}
                  >

                    <div className="expense-item-icon">
                      💳
                    </div>

                    <div className="expense-details">
                      <strong>{expense.name}</strong>
                      <span>{expense.category}</span>
                      <small>{expense.description}</small>
                    </div>

   <div className="all-expense-right">
  <div className="all-expense-amount">
    Rs. {expense.amount.toLocaleString()}
  </div>

  <div className="all-expense-actions">
    <button
      className="all-expense-edit"
      onClick={() => handleEdit(expense)}
    >
      Edit
    </button>

    <button
      className="all-expense-delete"
      onClick={() => handleDelete(expense.id)}
    >
      Delete
    </button>
  </div>
</div>



                  </div>

                ))}

            </div>

          )}

        </div>

      </div>
    </div>
  );
}

export default Expenses;