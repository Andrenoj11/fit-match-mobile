export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  user: AuthUser;
};

export type MeResponse = {
  user: AuthUser;
};
