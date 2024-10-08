import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { dbInstance } from "../../db";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const users = await dbInstance.getData("users");
        const verifiedUser = users.find((user: any) => user.token);

        setIsAuthenticated(!!verifiedUser);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false); 
      }
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
