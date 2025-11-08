import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Books API Documentation",
  description: "CRUD API for Books and Categories - CMPS312 Mobile App Dev Tutorial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
