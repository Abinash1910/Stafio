import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./AdminRegister.css";

// Reuse same assets as login
import BGShape from "../../assets/BGShape.png";
import teampluslogo from "../../assets/stafioimg.png";
import Registerlogo from "../../assets/registerlogo.png";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    role: "admin",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await axios.post("https://stafio-1.onrender.com/register", formData);
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container fluid className="admin-register-container">
      <Row className="vh-100">
        {/* ===== LEFT SIDE ===== */}
        <Col
          md={6}
          className="register-left d-flex flex-column align-items-center justify-content-center"
        >
          <img src={BGShape} alt="Background Shape" className="bg-shape" />

          <div className="register-left-content text-center">
            <div className="register-logos mb-3">
              <img
                src={teampluslogo}
                alt="Team Plus Logo"
                className="teamplus-logo"
              />
          </div>

            <h2 className="register-heading">One Portal,</h2>
            <h4 className="register-subheading">Unlimited Potential</h4>

            <p className="register-description">
              Create your account — It only takes a minute!
            </p>
          </div>

          <img
            src={Registerlogo}
            alt="Register Illustration"
            className="register-illustration"
          />
        </Col>

        {/* ===== RIGHT SIDE ===== */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-left bg-white"
        >
          <div className="register-form-wrapper">
            <h5 className="mb-2">Just a Few Details to Begin</h5>
            <h3 className="mb-4">Admin Sign Up</h3>

            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  placeholder="Enter first name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  placeholder="Enter last name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="register-btn">
                Sign Up
              </Button>

              <div className="text-center mt-3">
                <small>
                  Already have an account?{" "}
                  <Link to="/" className="login-link">
                    Log in
                  </Link>
                </small>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminRegister;
