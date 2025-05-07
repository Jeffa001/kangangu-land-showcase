
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '@/middleware/authMiddleware';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

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
          {authenticated ? (
            <>
              <Link 
                to="/admin" 
                className="font-medium text-gray-700 hover:text-kangangu transition-colors"
              >
                Admin
              </Link>
              <Button 
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-1"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="font-medium text-gray-700 hover:text-kangangu transition-colors"
            >
              Login
            </Link>
          )}
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
