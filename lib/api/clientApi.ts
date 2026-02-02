"use client";

import { CreateNote, Note } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export type RegisterRequest = {
  email: string;
  password: string;
};
export type LoginRequest = {
  email: string;
  password: string;
};
export type updateUserRequest = {
  email?: string;
  username: string;
};

export type CheckSessionRequest = {
  success: boolean;
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
  const { data } = await nextServer.get<NotesHttpResponse>("/notes", {
    params,
  });
  return data;
};

export const createNote = async (newNote: CreateNote): Promise<Note> => {
  const { data } = await nextServer.post<Note>("/notes", newNote);
  return data;
};

export const deleteNote = async (id: Note["id"]): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
};

export const fetchNoteById = async (id: Note["id"]): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
};
export const register = async (data: RegisterRequest) => {
  const response = await nextServer.post<User>("/auth/register", data);
  return response.data;
};

export const login = async (data: LoginRequest) => {
  const response = await nextServer.post<User>("/auth/login", data);
  return response.data;
};
export const checkSession = async () => {
  const { data } = await nextServer.get<CheckSessionRequest>("/auth/session");
  return data;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("users/me");
  return data;
};

export const updateMe = async (data: updateUserRequest) => {
  const response = await nextServer.patch<User>("users/me", data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};
