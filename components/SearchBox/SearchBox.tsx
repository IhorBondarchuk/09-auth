import { ChangeEvent } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  readonly search: string;
  readonly onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ search = "", onChange }: SearchBoxProps) {
  return (
    <input
      type="text"
      className={css.input}
      defaultValue={search}
      placeholder="Search notes"
      onChange={onChange}
    />
  );
};
