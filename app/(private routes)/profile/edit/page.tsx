"use client";

import { useAuthStore } from "@/lib/store/authStore";
import css from "./EditProfilePage.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMe, updateMe, UpdateUserRequest } from "@/lib/api/clientApi";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import Image from "next/image";

export default function EditProfile() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(!user);

  const { email, username, avatar } = user || {};

  useEffect(() => {
    if (!user) {
      getMe()
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user, setUser]);

  if (loading) return <p>Loading...</p>;

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as UpdateUserRequest;

      const updatedFormValues = {
        ...formValues,
        email: email,
      };

      const res = await updateMe(updatedFormValues);
      if (res) {
        setUser(res);
        router.push("/profile");
      }
    } catch (err) {
      const error = err as AxiosError<{ error?: string }>;
      const message =
        error.response?.data?.error ??
        error.message ??
        "Oops... some error";
      setError(message);
      toast.error(message);
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={avatar?.trim() || "/avatar-default.svg"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form action={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              defaultValue={username}
              id="username"
              name="username"
              type="text"
              className={css.input}
            />
          </div>
          <p>
            Email: <strong>{email}</strong>
          </p>
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
          {error && <p className={css.error}>{error}</p>}
        </form>
      </div>
    </main>
  );
}
