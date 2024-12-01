"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { STORAGE_KEY } from "@/lib/const";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthCheck({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [storedValue] = useLocalStorage(STORAGE_KEY);

    useEffect(() => {
        const currentUrl = window.location.pathname;

        if (!storedValue) router.push('/signup');
        else if (currentUrl === "/") {
            router.push("/home");
        } else router.push(currentUrl);
    }, [router, storedValue]);

    return <>{children}</>;
}
