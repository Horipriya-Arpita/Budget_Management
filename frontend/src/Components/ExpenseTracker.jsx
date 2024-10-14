// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

// const ExpenseTracker = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [newExpense, setNewExpense] = useState({
//     date: '',
//     amount: '',
//     category: '',
//     description: ''
//   });
//   const [filter, setFilter] = useState({
//     date: '',
//     category: '',
//     amount: ''
//   });
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewExpense({ ...newExpense, [name]: value });
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilter({ ...filter, [name]: value });
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const addExpense = () => {
//     setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
//     setNewExpense({
//       date: '',
//       amount: '',
//       category: '',
//       description: ''
//     });
//   };

//   const deleteExpense = (id) => {
//     setExpenses(expenses.filter(expense => expense.id !== id));
//   };

//   const filteredExpenses = expenses
//     .filter(expense => 
//       (filter.date === '' || expense.date.includes(filter.date)) &&
//       (filter.category === '' || expense.category.includes(filter.category)) &&
//       (filter.amount === '' || expense.amount.includes(filter.amount))
//     )
//     .filter(expense => 
//       expense.description.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//   return (
//     <Container fluid className="mt-5">
//       <Row>
//         <Col md={4}>
//           <h2>Add Expense</h2>
//           <Form>
//             <Form.Group controlId="formDate">
//               <Form.Label>Date</Form.Label>
//               <Form.Control 
//                 type="date" 
//                 name="date" 
//                 value={newExpense.date} 
//                 onChange={handleInputChange} 
//               />
//             </Form.Group>
//             <Form.Group controlId="formAmount">
//               <Form.Label>Amount</Form.Label>
//               <Form.Control 
//                 type="number" 
//                 name="amount" 
//                 value={newExpense.amount} 
//                 onChange={handleInputChange} 
//               />
//             </Form.Group>
//             <Form.Group controlId="formCategory">
//               <Form.Label>Category</Form.Label>
//               <Form.Control 
//                 as="select" 
//                 name="category" 
//                 value={newExpense.category} 
//                 onChange={handleInputChange} 
//               >
//                 <option value="">Select Category</option>
//                 <option value="Food">Food</option>
//                 <option value="Transport">Transport</option>
//                 <option value="Utilities">Utilities</option>
//                 <option value="Entertainment">Entertainment</option>
//                 <option value="Other">Other</option>
//               </Form.Control>
//             </Form.Group>
//             <Form.Group controlId="formDescription">
//               <Form.Label>Description</Form.Label>
//               <Form.Control 
//                 type="text" 
//                 name="description" 
//                 value={newExpense.description} 
//                 onChange={handleInputChange} 
//               />
//             </Form.Group>
//             <Button variant="primary" onClick={addExpense}>Save</Button>
//           </Form>
//         </Col>
//         <Col md={8}>
//           <h2>Expense List</h2>
//           <Form className="mb-3">
//             <Row>
//               <Col>
//                 <Form.Control 
//                   type="text" 
//                   placeholder="Search" 
//                   value={searchTerm} 
//                   onChange={handleSearchChange} 
//                 />
//               </Col>
//               <Col>
//                 <Form.Control 
//                   type="date" 
//                   name="date" 
//                   value={filter.date} 
//                   onChange={handleFilterChange} 
//                 />
//               </Col>
//               <Col>
//                 <Form.Control 
//                   as="select" 
//                   name="category" 
//                   value={filter.category} 
//                   onChange={handleFilterChange} 
//                 >
//                   <option value="">All Categories</option>
//                   <option value="Food">Food</option>
//                   <option value="Transport">Transport</option>
//                   <option value="Utilities">Utilities</option>
//                   <option value="Entertainment">Entertainment</option>
//                   <option value="Other">Other</option>
//                 </Form.Control>
//               </Col>
//               <Col>
//                 <Form.Control 
//                   type="number" 
//                   placeholder="Amount" 
//                   name="amount" 
//                   value={filter.amount} 
//                   onChange={handleFilterChange} 
//                 />
//               </Col>
//             </Row>
//           </Form>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Category</th>
//                 <th>Amount</th>
//                 <th>Description</th>
//                 {/* {<th>Actions</th>} */}
//               </tr>
//             </thead>
//             <tbody>
//               {filteredExpenses.map(expense => (
//                 <tr key={expense.id}>
//                   <td>{expense.date}</td>
//                   <td>{expense.category}</td>
//                   <td>{expense.amount}</td>
//                   <td>{expense.description}</td>
//                   <td>
//                     <Button 
//                       variant="danger" 
//                       onClick={() => deleteExpense(expense.id)}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default ExpenseTracker;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newExpense, setNewExpense] = useState({
    date: '',
    amount: '',
    category: '',
    description: ''
  });
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    // Fetch categories from backend
    // const fetchCategories = async () => {
    //   try {
    //     const res = await axios.get('http://localhost:5000/api/expenses/categories');
    //     console.log("00" + res.data);
    //     setCategories(res.data);
    //   } catch (error) {
    //     console.error("Error fetching categories:", error);
    //   }
    // };
    const fetchCategories = async () => {
      try {
          const response = await axios.get('http://localhost:5000/api/expenses/categories', { withCredentials: true });
          setCategories(response.data);
      } catch (error) {
          console.error("Error fetching categories:", error);
      }
    };

    const fetchExpenses = async () => {
      try {
          const response = await axios.get('http://localhost:5000/api/expenses', {
              withCredentials: true
          });
          setExpenses(response.data);  // Set the fetched expenses into state
      } catch (error) {
          console.error("Error fetching expenses:", error);
      }
    };

    fetchCategories();
    fetchExpenses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const addExpense = async () => {
    try {
      await axios.post('http://localhost:5000/api/expenses/addexpense', newExpense, { withCredentials: true });
      setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
      setNewExpense({
        date: '',
        amount: '',
        category: '',
        description: ''
      });
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  // const addCategory = async () => {
  //   try {
  //     await axios.post('http://localhost:5000/api/expenses/categories', { name: newCategory }, { withCredentials: true });
  //     setCategories([...categories, { name: newCategory }]);
  //     setNewCategory('');
  //   } catch (error) {
  //     console.error("Error adding category:", error);
  //   }
  // };

  const addCategory = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/expenses/categories', 
      { name: newCategory }, // Only send the category name
      { withCredentials: true });

      setCategories([...categories, { name: newCategory }]);
      setNewCategory('');
    } catch (error) {
      console.error("Error adding category:", error.response ? error.response.data : error.message);
    }
};


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
                {categories.map((cat, index) => (
                  <option key={index} value={cat.id}>{cat.name}</option>
                ))}
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

          <h3>Add New Category</h3>
          <Form.Group controlId="formNewCategory">
            <Form.Label>Category Name</Form.Label>
            <Form.Control 
              type="text" 
              value={newCategory} 
              onChange={handleCategoryChange} 
            />
          </Form.Group>
          <Button variant="secondary" onClick={addCategory}>Add Category</Button>
        </Col>

        <Col md={8}>
          <h2>Expense List</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(expense => (
                <tr key={expense.id}>
                  <td>{expense.date}</td>
                  <td>{expense.category}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.description}</td>
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

