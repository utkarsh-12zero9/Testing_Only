import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./Redux/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Set the title and description of application.
export const metadata: Metadata = {
  title: "Membes",
  description: "Dual-Interface Membership Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Pontano+Sans:wght@300..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100..900;1,100..900&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        
      </body>
      {/* <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="block lg:hidden">
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </div>
        <div className="h-screen w-screen hidden text-white lg:flex justify-center align items-center">
          <h1 className="text-3xl">This Page is Blocked in desktop devices. Kindly access from Mobile/Tablet</h1>
        </div>
      </body> */}
    </html>
  );
}
