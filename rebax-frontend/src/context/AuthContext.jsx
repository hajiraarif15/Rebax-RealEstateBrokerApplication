import { createContext, useContext, useEffect, useState, useMemo } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const raw = localStorage.getItem("rebax_auth");
    return raw ? JSON.parse(raw) : null;
  });

  const login = (data) => {
    setAuth(data);
    localStorage.setItem("rebax_auth", JSON.stringify(data));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("rebax_auth");
  };

  // Keep auth synced on refresh
  useEffect(() => {
    const raw = localStorage.getItem("rebax_auth");
    if (raw && !auth) setAuth(JSON.parse(raw));
  }, [auth]);

  const value = useMemo(() => ({ auth, setAuth, login, logout }), [auth]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useRole() {
  const { auth } = useAuth();
  return auth?.role;
}
