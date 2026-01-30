import React from "react";
import css from "./LayoutNotes.module.css";

type LayoutNotesProps = {
  readonly children: React.ReactNode;
  readonly sidebar: React.ReactNode;
};

export default function LayoutNotes({ children, sidebar }: LayoutNotesProps) {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}
