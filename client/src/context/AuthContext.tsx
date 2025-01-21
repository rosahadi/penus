import { checkAuthAndGetUser } from '@/api/auth';
import { UserType } from '@/types/auth';
import { useQuery } from '@tanstack/react-query';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

interface UserContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isLoading: true,
  error: null,
  refetch: () => {},
});

interface AuthAndUserProviderProps {
  children: ReactNode;
}
export function AuthAndUserProvider({ children }: AuthAndUserProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth === 'true';
  });

  const [user, setUser] = useState<UserType | null>(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Ensure the query only runs if we don't have the initial state in localStorage
  const authQuery = useQuery({
    queryKey: ['authAndUser'],
    queryFn: checkAuthAndGetUser,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  useEffect(() => {
    if (authQuery.isFetched) {
      const isValid = authQuery.data?.isValid ?? false;
      const userData = authQuery.data?.user ?? null;

      setIsAuthenticated(isValid);
      setUser(userData);

      if (isValid) {
        localStorage.setItem('isAuthenticated', JSON.stringify(isValid));
        if (userData) {
          localStorage.setItem('currentUser', JSON.stringify(userData));
        }
      } else {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
      }
    }
  }, [authQuery.data, authQuery.isFetched]);

  const handleSetUser = (newUser: UserType | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('currentUser', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  };

  const handleSetIsAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
    localStorage.setItem('isAuthenticated', JSON.stringify(value));
  };

  const authValue: AuthContextType = {
    isAuthenticated: !!isAuthenticated,
    setIsAuthenticated: handleSetIsAuthenticated,
  };

  const userValue: UserContextType = {
    user,
    setUser: handleSetUser,
    isLoading: authQuery.isLoading || isAuthenticated === null,
    error: authQuery.error,
    refetch: authQuery.refetch,
  };

  return (
    <AuthContext.Provider value={authValue}>
      <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export const useUser = () => useContext(UserContext);
