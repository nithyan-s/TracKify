import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
       
        const response = await axios.get('http://localhost:8080/seller/products', {
          withCredentials: true 
        });
        const productsData = response.data.products || response.data;
        setProducts(Array.isArray(productsData) ? productsData : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !category.trim() || (product.category && product.category.toLowerCase().includes(category.toLowerCase()));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
        <Link
          to="/seller/add-product"
          className="inline-flex items-center px-4 py-2 mt-4 sm:mt-0 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span className="mr-2">+</span>
          Add Product
        </Link>
      </div>

      {error && (
        <div className="p-4 text-sm text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="search"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          className="px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder="Filter by category..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          No products found. Add your first product to get started.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300">
              <tr>
                <th className="px-4 py-2 text-left font-medium uppercase tracking-wider">Product</th>
                <th className="px-4 py-2 text-left font-medium uppercase tracking-wider">Category</th>
                <th className="px-4 py-2 text-left font-medium uppercase tracking-wider">Price</th>
                <th className="px-4 py-2 text-left font-medium uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-2 text-left font-medium uppercase tracking-wider">Status</th>
                <th className="px-4 py-2 text-left font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td className="px-4 py-3 text-gray-900 dark:text-white">{product.name}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{product.category}</td>
                  <td className="px-4 py-3 text-gray-900 dark:text-white">₹{product.cost?.toFixed(2) || '0.00'}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{product.qty}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === 'IN_GODOWN' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : product.status === 'IN_TRANSIT' 
                        ? 'bg-blue-100 text-blue-800' 
                        : product.status === 'DELIVERED' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status?.replace('_', ' ') || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        onClick={() => {/* Add edit functionality */}}
                      >
                        Edit
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        onClick={() => {/* Add delete functionality */}}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;