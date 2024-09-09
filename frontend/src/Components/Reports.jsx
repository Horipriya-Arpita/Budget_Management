import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Reports = () => {
  const [dateRange, setDateRange] = useState('lastMonth');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const expenses = [
    { date: '2024-06-01', amount: 50, category: 'Food' },
    { date: '2024-06-02', amount: 20, category: 'Transport' },
    { date: '2024-06-03', amount: 30, category: 'Utilities' },
    { date: '2024-06-04', amount: 40, category: 'Entertainment' },
    { date: '2024-06-05', amount: 60, category: 'Food' },
    // Add more sample expenses as needed
  ];

  const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Other'];

  const filterExpenses = () => {
    // Implement filtering logic based on dateRange and selectedCategory
    return expenses;
  };

  const filteredExpenses = filterExpenses();

  const pieData = {
    labels: categories,
    datasets: [
      {
        data: categories.map(category => 
          filteredExpenses
            .filter(expense => expense.category === category)
            .reduce((total, expense) => total + expense.amount, 0)
        ),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
      }
    ]
  };

  const barData = {
    labels: filteredExpenses.map(expense => expense.date),
    datasets: [
      {
        label: 'Expenses Over Time',
        data: filteredExpenses.map(expense => expense.amount),
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        borderWidth: 1,
        hoverBackgroundColor: '#36A2EB',
        hoverBorderColor: '#36A2EB'
      }
    ]
  };

  const budgetVsActualData = {
    labels: categories,
    datasets: [
      {
        label: 'Budget',
        data: [200, 150, 100, 120, 50], // Example budget data for each category
        backgroundColor: '#4BC0C0',
        borderColor: '#4BC0C0',
        borderWidth: 1
      },
      {
        label: 'Actual',
        data: categories.map(category => 
          filteredExpenses
            .filter(expense => expense.category === category)
            .reduce((total, expense) => total + expense.amount, 0)
        ),
        backgroundColor: '#FF6384',
        borderColor: '#FF6384',
        borderWidth: 1
      }
    ]
  };

  return (
    <Container fluid className="mt-5">
      <Row>
        <Col md={12}>
          <h2>Reports and Visualization</h2>
          <Form>
            <Form.Group controlId="formDateRange">
              <Form.Label>Date Range</Form.Label>
              <Form.Control 
                as="select" 
                value={dateRange} 
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="last7Days">Last 7 Days</option>
                <option value="lastMonth">Last Month</option>
                <option value="custom">Custom Range</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formCategoryFilter" className="mt-3">
              <Form.Label>Category</Form.Label>
              <Form.Control 
                as="select" 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" className="mt-3" onClick={filterExpenses}>Apply Filters</Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={6}>
          <h3>Expenses by Category</h3>
          <Pie data={pieData} />
        </Col>
        <Col md={6}>
          <h3>Expenses Over Time</h3>
          <Bar data={barData} />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={12}>
          <h3>Budget vs Actual Spending</h3>
          <Bar data={budgetVsActualData} />
        </Col>
      </Row>
    </Container>
  );
};

export default Reports;
