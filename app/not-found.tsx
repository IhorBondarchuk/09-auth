import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found",
  description:
    "404 - Page not found. Sorry, the page you are looking for does not exist.",
  openGraph: {
    title: "Memo",
    description: "Welcome to Memo - web app for creating notes",
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

export default function NotFound() {
  return (
    <div>
      <h1 className="not-found">404 - Page not found</h1>
      <p className="not-found">
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
