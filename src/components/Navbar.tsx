
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-serif font-bold tracking-tight text-kangangu hover:text-kangangu-dark transition-colors">
            KANGANGU
          </h1>
        </Link>
        <div className="flex items-center space-x-6">
          <Link 
            to="/" 
            className="font-medium text-gray-700 hover:text-kangangu transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/admin" 
            className="font-medium text-gray-700 hover:text-kangangu transition-colors"
          >
            Admin
          </Link>
          <Link 
            to="/" 
            className="btn-primary"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
