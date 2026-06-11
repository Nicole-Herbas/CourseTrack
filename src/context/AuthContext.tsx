import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User, UserRole, LoginCredentials, AuthState } from '../interfaces/user';

// Predefined users for simulated auth
const PREDEFINED_USERS: Record<string, { password: string; user: User }> = {
  admin: {
    password: 'admin123',
    user: {
      id: '1',
      username: 'admin',
      email: 'admin@coursetrack.com',
      role: 'admin' as UserRole,
      avatar: undefined,
    },
  },
  usuario: {
    password: 'user123',
    user: {
      id: '2',
      username: 'usuario',
      email: 'usuario@coursetrack.com',
      role: 'user' as UserRole,
      avatar: undefined,
    },
  },
};

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Generate a fake JWT-like token
function generateToken(user: User): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      iat: Date.now(),
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24h
    })
  );
  const signature = btoa('coursetrack-secret-signature');
  return `${header}.${payload}.${signature}`;
}

// Decode the fake JWT token
function decodeToken(token: string): User | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp < Date.now()) {
      // Token expired
      return null;
    }
    return {
      id: payload.sub,
      username: payload.username,
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

const STORAGE_KEY = 'coursetrack_auth_token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Restore session from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_KEY);
    if (storedToken) {
      const decoded = decodeToken(storedToken);
      if (decoded) {
        setUser(decoded);
        setToken(storedToken);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    // Simulate async delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const entry = PREDEFINED_USERS[credentials.username];
    if (!entry || entry.password !== credentials.password) {
      return false;
    }

    const newToken = generateToken(entry.user);
    localStorage.setItem(STORAGE_KEY, newToken);
    setUser(entry.user);
    setToken(newToken);
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setToken(null);
  }, []);

  const isAuthenticated = !!user && !!token;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
