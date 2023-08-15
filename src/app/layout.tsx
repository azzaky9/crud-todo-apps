import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import RqProviders from "@/utils/Providers";
import Navbar from "@/components/navbar-component/Navbar";
import { UserProvider } from "@/context/TodosContext";

const inter = Poppins({ subsets: ["latin"], weight: ["400", "600", "800"] });

export const metadata: Metadata = {
  title: "Todo App"
};

interface TPropRootLayout {
  children: React.ReactNode;
}

export default function RootLayout({ children }: TPropRootLayout) {
  return (
    <html
      lang='en'
      className='bg-primary text-accent'>
      <body className={inter.className}>
        <Navbar />
        <RqProviders>
          <UserProvider>{children}</UserProvider>
        </RqProviders>
      </body>
    </html>
  );
}
