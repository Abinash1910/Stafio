// AdminLogin.jsx
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./AdminLogin.css";

// Reuse same assets as Employee login
import BGShape from "../../assets/BGShape.png";
import teampluslogo from "../../assets/stafioimg.png";
import Imagelogin from "../../assets/Imagelogin.png";

const AdminLogin = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
  e.preventDefault();
  setError("");

  // ❌ DO NOT clear localStorage here; we want to keep other role's data intact
  // localStorage.clear();

  try {
    const response = await fetch("http://127.0.0.1:5000/admin_login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // store admin-specific keys (role-prefixed)
      localStorage.setItem("admin_user_id", data.user_id);
      localStorage.setItem("admin_role", data.role);
      localStorage.setItem("admin_username", data.username);

      // optional: set local state if you use it elsewhere immediately
      // setUsername(data.username);

      navigate("/admin-dashboard");
    } else {
      setError(data.message || "Login failed");
    }
  } catch (err) {
    setError("Network error. Please check if backend is running.");
  }
};


  return (
    <Container fluid className="admin-login-container">
      <Row className="vh-100">
        {/* LEFT SIDE - Same as Employee Login */}
        <Col
          md={6}
          className="login-left d-flex flex-column align-items-center justify-content-center"
        >
          <img src={BGShape} alt="Background Shape" className="bg-shape" />

          <div className="login-left-content text-center">
            <div className="login-logos mb-3">
              <img
                src={teampluslogo}
                alt="Team Plus Logo"
                className="teampluss-logo"
              />
            </div>

            <h2 className="login-heading">One Portal,</h2>
            <h4 className="login-subheading">Unlimited Potential</h4>

            <p className="login-description">
              Welcome to workspace Hub – Where people & productivity meet.
            </p>
          </div>

          <img
            src={Imagelogin}
            alt="Login Illustration"
            className="login-illustrations"
          />
        </Col>

        {/* RIGHT SIDE - Same Layout as Employee Login */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-left bg-white"
        >
          <div className="login-form-wrapper">
            <h5 className="mb-2">Welcome back! 👋</h5>
            <h3 className="mb-4">HR Login</h3>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleAdminLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email / Username</Form.Label>
                <Form.Control
                  type="text"
                  className="email-input"
                  placeholder="Enter email or username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  className="email-input"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="login-btn">
                Login
              </Button>
            </Form>

            <div className="signup-text text-center mt-4">
              <span>New to Team Pulse? </span>
              <Link to="/register-admin" className="signup-page">
                Register as Admin
              </Link>
            </div>

            <div className="text-center mt-3">
              <Link to="/employee-login">Login as Employee</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLogin;
