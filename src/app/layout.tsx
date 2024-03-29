import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Sidebar from "@/components/sidebar/Sidebar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { UserProvider } from "@/contexts/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Аукціон",
    template: "%s | Аукціон",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${inter.className} min-w-[400px] h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <UserProvider>
            <main className="flex h-full">
              <Sidebar />
              <div className="flex flex-col justify-between items-center h-full max-w-fit m-auto p-5">
                {children}
                <Footer />
              </div>
            </main>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
