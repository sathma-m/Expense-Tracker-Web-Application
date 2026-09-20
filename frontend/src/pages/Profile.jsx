import { Link } from "react-router-dom";
import DashboardHeader from "../components/Dashboardheader";

function Profile() {
  const user = JSON.parse(
    localStorage.getItem("expenseTrackerUser")
  );

  const userName = user?.name || "User";
  const userEmail = user?.email || "No email available";

  return (
    <div className="dashboard-page">
      <DashboardHeader />
    <div className="profile-page">
      <div className="profile-container">

        <div className="profile-card">

          <div className="profile-avatar-large">
            {userName.charAt(0).toUpperCase()}
          </div>

          <h1>{userName}</h1>
          <p>{userEmail}</p>

          <div className="profile-details">

            <div className="profile-detail">
              <span>Full Name</span>
              <strong>{userName}</strong>
            </div>

            <div className="profile-detail">
              <span>Email Address</span>
              <strong>{userEmail}</strong>
            </div>

          </div>

          <Link
            to="/dashboard"
            className="back-dashboard-button"
          >
            ← Back to Dashboard
          </Link>

        </div>

      </div>
    </div>
    </div>
  );
}

export default Profile;