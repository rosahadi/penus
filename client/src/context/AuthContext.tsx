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
}

interface UserContextType {
  user: UserType | null;
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
});

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  error: null,
  refetch: () => {},
});

interface AuthAndUserProviderProps {
  children: ReactNode;
}

export function AuthAndUserProvider({ children }: AuthAndUserProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('isAuthenticated') === 'true'
  );
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const authQuery = useQuery({
    queryKey: ['authAndUser'],
    queryFn: checkAuthAndGetUser,
  });

  useEffect(() => {
    const isValid = authQuery.data?.isValid ?? false;
    const userData = authQuery.data?.user ?? null;

    setIsAuthenticated(isValid);
    localStorage.setItem('isAuthenticated', JSON.stringify(isValid));

    if (userData) {
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
    } else {
      setUser(null);
      localStorage.removeItem('currentUser');
    }
  }, [authQuery.data]);

  const authValue: AuthContextType = {
    isAuthenticated,
  };

  const userValue: UserContextType = {
    user,
    isLoading: authQuery.isLoading,
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
