import { Metadata } from "next";
import css from "./Profile.Page.module.css";
import { getMe } from "@/lib/api/serverApi";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  const { email, username, avatar } = await getMe();
  return {
    title: `Profile: ${username}`,
    description: `Email: ${email}`,
    openGraph: {
      title: `Profile: ${username}`,
      description: `Email: ${email}`,
      url: `http://localhost:3000`,
      images: [
        {
          url: `${avatar}`,
          width: 1200,
          height: 630,
          alt: "Poster with logo",
        },
      ],
    },
  };
}

export default async function Profile() {
  const { email, username, avatar } = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={avatar || "/avatar-default.svg"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>
            Username: <strong>{username}</strong>
          </p>
          <p>
            Email: <strong>{email}</strong>
          </p>
        </div>
      </div>
    </main>
  );
}
