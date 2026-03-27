import {
    LoginPayload,
    LoginResponse,
    MeResponse,
} from "@/features/auth/api/auth.types";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (payload.email.trim().toLowerCase() === "fail@fitmatch.com") {
    throw new Error("Email atau password tidak valid");
  }

  return {
    accessToken: "dummy-access-token",
    user: {
      id: "1",
      email: payload.email,
      name: "Fit Match User",
    },
  };
}

export async function getMe(): Promise<MeResponse> {
  await new Promise((resolve) => setTimeout(resolve, 700));

  return {
    user: {
      id: "1",
      email: "demo@fitmatch.com",
      name: "Fit Match User",
    },
  };
}
