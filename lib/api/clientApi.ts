"use client";

import { CreateNote, Note } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export type CheckSessionRequest = {
  success: boolean;
};

export type RegisterRequest = {
  email: string;
  password: string;
};
export type LoginRequest = {
  email: string;
  password: string;
};
export type UpdateUserRequest = {
  email?: string;
  username: string;
};

export const fetchNotes = async (
  searchText: string,
  page: number,
  tag?: string,
): Promise<NotesHttpResponse> => {
  const params = {
    ...(searchText !== "" && { search: searchText }),
    tag,
    page,
    perPage: 12,
  };
  const { data } = await nextServer.get<NotesHttpResponse>("notes", {
    params,
  });
  return data;
};

export const createNote = async (newNote: CreateNote): Promise<Note> => {
  const { data } = await nextServer.post<Note>("notes", newNote);
  return data;
};

export const deleteNote = async (id: Note["id"]): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`notes/${id}`);
  return data;
};

export const fetchNoteById = async (id: Note["id"]): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`notes/${id}`);
  return data;
};

export const register = async (credentials: RegisterRequest): Promise<User> => {
  const { data } = await nextServer.post<User>("auth/register", credentials);
  return data;
};

export const login = async (credentials: LoginRequest): Promise<User> => {
  const { data } = await nextServer.post<User>("auth/login", credentials);
  return data;
};

export const checkSession = async (): Promise<CheckSessionRequest> => {
  const { data } = await nextServer.get<CheckSessionRequest>("auth/session");
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("users/me");
  return data;
};

export const updateMe = async (
  payload: UpdateUserRequest,
): Promise<User> => {
  const { data } = await nextServer.patch<User>("users/me", payload);
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("auth/logout");
};
