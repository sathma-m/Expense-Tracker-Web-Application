import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [notification, setNotification] = useState({
  message: "",
  type: "",
});
const showNotification = (message, type = "success") => {
  setNotification({
    message,
    type,
  });

  setTimeout(() => {
    setNotification({
      message: "",
      type: "",
    });
  }, 2500);
};

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(
      localStorage.getItem("expenseTrackerUser")
    );

    if (!savedUser) {
      showNotification("No account found. Please create an account first.", "error");
      return;
    }

    if (
      email === savedUser.email &&
      password === savedUser.password
    ) {
      showNotification("Login successful!");

setTimeout(() => {
  navigate("/dashboard");
}, 1000);
    } else {
      showNotification("Invalid email or password.", "error");
    }
  };

  return (
    <div className="auth-page">
      {notification.message && (
  <div
    className={`auth-notification ${notification.type}`}
  >
    {notification.type === "success" ? "✓" : "!"}
    <span>{notification.message}</span>
  </div>
)}
      <div className="auth-card">

        {/* Logo */}
        <div className="auth-logo">
          <img
            src="/logo.png"
            alt="Expense Tracker Logo"
          />
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1>Welcome Back</h1>
          <p>Login to manage your finances</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>

          <div className="auth-input-group">
            <label htmlFor="email">
              Email Address
            </label>

            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="forgot-password">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="auth-button"
          >
            Login →
          </button>

        </form>

        {/* Register */}
        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register">
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;