import React, { FormEvent } from "react";

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Login
      </button>
    </form>
  );
};
