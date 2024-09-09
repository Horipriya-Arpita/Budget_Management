
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// import Navbars from './Components/Navbar';

// function App() {
//   return (
//     <div className="App">
//       <Navbars />
//       <h1>hiii</h1>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbars from './Components/Navbar';
import RegistrationPage from './Components/RegistrationPage';
import LoginPage from './Components/LoginPage';
import SplashScreen from './Components/SplashScreen';
import Dashboard from './Components/Dashboard';
import ExpenseTracker from './Components/ExpenseTracker';
import BudgetSetting from './Components/BudgetSetting';
import Reports from './Components/Reports';
import ProfileSettings from './Components/ProfileSettings';
import Help from './Components/Help';
// import Home from './Components/Home'; // Ensure you have these components
// import About from './Components/About';
// import Contact from './Components/Contact';
// import Profile from './Components/Profile';

const App = () => {
  return (
    <Router>
      <Navbars />
      <Routes>
      <Route path="/" element={<SplashScreen />} />
        {/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} /> */}
        <Route path="/help" element={<Help />} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/budget-setting" element={<BudgetSetting />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expense-tracker" element={<ExpenseTracker />} />
      </Routes>
    </Router>
  );
};

export default App;
