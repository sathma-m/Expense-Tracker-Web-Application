import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row align-items-center">

          {/* Brand */}
          <div className="col-lg-5 mb-4 mb-lg-0">
            <Link to="/" className="footer-brand">
              <img
                src="/logo.png"
                alt="Expense Tracker Logo"
                className="footer-logo"
              />

              <div>
                <h5>Expense Tracker</h5>
                <p>
                  Take control of your money and plan
                  for a better tomorrow.
                </p>
              </div>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 mb-4 mb-lg-0">
            <h6>Quick Links</h6>

            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
            </div>
          </div>

          {/* Follow Us */}
          <div className="col-lg-4">
            <h6>Follow Us</h6>

            <div className="social-links">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">◎</a>
              <a href="#" aria-label="LinkedIn">in</a>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 Expense Tracker. All rights reserved.</p>

          <p>
            Plan&nbsp; • &nbsp;Spend&nbsp; • &nbsp;Save&nbsp; • &nbsp;Grow
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;