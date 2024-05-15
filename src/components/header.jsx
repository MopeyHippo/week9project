import Home from '@/app/page'
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image';

export default function Header() {
    return (

       
<header class="flex justify-between items-center py-4 px-8 bg-white text-black">
    <div class="flex items-center">
        <SignedOut>
            <SignInButton />
        </SignedOut>
        <SignedIn>
            <UserButton />
        </SignedIn>
    </div>
    <div class="flex items-center">
        <h1 class="text-3xl font-bold">Y</h1>
        <h2 class="text-lg">The App For People Who Ask Y?</h2>
    </div>
    <div class="flex items-center">
        <Image src="/Designer.jpeg" alt="Picture of Logo" height={50} width={50}/>
    </div>
</header>
   
    );
}
