"use client"

import { useThemeContext } from "@radix-ui/themes";
import { useTheme } from "next-themes";





export default function ThemeToggleButton() {
    const {  setTheme } = useTheme();
    
    
    

    return (
        <>
        <button variant="outline" onClick={() => setTheme("light")}>
       Light
      </button>
      <button variant="outline" onClick={() => setTheme("dark")}>
       Dark
      </button>
      </>
    )
}