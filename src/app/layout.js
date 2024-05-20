import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css';
import { db } from '@/lib/db';
import { auth } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';
import ProfileForm from '@/components/ProfileForm';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import  NextThemeProvider  from '@/components/themeProvider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';


export default async function RootLayout({ children}) {
  const { userId } = auth();
  const profiles = await db.query(`SELECT * FROM profiles WHERE clerk_id = '${userId}' `);
  console.log(profiles)

  if(profiles.rowCount === 0 && userId) {
    await db.query(`INSERT INTO profiles (clerk_id) VALUES ('${userId}')`);
  }
const hasUsername = profiles.rows[0]?.username !== null ? true : false;



return (
    <ClerkProvider>
      <html lang="en">
        <body>
      <NextThemeProvider >
     <Theme>
      <Header/>
      <nav>
        <ul style={navStyle}>
          <li style={navItemStyle}>
            <Link href="/" style={linkStyle}>
              Home
            </Link>
          </li>
          <li style={navItemStyle}>
            <Link href="/posts" style={linkStyle}>
             Posts
            </Link>
          </li>
          <li style={navItemStyle}>
            <Link href={`/profile/${profiles.rows[0]?.id}`} style={linkStyle}>
              User Profile
            </Link>
          </li>
         </ul>
      </nav>
          <main>
            <SignedOut>
            {children}
            </SignedOut>
             
            <SignedIn>
             {hasUsername && children}
             {!hasUsername && <ProfileForm/>}
            </SignedIn>
            
          </main>
          <Footer/>
         </Theme>
        </NextThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

const navStyle = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  justifyContent: 'center',

};

const navItemStyle = {
  marginRight: '1rem',
};

const linkStyle = {
   
  textDecoration: 'none',
  fontFamily: 'Verdana, Geneva, sans-serif', 
};