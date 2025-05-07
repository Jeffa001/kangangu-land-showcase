
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '@/middleware/authMiddleware';
import Navbar from '@/components/Navbar';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(password)) {
      const from = location.state?.from?.pathname || '/admin';
      toast({
        title: "Login successful",
        description: "Welcome to the admin area",
      });
      navigate(from, { replace: true });
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container-custom py-12 flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-serif font-semibold mb-6 text-center text-kangangu">Admin Login</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
                placeholder="Enter admin password"
              />
            </div>
            
            <Button type="submit" className="w-full bg-kangangu hover:bg-kangangu-dark">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
