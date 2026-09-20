import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
 const [notification, setNotification] = useState({
  message: "",
  type: "",
});

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData({
      ...formData,
      [id]: value,
    });
  };
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

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      showNotification("Please fill in all fields.", "error");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showNotification("Passwords do not match.", "error");
      return;
    }

    if (formData.password.length < 6) {
      showNotification("Password must be at least 6 characters.", "error");
      return;
    }

    // Save user details temporarily
    localStorage.setItem(
      "expenseTrackerUser",
      JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
    );

    showNotification("Account created successfully!");

setTimeout(() => {
  navigate("/dashboard");
}, 1200);
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
          <h1>Create Account</h1>
          <p>Start managing your money today</p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit}>

          <div className="auth-input-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-button">
            Create Account →
          </button>

        </form>

        {/* Login Link */}
        <p className="register-text">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;