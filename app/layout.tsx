import "./globals.css";
import { Inter } from "next/font/google";
import { SearchAnime } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WebbAnime",
  description: "Your Ultimate Anime Streaming Destination",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SearchAnime />
        {children}
      </body>
    </html>
  );
}
