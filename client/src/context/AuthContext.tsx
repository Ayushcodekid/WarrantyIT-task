import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  username?: string;
  email: string;
}

interface AuthResponse {
  user: User;
}

interface AuthContextType {
  user: User | null;
  loginUser: (userData: AuthResponse) => void;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Initialize from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = (userData: AuthResponse) => {
    setUser(userData.user);
    localStorage.setItem("user", JSON.stringify(userData.user));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
