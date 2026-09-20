import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">

      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center min-vh-100">

            {/* Left Side */}
            <div className="col-lg-6">

              <span className="hero-badge">
                SMART FINANCE MANAGEMENT
              </span>

              <h1 className="hero-title">
                Take Control
                <span> Of Your Money</span>
              </h1>

              <p className="hero-text">
                Track your monthly income and expenses,
                understand your spending, and manage your
                money with confidence.
              </p>

              <Link to="/login" className="btn hero-button">
                Get Started →
              </Link>

            </div>

            {/* Right Side - Image */}
            <div className="col-lg-6">

              <div className="home-image-card">
                <img
                  src="/Finance-home.jpg"
                  alt="Finance management"
                  className="home-image"
                />
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;