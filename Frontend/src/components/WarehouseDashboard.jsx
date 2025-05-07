import React, { useState } from 'react';

const WarehouseDashboard = () => {
  const [products, setProducts] = useState([
    { id: 'P001', name: 'Product A' },
    { id: 'P002', name: 'Product B' },
    { id: 'P003', name: 'Product C' },
  ]);

  const [counterfeitProducts, setCounterfeitProducts] = useState([
    { id: 'CF001', name: 'Counterfeit X' },
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('transit'); // 'transit' or 'counterfeit'

  const handleShipProduct = async (productId) => {
    const productToShip = products.find(p => p.id === productId);
    if (!productToShip) return;

    try {
      await fetch('/api/shipProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productToShip),
      });

      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (error) {
      console.error('Failed to ship product:', error);
    }
  };

  const notifyAdminAboutCounterfeit = async (productId) => {
    const product = counterfeitProducts.find(p => p.id === productId);
    if (!product) return;

    try {
      await fetch('/api/notifyCounterfeit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      alert(`Admin notified about ${product.name}`);
    } catch (error) {
      console.error('Failed to notify admin:', error);
    }
  };

  const handleNavigation = (component) => {
    setActiveComponent(component);
    
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  // Component for Products in Transit
  const ProductsInTransit = () => (
    <section className="bg-gray-900 rounded-2xl p-4 md:p-6 shadow-lg">
      <h2 className="text-2xl font-semibold text-blue-400 mb-4">Products in Transit</h2>
      {products.length === 0 ? (
        <p className="text-gray-400">No products currently in transit.</p>
      ) : (
        <ul className="space-y-3">
          {products.map((product) => (
            <li key={product.id} className="bg-gray-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="text-white font-medium">{product.name} ({product.id})</div>
              <button
                onClick={() => handleShipProduct(product.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg w-full sm:w-auto"
              >
                Mark as Shipped
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );

  // Component for Counterfeit Products
  const CounterfeitProducts = () => (
    <section className="bg-gray-900 rounded-2xl p-4 md:p-6 shadow-lg">
      <h2 className="text-2xl font-semibold text-red-400 mb-4">Counterfeit Products</h2>
      {counterfeitProducts.length === 0 ? (
        <p className="text-gray-400">No counterfeit products detected.</p>
      ) : (
        <ul className="space-y-3">
          {counterfeitProducts.map((product) => (
            <li key={product.id} className="bg-red-900 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="text-white font-medium">{product.name} ({product.id})</div>
              <button
                onClick={() => notifyAdminAboutCounterfeit(product.id)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-lg w-full sm:w-auto"
              >
                Notify Admin
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );

  return (
    <div className="flex min-h-screen bg-gray-800">
      {/* Sidebar - fixed on mobile, visible on desktop */}
      <div className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-64 p-6 transition-all duration-300 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:h-screen`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button 
            className="text-white md:hidden" 
            onClick={() => setSidebarOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="space-y-4">
          <button 
            onClick={() => handleNavigation('transit')} 
            className={`block w-full text-left py-2 px-4 rounded hover:bg-gray-800 transition duration-150 ${activeComponent === 'transit' ? 'bg-gray-800 text-blue-400' : 'text-white hover:text-blue-400'}`}
          >
            Products in Transit
          </button>
          <button 
            onClick={() => handleNavigation('counterfeit')} 
            className={`block w-full text-left py-2 px-4 rounded hover:bg-gray-800 transition duration-150 ${activeComponent === 'counterfeit' ? 'bg-gray-800 text-red-400' : 'text-white hover:text-red-400'}`}
          >
            Counterfeit Products
          </button>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 p-4 md:p-6 w-full md:ml-0">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Warehouse Dashboard</h1>
            <p className="text-gray-400 max-w-xl">
              View and manage products currently in transit. Shipping triggers blockchain verification.
            </p>
          </div>
          <button 
            className="text-white md:hidden bg-gray-700 p-2 rounded" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>

        {/* Dynamic Component Rendering */}
        <div className="mt-10 mb-8">
          {activeComponent === 'transit' ? <ProductsInTransit /> : <CounterfeitProducts />}
        </div>
      </div>
    </div>
  );
};

export default WarehouseDashboard;