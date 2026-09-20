import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/Dashboardheader";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("expenseTrackerUser"));
const [notification, setNotification] = useState("");
const userName = user?.name || "User";
const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(() => {
  return localStorage.getItem("expenseTrackerSelectedMonth") || "September";
});
useEffect(() => {
  localStorage.setItem("expenseTrackerSelectedMonth", selectedMonth);
}, [selectedMonth]);
  
  const [monthlyData, setMonthlyData] = useState(() => {
  const savedData = localStorage.getItem("expenseTrackerMonthlyData");

  if (savedData) {
    return JSON.parse(savedData);
  }

  const oldIncome = localStorage.getItem("expenseTrackerIncome");
  const oldExpenses = localStorage.getItem("expenseTrackerExpenses");

  return {
    September: {
      income: oldIncome ? Number(oldIncome) : 50000,
      expenses: oldExpenses ? JSON.parse(oldExpenses) : [],
    },
  };
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






  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
const [incomeInput, setIncomeInput] = useState("");
  const [expenseForm, setExpenseForm] = useState({
  name: "",
  amount: "",
  description: "",
  category: "",
});

  


  

  // Calculate total expenses
  const totalExpenses = currentMonthData.expenses.reduce(
  (total, expense) => total + expense.amount,
  0
);

  // Calculate remaining balance
  const balance = currentMonthData.income - totalExpenses;
  const categoryTotals = currentMonthData.expenses.reduce(
  (totals, expense) => {
    const category = expense.category;

    if (!totals[category]) {
      totals[category] = 0;
    }

    totals[category] += expense.amount;

    return totals;
  },
  {}
);
const categoryPercentages = Object.entries(categoryTotals).map(
  ([category, amount]) => ({
    category,
    amount,
    percentage:
      totalExpenses > 0
        ? ((amount / totalExpenses) * 100).toFixed(1)
        : 0,
  })
);
const chartColors = [
  "#60a5fa", // Soft blue
  "#34d399", // Soft emerald
  "#a78bfa", // Soft purple
  "#22d3ee", // Cyan
  "#818cf8", // Indigo
  "#2dd4bf", // Teal
  "#c084fc", // Light purple
  "#38bdf8", // Sky blue
];

let currentPercentage = 0;

const chartGradient =
  categoryPercentages.length > 0
    ? `conic-gradient(
        ${categoryPercentages
          .map((item, index) => {
            const start = currentPercentage;
            const end = start + Number(item.percentage);

            currentPercentage = end;

            return `${chartColors[index % chartColors.length]} ${start}% ${end}%`;
          })
          .join(", ")}
      )`
    : "#163866";

  // Delete expense
  const handleDelete = (id) => {
  setExpenseToDelete(id);
};

const confirmDeleteExpense = () => {
  setMonthlyData({
    ...monthlyData,
    [selectedMonth]: {
      ...monthlyData[selectedMonth],
      income: monthlyData[selectedMonth]?.income || 0,
      expenses: (monthlyData[selectedMonth]?.expenses || []).filter(
        (expense) => expense.id !== expenseToDelete
      ),
    },
  });

  setExpenseToDelete(null);

  showNotification("Expense deleted successfully");
};

  

  // Edit expense
  const handleEdit = (id) => {
  const expense = currentMonthData.expenses.find(
  (expense) => expense.id === id
);

  setEditingExpense(expense);

  setExpenseForm({
    name: expense.name,
    amount: expense.amount,
    description: expense.description,
    category: expense.category,
  });

  setShowExpenseForm(true);
};
 // Handle expense form changes
const handleExpenseChange = (e) => {
  const { name, value } = e.target;

  setExpenseForm({
    ...expenseForm,
    [name]: value,
  });
};

// Add new expense
const handleAddExpense = () => {
  if (
    !expenseForm.name ||
    !expenseForm.amount ||
    !expenseForm.description ||
    !expenseForm.category
  ) {
    showNotification("Please fill in all expense fields.");
return;
  }

if (editingExpense) {
  setMonthlyData({
    ...monthlyData,
    [selectedMonth]: {
      ...monthlyData[selectedMonth],
      income: monthlyData[selectedMonth]?.income || 0,
      expenses: (monthlyData[selectedMonth]?.expenses || []).map(
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
      ),
    },
  });
}
    else {
    // Add new expense
    const newExpense = {
      id: Date.now(),
      name: expenseForm.name,
      amount: Number(expenseForm.amount),
      description: expenseForm.description,
      category: expenseForm.category,
    };

    setMonthlyData({
  ...monthlyData,
  [selectedMonth]: {
    ...monthlyData[selectedMonth],
    income: monthlyData[selectedMonth]?.income || 0,
    expenses: [
      ...(monthlyData[selectedMonth]?.expenses || []),
      newExpense,
    ],
  },
});
  }

  // Clear form
  setExpenseForm({
    name: "",
    amount: "",
    description: "",
    category: "",
  });

  // Exit edit mode
setEditingExpense(null);

// Close form
setShowExpenseForm(false);

// Show success notification
showNotification(
  editingExpense
    ? "Expense updated successfully"
    : "Expense added successfully"
);
};

const showNotification = (message) => {
  setNotification(message);

  setTimeout(() => {
    setNotification("");
  }, 2500);
};  

  return (
    <div className="dashboard-page">
      {notification && (
  <div className="app-notification">
    ✓ {notification}
  </div>
)}
{expenseToDelete && (
  <div className="delete-modal-overlay">
    <div className="delete-modal">
      <div className="delete-modal-icon">!</div>

      <h3>Delete Expense?</h3>

      <p>
        Are you sure you want to delete this expense?
        This action cannot be undone.
      </p>

      <div className="delete-modal-actions">
        <button
          className="delete-modal-cancel"
          onClick={() => setExpenseToDelete(null)}
        >
          Cancel
        </button>

        <button
          className="delete-modal-confirm"
          onClick={confirmDeleteExpense}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}


      {/* ================= TOP BAR ================= */}

<DashboardHeader />


      {/* ================= MAIN CONTENT ================= */}

      <main className="dashboard-content">

        {/* ================= WELCOME ================= */}

        <div className="welcome-section">

          <div>

            <p className="greeting">
              Welcome Back,
            </p>

            <h1>
              {userName}<span>👋</span>
            </h1>

            <p className="welcome-text">
              Here's your financial summary for this month.
            </p>

          </div>


          {/* MONTH SELECT */}

          <div className="month-box">

            <label>
              Select Month
            </label>

            <select
              value={selectedMonth}
              onChange={(e) =>
                setSelectedMonth(e.target.value)
              }
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


        {/* ================= SUMMARY CARDS ================= */}

        <div className="summary-grid">

          {/* BALANCE */}

          <div className="balance-dashboard-card">

            <div className="card-heading">

              <span>
                Total Balance
              </span>

              <div className="card-icon">
                💳
              </div>

            </div>

            <h2>
              Rs. {balance.toLocaleString()}
            </h2>

            <div className="balance-change">
              ↗ &nbsp; Your remaining balance
            </div>

          </div>

          


          {/* INCOME */}

          <div className="small-summary-card income-card">

            <div className="small-card-icon">
              ↗
            </div>

            <div>

              <span>
                Total Income
              </span>

              <h3>
               Rs. {currentMonthData.income.toLocaleString()}
              </h3>

            </div>

          </div>


          {/* EXPENSE */}

          <div className="small-summary-card expense-card">

            <div className="small-card-icon">
              ↘
            </div>

            <div>

              <span>
                Total Expenses
              </span>

              <h3>
                Rs. {totalExpenses.toLocaleString()}
              </h3>

            </div>

          </div>

        </div>


        {/* ================= MAIN DASHBOARD ================= */}

        <div className="dashboard-grid">


          {/* ================= EXPENSE BREAKDOWN ================= */}

          <div className="dashboard-card">

            <div className="dashboard-card-header">

              <div>

                <h2>
                  Expense Breakdown
                </h2>

                <p>
                  Where your money is going
                </p>

              </div>

            </div>


            <div className="expense-breakdown">

              <div
  className="expense-circle"
  style={{ background: chartGradient }}
>

                <div>

                  <strong>
                    Rs. {totalExpenses.toLocaleString()}
                  </strong>

                  <span>
                    Total
                  </span>

                </div>

              </div>


             <div className="category-list">
  {categoryPercentages.length === 0 ? (
    <p className="no-category-data">
      No expenses for {selectedMonth}.
    </p>
  ) : (
    categoryPercentages.map((item, index) => (
  <div key={item.category}>
    <span>
      <span
        className="category-dot"
        style={{
          backgroundColor:
            chartColors[index % chartColors.length],
        }}
      ></span>

      {item.category}
    </span>

    <strong>{item.percentage}%</strong>
  </div>
))
  )}
</div>

            </div>

          </div>


          {/* ================= EXPENSES ================= */}

          <div className="dashboard-card expenses-card">

            <div className="dashboard-card-header">

              <div>

                <h2>
                  Expenses
                </h2>

                <p>
                  Your expenses for {selectedMonth}.
                </p>

              </div>

              <button
  className="add-expense-button"
  onClick={() => setShowExpenseForm(true)}
>
  + Add Expense
</button>

            </div>
 {showExpenseForm && (
  <div className="expense-form">

    <h3>
  {editingExpense ? "Edit Expense" : "Add New Expense"}
</h3>

    <input
      type="text"
      name="name"
      placeholder="Expense name"
      value={expenseForm.name}
      onChange={handleExpenseChange}
    />

    <input
      type="number"
      name="amount"
      placeholder="Amount"
      value={expenseForm.amount}
      onChange={handleExpenseChange}
    />

    <input
      type="text"
      name="description"
      placeholder="Description"
      value={expenseForm.description}
      onChange={handleExpenseChange}
    />

    <select
      name="category"
      value={expenseForm.category}
      onChange={handleExpenseChange}
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
  onClick={() => {
    setShowExpenseForm(false);
    setEditingExpense(null);

    setExpenseForm({
      name: "",
      amount: "",
      description: "",
      category: "",
    });
  }}
>
  Cancel
</button>

      <button
  type="button"
  onClick={handleAddExpense}
>
  {editingExpense ? "Save Changes" : "Add Expense"}
</button>

    </div>

  </div>
)}



            {/* EXPENSE LIST */}

            <div className="expense-list">

              {currentMonthData.expenses.slice(-3).reverse().map((expense) => (
                <div
                  className="expense-item"
                  key={expense.id}
                >

                  {/* ICON */}

                  <div className="expense-item-icon">
                    $
                  </div>


                  {/* DETAILS */}

                  <div className="expense-details">

                    <strong>
                      {expense.name}
                    </strong>

                    <span>
                      {expense.description}
                    </span>

                    <small>
                      {expense.category}
                    </small>

                  </div>


                  {/* AMOUNT */}

                  <strong className="expense-item-amount">
                    Rs. {expense.amount.toLocaleString()}
                  </strong>


                  {/* ACTIONS */}

                  <div className="expense-actions">

                    <button
                      onClick={() =>
                        handleEdit(expense.id)
                      }
                      className="edit-button"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(expense.id)
                      }
                      className="delete-button"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>
            {currentMonthData.expenses.length > 3 && (
  <button
    className="view-all-expenses"
    onClick={() => navigate("/expenses")}
  >
    View All Expenses →
  </button>
)}

          </div>
          

        </div>
        
{/* ================= MONTHLY INCOME ================= */}

<div className="dashboard-card income-section">

  <div className="dashboard-card-header">

    <div>
      <h2>Monthly Income</h2>
      <p>Set your income for {selectedMonth}.</p>
    </div>

    <button
  className="add-income-button"
  onClick={() => {
    setIncomeInput(
      currentMonthData.income > 0
        ? currentMonthData.income
        : ""
    );

    setShowIncomeForm(true);
  }}
>
  {currentMonthData.income > 0
    ? "Edit Income"
    : "+ Add Income"}
</button>

  </div>


  {/* INCOME FORM */}

  {showIncomeForm && (
    <div className="income-form">

      <h3>Set Monthly Income</h3>

      <input
        type="number"
        placeholder="Enter income amount"
        value={incomeInput}
        onChange={(e) => setIncomeInput(e.target.value)}
      />

      <div className="income-form-buttons">

        <button
          type="button"
          onClick={() => {
            setShowIncomeForm(false);
            setIncomeInput("");
          }}
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={() => {
            if (!incomeInput || Number(incomeInput) <= 0) {
  showNotification("Please enter a valid income amount.");
  return;
}

            const newIncome = Number(incomeInput);

setMonthlyData({
  ...monthlyData,
  [selectedMonth]: {
    ...monthlyData[selectedMonth],
    income: newIncome,
    expenses: monthlyData[selectedMonth]?.expenses || [],
  },
});

setIncomeInput("");
setShowIncomeForm(false);
showNotification("Monthly income updated successfully");
          }}
        >
          Save Income
        </button>

      </div>

    </div>
  )}


  {/* CURRENT INCOME */}

  <div className="current-income">

    <div>
      <span>Current Monthly Income</span>

      <strong>
        Rs. {currentMonthData.income.toLocaleString()}
      </strong>
    </div>

    <div className="income-icon">
      ↗
    </div>

  </div>

</div>
        {/* ================= QUICK ACTIONS ================= */}

        <div className="dashboard-card quick-actions-card">

          <div className="dashboard-card-header">

            <div>

              <h2>
                Quick Actions
              </h2>

              <p>
                Manage your finances quickly
              </p>

            </div>

          </div>


          <div className="quick-actions">

            <button
  className="quick-action"
  onClick={() => setShowExpenseForm(true)}
>
  <span>＋</span>
  <strong>Add Expense</strong>
</button>

<button
  className="quick-action"
  onClick={() => setShowIncomeForm(true)}
>
  <span>↗</span>
  <strong>Add Income</strong>
</button>

            
          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;