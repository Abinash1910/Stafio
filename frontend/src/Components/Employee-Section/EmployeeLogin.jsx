import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import Imagelogin from "../../assets/Imagelogin.png";
import "./EmployeeLogin.css";
import BGShape from "../../assets/BGShape.png";
import teampluslogo from "../../assets/stafioimg.png";

const EmployeeLogin = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginUrl = "http://127.0.0.1:5000/employee_login"; // ✅ your backend endpoint

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      // ✅ Extract backend data
      const { user_id, role, username, token } = data;

      if (role && role.toLowerCase() === "employee") {
        // ✅ Store using employee-specific keys
        localStorage.setItem("employee_user_id", user_id);
        localStorage.setItem("employee_role", role);
        localStorage.setItem("employee_username", username || "Employee");

        if (token) localStorage.setItem("employee_token", token);

        console.log("✅ Employee login successful:", data);

        // ✅ Redirect to Employee Dashboard
        navigate("/employee-dashboard");
      } else {
        alert("Access denied: Not an employee account");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setErrorMsg(error.message);
    }
  };

  return (
    <Container fluid className="employee-login-container">
      <Row className="vh-100">
        {/* Left Side Illustration */}
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
                className="teamplus-logo"
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
            className="login-illustration"
          />
        </Col>

        {/* Right Side Login Form */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-left bg-white"
        >
          <div className="login-form-wrapper">
            <h5 className="mb-2">Welcome back! 👋</h5>
            <h3 className="mb-4">Employee Login</h3>

            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

            <Form onSubmit={handleLogin}>
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
              <Link to="/register-employee" className="signup-page">
                Sign up
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeLogin;
