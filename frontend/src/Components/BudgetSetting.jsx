import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, ProgressBar } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const BudgetSetting = () => {
  const [monthlyBudget, setMonthlyBudget] = useState('');
  const [categoryBudgets, setCategoryBudgets] = useState({
    Food: '',
    Transport: '',
    Utilities: '',
    Entertainment: '',
    Other: ''
  });
  const [budgetStatus, setBudgetStatus] = useState({
    totalSpent: 0,
    categorySpent: {
      Food: 0,
      Transport: 0,
      Utilities: 0,
      Entertainment: 0,
      Other: 0
    }
  });

  const handleMonthlyBudgetChange = (e) => {
    setMonthlyBudget(e.target.value);
  };

  const handleCategoryBudgetChange = (e) => {
    const { name, value } = e.target;
    setCategoryBudgets({ ...categoryBudgets, [name]: value });
  };

  const saveBudgets = () => {
    // Save budgets logic here
    console.log('Monthly Budget:', monthlyBudget);
    console.log('Category Budgets:', categoryBudgets);
  };

  const pieData = {
    labels: Object.keys(categoryBudgets),
    datasets: [
      {
        label: 'Category Budgets',
        data: Object.values(categoryBudgets).map(value => Number(value)),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }
    ]
  };

  return (
    <Container fluid className="mt-5">
      <Row>
        <Col md={6}>
          <h2>Set Monthly Budget</h2>
          <Form>
            <Form.Group controlId="formMonthlyBudget">
              <Form.Label>Total Monthly Budget</Form.Label>
              <Form.Control 
                type="number" 
                value={monthlyBudget} 
                onChange={handleMonthlyBudgetChange} 
              />
            </Form.Group>
            <Button variant="primary" onClick={saveBudgets}>Save</Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={6}>
          <h2>Set Category-Specific Budgets</h2>
          <Form>
            {Object.keys(categoryBudgets).map((category) => (
              <Form.Group key={category} controlId={`form${category}Budget`}>
                <Form.Label>{category} Budget</Form.Label>
                <Form.Control 
                  type="number" 
                  name={category} 
                  value={categoryBudgets[category]} 
                  onChange={handleCategoryBudgetChange} 
                />
              </Form.Group>
            ))}
            <Button variant="primary" onClick={saveBudgets}>Save</Button>
          </Form>
        </Col>
        <Col md={6}>
          <h2>Budget Distribution</h2>
          <Pie data={pieData} />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={12}>
          <h2>Current Budget Status</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Category</th>
                <th>Budget</th>
                <th>Spent</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(categoryBudgets).map((category) => (
                <tr key={category}>
                  <td>{category}</td>
                  <td>{categoryBudgets[category]}</td>
                  <td>{budgetStatus.categorySpent[category]}</td>
                  <td>
                    <ProgressBar 
                      now={budgetStatus.categorySpent[category] / categoryBudgets[category] * 100} 
                      label={`${(budgetStatus.categorySpent[category] / categoryBudgets[category] * 100).toFixed(2)}%`} 
                    />
                  </td>
                </tr>
              ))}
              <tr>
                <td>Total</td>
                <td>{monthlyBudget}</td>
                <td>{budgetStatus.totalSpent}</td>
                <td>
                  <ProgressBar 
                    now={budgetStatus.totalSpent / monthlyBudget * 100} 
                    label={`${(budgetStatus.totalSpent / monthlyBudget * 100).toFixed(2)}%`} 
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default BudgetSetting;