"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { STORAGE_KEY } from "@/lib/const";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [storedValue] = useLocalStorage(STORAGE_KEY);
  
  useEffect(() => {
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";

    if (!storedValue)  router.push('/signup');
    else router.push(currentUrl);
  }, [router, storedValue]);

    return <>{children}</>;
}
