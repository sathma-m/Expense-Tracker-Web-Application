import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">

        {/* Logo / App Name */}
        <Link className="navbar-brand" to="/">
  <img
    src="/logo.png"
    alt="Expense Tracker Logo"
    className="navbar-logo"
  />
  <span>Expense Tracker</span>
</Link>

        {/* Navigation Links */}
        <div className="d-flex gap-4">
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/login">
            Login
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;