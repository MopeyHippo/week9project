"use client"
import Home from "@/app/page";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";

import ThemeToggleButton from "./toggleThemeButton";





export default function Header() {

  

  return (
    <header className="flex justify-between items-center py-4 px-8">
      <div className="flex items-center">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <div className="flex items-center">
        <h1 className="text-3xl font-bold">Y</h1>
        <h2 className="text-lg">The App For People Who Ask Y?</h2>
      </div>
      <div className="flex items-center">
     
      <ThemeToggleButton/>
        <Image
          src="/Designer.jpeg"
          alt="Picture of Logo"
          height={50}
          width={50}
        />
      </div>
      
    </header>
  );
}

