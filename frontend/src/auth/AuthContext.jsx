import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    let alive = true;

    async function boot() {
      try {
        const data = await authApi.me(); // ✅ checks cookie
        if (!alive) return;
        setUser(data.user);
      } catch (e) {
        // 401 = not logged in (normal)
        if (!alive) return;
        setUser(null);
      } finally {
        if (!alive) return;
        setIsBooting(false);
      }
    }

    boot();
    return () => {
      alive = false;
    };
  }, []);

  const auth = useMemo(() => {
    return {
      user,
      isAuthenticated: !!user,
      isBooting,

      login: async ({ email, password }) => {
        const data = await authApi.login({ email, password });
        setUser(data.user);
      },

      register: async ({ email, password, name }) => {
        const data = await authApi.register({ email, password, name });
        setUser(data.user);
      },

      logout: async () => {
        await authApi.logout();
        setUser(null);
      },
    };
  }, [user, isBooting]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider />");
  return ctx;
}
