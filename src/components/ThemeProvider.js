"use client";
import { useEffect } from 'react';
import useStore from '../store';

export default function ThemeProvider({ children }) {
  const { darkMode } = useStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return <>{children}</>;
}
