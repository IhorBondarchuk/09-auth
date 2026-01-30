import Link from "next/link";
import css from "./SidebarNotes.module.css";
import { TAGS } from "@/constants/tags";

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href={"/notes/filter/all"} className={css.menuLink}>All notes</Link>
      </li>
      {TAGS.map((tag) => (
        <li className={css.menuItem} key={`id_${tag}`}>
          <Link className={css.menuLink} href={`/notes/filter/${tag}`}>{tag}</Link>
        </li>
      ))}
    </ul>
  );
};
