// src/app/components/ProtectedRoute.js
"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  if (!isAuthenticated) {
    router.push("/");
    return null;
  }

  return children;
};