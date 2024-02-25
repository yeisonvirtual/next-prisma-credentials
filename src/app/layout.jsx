import { Navbar } from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Next Prisma Credentials",
  description: "Created with NextAuth and Prisma",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
