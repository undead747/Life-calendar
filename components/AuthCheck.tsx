// components/AuthCheck.tsx
"use client";

import { STORAGE_KEY } from "@/lib/const";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const token = localStorage.getItem(STORAGE_KEY);

  useEffect(() => {
    if (!token) {
      router.push('/signup');
    }
  }, [router]);

  if (!token) return null
  return <>{children}</>; 
};

export default AuthCheck;