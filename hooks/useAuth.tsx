"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {STORAGE_KEY} from '@/lib/const'

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (!token) {
      router.push('/signup');
    }
  }, [router]);
};

export default useAuth;