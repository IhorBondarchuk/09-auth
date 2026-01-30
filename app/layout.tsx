import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "NoteHub - Manage Your Notes",
  description:
    "A modern note-taking application to organize your thoughts and tasks.",
  openGraph: {
    title: "NoteHub - Manage Your Notes",
    description:
      "A modern note-taking application to organize your thoughts and tasks",
    url: "https://08-zustand-hazel-zeta.vercel.app",
    images: [
      {
        url: "/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Poster with logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
