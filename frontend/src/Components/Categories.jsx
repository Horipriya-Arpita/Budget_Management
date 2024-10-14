import React, { useState } from 'react';
import { Modal, Button, Form, Dropdown } from 'react-bootstrap';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

const Categories = () => {
  // State for managing category lists and modal
  const [showModal, setShowModal] = useState(false);
  const [currentTab, setCurrentTab] = useState('income'); // Tracks which tab is active (income/expense)
  const [categoryDetails, setCategoryDetails] = useState(null); // For showing category details

  // Mock data for income and expense categories
  const incomeCategories = ['Awards', 'Coupons', 'Grants', 'Lottery', 'Refunds', 'Rental', 'Salary', 'Sale'];
  const expenseCategories = ['Shopping', 'Food', 'Health', 'Sports', 'Entertainment', 'Transportation', 'Telephone', 'Social', 'Home', 'Insurance', 'Electronics', 'Education', 'Bills'];

  const incomeCategoryList = incomeCategories.map((category)=>
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={category} />
      </ListItemButton>
      <Divider />
    </ListItem>
  )

  const expenseCategoryList = expenseCategories.map((category)=>
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={category} />
      </ListItemButton>
      <Divider />
    </ListItem>
  )
  // Handlers for modal open/close and form submission
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Handler to display category details when a category is clicked
  const handleCategoryClick = (category, type) => {
    setCategoryDetails({
      name: category,
      type: type,
      transactions: [
        { date: 'Oct 02, 2024', time: '8:25 PM', method: 'Cash', amount: 'BDT 500.00' },
        { date: 'Oct 01, 2024', time: '4:00 PM', method: 'Credit Card', amount: 'BDT 150.00' },
      ],
    });
  };

  return (
    
    <div>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">


      <h2>Income Categories</h2>
       
      <List>
        {incomeCategoryList}
      </List>

      <h2>Expense Categories</h2>

      <List>
        {expenseCategoryList}
        
      </List>
    </nav>

  </Box>
    </div>
  );
};

export default Categories;
