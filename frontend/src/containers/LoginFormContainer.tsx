'use client';

import React, { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { LoginForm } from "@/components/organisms/LoginForm";
import { setEmail, login } from "@/features/authSlice";

export const LoginFormContainer = () => {
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.auth.email);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login());
  };

  return (
    <LoginForm
      email={email}
      setEmail={(email) => dispatch(setEmail(email))}
      onSubmit={handleSubmit}
    />
  );
};
