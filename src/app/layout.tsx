import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "a little something for Akanksha Jiiii 🎀",
  description: "A tiny, thoughtful corner of the internet. Made just because.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
