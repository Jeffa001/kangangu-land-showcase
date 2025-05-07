
import React from 'react';
import Navbar from '@/components/Navbar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container-custom py-12">
        <h1 className="text-3xl font-serif font-semibold mb-8">Admin Dashboard</h1>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
