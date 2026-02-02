"use client";

type ErrorMessageProps = {
  error: Error;
  reset: () => void;
};

const ErrorMessage = ({ error, reset }: ErrorMessageProps) => {
  return (
    <>
      <p>Could not fetch note details. {error.message}</p>
      <button onClick={reset}>Try again</button>
    </>
  );
};

export default ErrorMessage;
