import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/AdminSidebar';
import StatCard from '../../components/StatCard';
import SellerForm from '../../components/SellerForm';
import WarehouseForm from '../../components/WarehouseForm';
import Notifications from '../../components/Notifications';
import Footer from '../../components/Footer';
import NotificationsPage from './NotificationsPage';
import BuyerDashboard from '../BuyerDashboard/BuyerDashboard';

function AdminDashboard() {
  const [stats] = useState({
    totalProducts: 150,
    totalSellers: 50,
    totalWarehouses: 10,
    counterfeits: 1,
  });

  const [notifications] = useState([
    "Product #123 moved to Warehouse 2",
    "Seller XYZ deleted their account",
    "Counterfeit detected at Warehouse 3!",
  ]);

  const handleSellerSubmit = (sellerData) => {
    console.log('New seller registered:', sellerData);
  };

  const handleWarehouseSubmit = (warehouseData) => {
    console.log('New warehouse registered:', warehouseData);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white font-sans">
      <Header />

      <div className="flex flex-1 pt-[100px] md:pt-[70px]">
        <Sidebar />

        <section className="flex-1 px-5 md:px-8 lg:px-10">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Welcome Admin!</h2>
            <div className="flex flex-wrap gap-5">
              <StatCard title="Total Products" value={stats.totalProducts} />
              <StatCard title="Total Sellers" value={stats.totalSellers} />
              <StatCard title="Total Warehouses" value={stats.totalWarehouses} />
              <StatCard title="Counterfeits" value={stats.counterfeits} />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between mb-10 gap-4">
            <div className="bg-[#1e1e1e] p-5 rounded-lg w-full lg:w-1/2">
              <SellerForm onSubmit={handleSellerSubmit} />
            </div>

            <div className="text-center text-gray-400 text-xl flex items-center justify-center lg:px-3">or</div>

            <div className="bg-[#1e1e1e] p-5 rounded-lg w-full lg:w-1/2">
              <WarehouseForm onSubmit={handleWarehouseSubmit} />
            </div>
          </div>

          <div className="bg-[#1e1e1e] p-5 rounded-lg mb-10">
            <Notifications items={notifications} />
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default AdminDashboard;
