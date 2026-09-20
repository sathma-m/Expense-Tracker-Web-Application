import { Link } from 'react-router-dom';

function ForgotPassword() {
  return (
    <div className="auth-page">
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
          <h1>Forgot Password?</h1>
          <p>
            Enter your email and we'll help you reset your password.
          </p>
        </div>

        {/* Form */}
        <form>

          <div className="auth-input-group">
            <label htmlFor="email">Email Address</label>

            <input
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <button type="submit" className="auth-button">
            Send Reset Link →
          </button>

        </form>

        {/* Back to Login */}
        <p className="register-text">
          Remember your password?{' '}
          <Link to="/login">Back to Login</Link>
        </p>

      </div>
    </div>
  );
}

export default ForgotPassword;