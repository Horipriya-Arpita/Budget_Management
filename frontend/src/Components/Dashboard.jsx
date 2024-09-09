import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
//import axios from 'axios';

const Dashboard = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [budgets, setBudgets] = useState({ budget: 0, actual: 0 });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    // axios.get('/api/total-expenses').then(response => setTotalExpenses(response.data.total));
    // axios.get('/api/budgets').then(response => setBudgets(response.data));
    // axios.get('/api/recent-transactions').then(response => setTransactions(response.data));
  }, []);

  return (
    <Container fluid className="mt-5">
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Expenses for the Month</Card.Title>
              <Card.Text>${totalExpenses}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Budgets vs. Actual Spending</Card.Title>
              <Card.Text>Budget: ${budgets.budget} | Actual: ${budgets.actual}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Recent Transactions</Card.Title>
              <ul>
                {transactions.map((transaction, index) => (
                  <li key={index}>{transaction.description}: ${transaction.amount}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card className="mb-4">
            <Card.Body className="d-flex justify-content-around">
              <Button variant="primary" href="/expense-tracker">Expense Tracker</Button>
              <Button variant="primary" href="/budget-setting">Budget Setting</Button>
              <Button variant="primary" href="/reports">Reports</Button>
              <Button variant="primary" href="/profile">Profile</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
