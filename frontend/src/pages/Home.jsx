import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-hero">
        <h1 className="home-title">WaveNet Invoice System</h1>
        <p className="home-subtitle">
          Professional Invoice and User Management Platform
        </p>
        <p className="home-description">
          Streamline your invoicing and user management with our modern, 
          easy-to-use platform built for efficiency.
        </p>
      </div>

      <div className="home-cards">
        <Link to="/users" className="home-card">
          <div className="card-icon">👥</div>
          <h3>User Management</h3>
          <p>Create, search, update, and manage user roles efficiently</p>
        </Link>

        <Link to="/invoices" className="home-card">
          <div className="card-icon">📄</div>
          <h3>Invoice Management</h3>
          <p>Create, search, and manage your invoices with ease</p>
        </Link>
      </div>

      <div className="home-footer">
        <p>
          Ready to get started? <Link to="/login" className="footer-link">Login</Link> or <Link to="/register" className="footer-link">Register</Link> now.
        </p>
      </div>
    </div>
  );
}

export default Home;
