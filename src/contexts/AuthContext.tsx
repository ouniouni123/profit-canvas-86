import { createContext, useContext, useState, ReactNode } from "react";

export type AppRole = "admin" | "user";

interface User {
  email: string;
  name: string;
  role: AppRole;
}

interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => string | null;
  signup: (email: string, password: string, name: string, role?: AppRole) => string | null;
  logout: () => void;
}

const USERS_KEY = "profitview_users";
const SESSION_KEY = "profitview_session";

function getStoredUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch { return []; }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const s = localStorage.getItem(SESSION_KEY);
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  });

  const login = (email: string, password: string): string | null => {
    const users = getStoredUsers();
    const found = users.find((u) => u.email === email);
    if (!found) return "No account found with this email.";
    if (found.password !== password) return "Incorrect password.";
    const session: User = { email: found.email, name: found.name, role: found.role };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return null;
  };

  const signup = (email: string, password: string, name: string, role: AppRole = "user"): string | null => {
    const users = getStoredUsers();
    if (users.some((u) => u.email === email)) return "An account with this email already exists.";
    users.push({ email, password, name, role });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const session: User = { email, name, role };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return null;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
