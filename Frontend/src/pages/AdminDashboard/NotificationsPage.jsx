import React from 'react';
import Header from '../../components/Header';

const NotificationsPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white">
      <Header />

      <div className="p-8 flex-1">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl text-blue-200 mb-5 pb-2 border-b border-[#333]">Notifications</h2>
          <ul className="list-none p-0 m-0">
            <li className="bg-[#1e1e1e] mb-4 p-4 rounded border-l-4 border-blue-200">
              Product #123 moved to Warehouse 2
            </li>
            <li className="bg-[#1e1e1e] mb-4 p-4 rounded border-l-4 border-blue-200">
              Seller XYZ deleted their account
            </li>
            <li className="bg-[#1e1e1e] mb-4 p-4 rounded border-l-4 border-orange-500">
              <strong className="text-orange-500">⚠️ Counterfeit detected at Warehouse 3!</strong>
            </li>
            <div className="bg-[#2a2a2a] p-3 rounded mb-4 border-l-4 border-orange-500">
              Warehouse 1 reached 80% capacity
            </div>
            <li className="bg-[#1e1e1e] mb-4 p-4 rounded border-l-4 border-blue-200">
              New seller ABC registered successfully
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
