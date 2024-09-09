import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const loginData = {
      username: username,
      password: password,
    };

    console.log("Login Data:", loginData);

    try {
      const response = await axios.post("http://localhost:5000/api/login", loginData, {withCredentials: true});

      if (response.status === 200) {
        alert("Login successful!");
        console.log("Response from server:", response.data);  // Log server response
      } else {
        alert("Login failed!");
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      alert("Error during login!");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center">
        <Col md={6} className="d-none d-md-block">
          <img src="/path-to-your-image.jpg" alt="Login" className="img-fluid" />
        </Col>
        <Col md={6}>
          <h2>Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
