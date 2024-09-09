import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    date: '',
    amount: '',
    category: '',
    description: ''
  });
  const [filter, setFilter] = useState({
    date: '',
    category: '',
    amount: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const addExpense = () => {
    setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
    setNewExpense({
      date: '',
      amount: '',
      category: '',
      description: ''
    });
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const filteredExpenses = expenses
    .filter(expense => 
      (filter.date === '' || expense.date.includes(filter.date)) &&
      (filter.category === '' || expense.category.includes(filter.category)) &&
      (filter.amount === '' || expense.amount.includes(filter.amount))
    )
    .filter(expense => 
      expense.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Container fluid className="mt-5">
      <Row>
        <Col md={4}>
          <h2>Add Expense</h2>
          <Form>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control 
                type="date" 
                name="date" 
                value={newExpense.date} 
                onChange={handleInputChange} 
              />
            </Form.Group>
            <Form.Group controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control 
                type="number" 
                name="amount" 
                value={newExpense.amount} 
                onChange={handleInputChange} 
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control 
                as="select" 
                name="category" 
                value={newExpense.category} 
                onChange={handleInputChange} 
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                type="text" 
                name="description" 
                value={newExpense.description} 
                onChange={handleInputChange} 
              />
            </Form.Group>
            <Button variant="primary" onClick={addExpense}>Save</Button>
          </Form>
        </Col>
        <Col md={8}>
          <h2>Expense List</h2>
          <Form className="mb-3">
            <Row>
              <Col>
                <Form.Control 
                  type="text" 
                  placeholder="Search" 
                  value={searchTerm} 
                  onChange={handleSearchChange} 
                />
              </Col>
              <Col>
                <Form.Control 
                  type="date" 
                  name="date" 
                  value={filter.date} 
                  onChange={handleFilterChange} 
                />
              </Col>
              <Col>
                <Form.Control 
                  as="select" 
                  name="category" 
                  value={filter.category} 
                  onChange={handleFilterChange} 
                >
                  <option value="">All Categories</option>
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Col>
              <Col>
                <Form.Control 
                  type="number" 
                  placeholder="Amount" 
                  name="amount" 
                  value={filter.amount} 
                  onChange={handleFilterChange} 
                />
              </Col>
            </Row>
          </Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map(expense => (
                <tr key={expense.id}>
                  <td>{expense.date}</td>
                  <td>{expense.category}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.description}</td>
                  <td>
                    <Button 
                      variant="danger" 
                      onClick={() => deleteExpense(expense.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ExpenseTracker;
