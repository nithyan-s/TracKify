import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    recentOrders: []
  });

  const [showDiscontinueModal, setShowDiscontinueModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setStats({
        recentOrders: [
          { id: '#ORD-001', customer: 'John Smith', date: '2025-04-18', amount: 120, status: 'Delivered' },
          { id: '#ORD-002', customer: 'Sarah Johnson', date: '2025-04-17', amount: 349, status: 'Processing' },
          { id: '#ORD-003', customer: 'Michael Brown', date: '2025-04-16', amount: 59, status: 'Shipped' },
        ]
      });
    };

    fetchData();
  }, []);

  const handleDiscontinueRequest = async () => {
    // Add actual API call here
    alert('Discontinuation request submitted. Our team will contact you shortly.');
    setShowDiscontinueModal(false);
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-0">Seller Dashboard</h1>
        <button 
          onClick={() => setShowDiscontinueModal(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full sm:w-auto"
        >
          Request to Discontinue
        </button>
      </div>

      {/* Discontinue Confirmation Modal */}
      {showDiscontinueModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Confirm Discontinuation</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Are you sure you want to discontinue your seller account? This action will initiate the account closure process.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDiscontinueModal(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDiscontinueRequest}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Orders - Responsive List */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Recent Orders</h2>
        
        {/* Stacked List for Small Screens */}
        <div className="space-y-4 md:hidden">
          {stats.recentOrders.map(order => (
            <div key={order.id} className="border rounded-md p-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Order ID: {order.id}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Customer: {order.customer}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Date: {order.date}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Amount: ${order.amount}</p>
              <p className="text-sm">
                Status: <span className={`px-2 py-1 rounded-full text-xs font-medium 
                            ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-blue-100 text-blue-800'}`}>
                          {order.status}
                        </span>
              </p>
            </div>
          ))}
        </div>
        
        {/* Table for Medium Screens and Up */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {stats.recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{order.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{order.customer}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{order.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${order.amount}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium 
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
