import { useEffect, useState } from "react";

import { getMe } from "@/features/auth/api/auth.api";
import { AuthUser } from "@/features/auth/api/auth.types";

export function useMe() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMe = async () => {
      try {
        setErrorMessage("");
        setIsLoading(true);

        const response = await getMe();
        setUser(response.user);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Gagal mengambil data profile");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMe();
  }, []);

  return {
    user,
    isLoading,
    errorMessage,
  };
}
