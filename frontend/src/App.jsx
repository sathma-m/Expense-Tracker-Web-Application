import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ForgotPassword from './pages/ForgotPassword';

import Profile from "./pages/Profile";
import Expenses from "./pages/Expenses";


function AppContent() {

  const location = useLocation();

  const isAuthenticatedPage = [
  "/dashboard",
  "/profile",
  "/expenses",
].includes(location.pathname);
  return (
    <>
      {!isAuthenticatedPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        <Route path="/profile" element={<Profile />} />
        <Route path="/expenses" element={<Expenses />} />
      </Routes>

      {!isAuthenticatedPage && <Footer />}
    </>
  );
}


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;