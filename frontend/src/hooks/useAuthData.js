"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { registerUser, loginUser, fetchMe, logoutUser } from "../lib/auth";

export default function useAuthData() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState("");

  const isAuthenticated = useMemo(() => {
    return !!token && !!user;
  }, [token, user]);

  const me = useCallback(async () => {
    setError("");
    try {
      const meData = await fetchMe();
      setUser(meData);
      return meData;
    } catch (err) {
      setUser(null);
      return null;
    }
  }, []);

  const login = useCallback(
    async (email, password) => {
      setError("");
      try {
        const data = await loginUser({ email, password });
        localStorage.setItem("access_token", data.access_token);
        setToken(data.access_token);

        await me();
        return true;
      } catch (err) {
        const msg =
          err?.response?.data?.detail || "Login failed. Check email/password.";
        setError(msg);
        return false;
      }
    },
    [me],
  );

  const register = useCallback(
    async (name, email, password) => {
      setError("");
      try {
        await registerUser({ name, email, password });
        const ok = await login(email, password);
        return ok;
      } catch (err) {
        const msg =
          err?.response?.data?.detail ||
          "Register failed. Email may already be in use.";
        setError(msg);
        return false;
      }
    },
    [login],
  );

  const logout = useCallback(async () => {
    setError("");
    try {
      await logoutUser();
    } catch (e) {
        //ignore errors on logout
    } finally {
      localStorage.removeItem("access_token");
      setToken(null);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const t = localStorage.getItem("access_token");
        if (t) {
          setToken(t);
          await me();
        }
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [me]);

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    me,
    setToken, 
    setUser, 
  };
}
