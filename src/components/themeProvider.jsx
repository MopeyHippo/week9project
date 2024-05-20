'use client';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

export default function NextThemeProvider({ children }) {
  return <ThemeProvider attribute="class">
    {children}
  </ThemeProvider>;
}