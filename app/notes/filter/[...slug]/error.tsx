"use client";

type ErrorMessageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorMessage({ error, reset }: ErrorMessageProps) {
  return (
    <>
      <p>Could not fetch the list of notes. {error.message}</p>
      <button onClick={reset}>Try again</button>
    </>
  );
}
