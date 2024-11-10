// components/AuthCheck.tsx
"use client";

import useAuth from "@/hooks/useAuth";

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  useAuth(); 

  return <>{children}</>; 
};

export default AuthCheck;