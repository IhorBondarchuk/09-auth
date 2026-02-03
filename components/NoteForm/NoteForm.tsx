"use client";
import css from "./NoteForm.module.css";
import React, { useId } from "react";
import type { CreateNote } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { TAGS } from "@/constants/tags";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api/clientApi";

export default function NoteForm() {
  const fieldId = useId();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleCancel = () => router.push("/notes/filter/all");

  const creationM = useMutation({
    mutationFn: async (values: CreateNote) => {
      await createNote(values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note created");
      clearDraft();
      handleCancel();
    },
    onError: (error) => {
      toast.error(error?.message ?? "Failed to create note");
    },
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (formData: FormData) => {
    const formValues = Object.fromEntries(formData);
    const newNote: CreateNote = {
      title: typeof formValues.title === "string" ? formValues.title : "",
      content: typeof formValues.content === "string" ? formValues.content : "",
      tag: typeof formValues.tag === "string" ? formValues.tag : "",
    };
    if (newNote.title === "" || newNote.content === "") {
      toast.error("Please enter all required fields of new note!");
      return;
    }
    creationM.mutate(newNote);
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          value={draft?.title || ""}
          onChange={handleChange}
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
          autoFocus
          maxLength={150}
          minLength={3}
          title="Please enter your title text"
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          value={draft?.content || ""}
          onChange={handleChange}
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          maxLength={1000}
          title="Please enter your note content text"
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          value={draft?.tag || "Todo"}
          onChange={handleChange}
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
        >
          {TAGS.map((TAG) => (
            <option key={`${fieldId}-tag-${TAG}`} value={`${TAG}`}>
              {TAG}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          onClick={handleCancel}
          type="button"
          className={css.cancelButton}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={
            creationM.isPending ||
            (draft?.title?.length ?? 0) < 3 ||
            !draft?.content
          }
          aria-busy={creationM.isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
}
