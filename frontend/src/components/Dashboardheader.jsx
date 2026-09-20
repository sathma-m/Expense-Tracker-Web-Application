import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DashboardHeader() {
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("expenseTrackerUser")
  );

  const userName = user?.name || "User";

  return (
    <div className="dashboard-topbar">
      <div className="dashboard-logo">
        <img
          src="/logo.png"
          alt="Expense Tracker Logo"
        />

        <span>Expense Tracker</span>
      </div>

      <div className="profile-section">
        <div
          className="profile"
          onClick={() =>
            setShowProfileMenu(!showProfileMenu)
          }
        >
          <div className="profile-avatar">
            {userName.charAt(0).toUpperCase()}
          </div>

          <div className="profile-info">
            <strong>{userName}</strong>
            <span>Personal Account</span>
          </div>

          <span className="profile-arrow">▼</span>

          {showProfileMenu && (
            <div className="profile-menu">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/profile");
                }}
              >
                👤 Profile
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/login");
                }}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;