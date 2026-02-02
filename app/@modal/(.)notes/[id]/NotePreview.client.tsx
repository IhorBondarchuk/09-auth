"use client";

import { Note } from "@/types/note";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";
import { fetchNoteById } from "@/lib/api/clientApi";

export default function NotePreviewClient() {
  const router = useRouter();

  const onClose = () => router.back();

  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery<Note, Error>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={onClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data?.title}</h2>
            <span className={css.tag}>{data?.tag}</span>
          </div>
          <p className={css.content}>{data?.content}</p>
          <p className={css.date}>{data?.createdAt}</p>
        </div>
        <button onClick={onClose} type="button" className={css.backBtn}>
          Back
        </button>
      </div>
    </Modal>
  );
}
