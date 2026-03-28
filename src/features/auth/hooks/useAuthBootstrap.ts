import { useEffect, useState } from "react";

import { setAuth } from "@/features/auth/store/auth.slice";
import { tokenStorage } from "@/services/storage/tokenStorage";
import { useAppDispatch } from "@/store/hooks";

export function useAuthBootstrap() {
  const dispatch = useAppDispatch();
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const storedAuth = await tokenStorage.getAuth();

        if (storedAuth) {
          dispatch(
            setAuth({
              accessToken: storedAuth.accessToken,
              user: storedAuth.user,
            }),
          );
        }
      } catch (error) {
        console.log("bootstrap auth error:", error);
      } finally {
        setIsBootstrapping(false);
      }
    };

    bootstrap();
  }, [dispatch]);

  return {
    isBootstrapping,
  };
}
