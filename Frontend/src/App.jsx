
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserAuth from "./UserAuthPortal.jsx"
import LandingPage from './pages/LandingPage.jsx';
import Timeline from './components/Timeline';
import Seller from './pages/Seller';
import NotificationsPage from './pages/AdminDashboard/NotificationsPage';
import BuyerDashboard from './pages/BuyerDashboard/BuyerDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import WarehouseDashboard from './components/WarehouseDashboard.jsx';
// import './App.css';

function App() {
  return (
    
    <BrowserRouter>
      <Routes location={location} key={location.pathname}>
        <Route path="/userAuth" element={<UserAuth />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/seller/*" element={<Seller />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/warehouse-dashboard" element={<WarehouseDashboard />} />
        {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
        {/* <Route path="/seller-dashboard" element={<SellerDashboard />} /> */}
        {/* <Route path="/buyer-dashboard" element={<BuyerDashboard />} /> */}
      </Routes>
    </BrowserRouter>
    // <>
    //   <UserAuth />
    // </>
  );
}

export default App
