"use client";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes, NotesHttpResponse } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
import css from "./Notes.module.css";
import Link from "next/link";

interface NotesClientProps {
  readonly tag: string | undefined;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const debouncedSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
      setCurrentPage(1);
    },
    500,
  );

  const { data: { notes = [], totalPages = 0 } = {} } = useQuery<
    NotesHttpResponse,
    Error
  >({
    queryKey: ["notes", currentPage, searchText, tag],
    queryFn: () => fetchNotes(searchText, currentPage, tag),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <div className={css.app}>
        <div className={css.toolbar}>
          <SearchBox search={searchText} onChange={debouncedSearch} />
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
          <Link className={css.button} href="/notes/action/create">
            Create note +
          </Link>
        </div>
        {notes.length > 0 && <NoteList notes={notes || []} />}
      </div>
      <Toaster position="top-center" reverseOrder={true} />
    </>
  );
}
