"use client";

import { useEffect, useState } from "react";
import css from "./LayoutRegister.module.css";
import { useRouter } from "next/navigation";

type Props = {
  readonly children: React.ReactNode;
};

export default function LayoutRegister({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    router.refresh();
    queueMicrotask(() => setLoading(false));
  }, [router]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <section className={css.container}>
          <div className={css.registerWrapper}>{children}</div>
        </section>
      )}
    </>
  );
}
