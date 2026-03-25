import { useState, useEffect } from 'react';
import { setAuthTokenGetter } from '@workspace/api-client-react';

const STORAGE_KEY = 'admin_token';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? 'ermal123admin';

// Keep auth token getter in sync with session storage across renders
setAuthTokenGetter(() => sessionStorage.getItem(STORAGE_KEY));

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem(STORAGE_KEY);
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, password);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isLoading, login, logout };
}
