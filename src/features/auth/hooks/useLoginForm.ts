import { router } from "expo-router";
import { useState } from "react";

import { login } from "@/features/auth/api/auth.api";
import { setAuth } from "@/features/auth/store/auth.slice";
import { tokenStorage } from "@/services/storage/tokenStorage";
import { useAppDispatch } from "@/store/hooks";

export function useLoginForm() {
  const dispatch = useAppDispatch();

  const [email, setEmailState] = useState("");
  const [password, setPasswordState] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isLoginDisabled = !email.trim() || !password.trim();

  const setEmail = (value: string) => {
    if (errorMessage) {
      setErrorMessage("");
    }

    setEmailState(value);
  };

  const setPassword = (value: string) => {
    if (errorMessage) {
      setErrorMessage("");
    }

    setPasswordState(value);
  };

  const handleSubmit = async () => {
    try {
      setErrorMessage("");
      setIsSubmitting(true);

      const response = await login({
        email,
        password,
      });

      await tokenStorage.setAuth({
        accessToken: response.accessToken,
        user: response.user,
      });

      dispatch(
        setAuth({
          accessToken: response.accessToken,
          user: response.user,
        }),
      );

      router.replace("/home");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Terjadi kesalahan saat login");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isSubmitting,
    isLoginDisabled,
    errorMessage,
    handleSubmit,
  };
}
