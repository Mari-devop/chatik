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
        // Получаем данные из IndexedDB
        const users = await dbInstance.getData("users");
        const token = users && users.length > 0 ? users[0].token : null;

        // Если токен существует, пользователь авторизован
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false); // В случае ошибки считаем, что пользователь не авторизован
      }
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    // Пока идет проверка, показываем лоадер
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
