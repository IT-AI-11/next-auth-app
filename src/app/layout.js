import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Authentication Youtube",
  description: "Youtube auth with Sahad",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>

          <h1>h1 added fro testing</h1>

          <ClerkLoading>
            {/* <Loader /> */}
            Loading...
          </ClerkLoading>

          <ClerkLoaded>
            <Header />
            {children}
          </ClerkLoaded>

        </body>
      </html>
    </ClerkProvider>
  );
}
