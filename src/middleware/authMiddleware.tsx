
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthMiddlewareProps {
  children: React.ReactNode;
}

const ADMIN_PASSWORD = "1234";

export const isAuthenticated = (): boolean => {
  return localStorage.getItem("auth_token") === ADMIN_PASSWORD;
};

export const login = (password: string): boolean => {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem("auth_token", password);
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem("auth_token");
};

export const ProtectedRoute: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else {
      setIsAuthorized(true);
    }
  }, [navigate]);

  return isAuthorized ? <>{children}</> : null;
};
