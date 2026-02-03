import { fetchNotes } from "@/lib/api/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type NotesByTagProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: NotesByTagProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] || "all";
  
  return {
    title: `Tag: ${tag}`,
    description: `Notes filtered by ${tag} tag`,
    openGraph: {
      title: "NoteHub",
      description: `Notes filtered by ${tag} tag`,
      url: `https://08-zustand-hazel-zeta.vercel.app/notes/filter/${tag}`,
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
}

export default async function NotesByTag({ params }: NotesByTagProps) {
  const { slug } = await params;

  const searchText = "";
  const tagParam = slug?.[0] || "all";
  const tag = tagParam === "all" ? undefined : tagParam;
  const currentPage = 1;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", currentPage, searchText, tag],
    queryFn: () => fetchNotes(searchText, currentPage, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
