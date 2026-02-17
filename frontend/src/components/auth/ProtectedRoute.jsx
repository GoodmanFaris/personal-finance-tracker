"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthData from "../../hooks/useAuthData";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuthData();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (!isAuthenticated) return null;

  return children;
}
