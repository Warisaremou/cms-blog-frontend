import api from "@/lib/axios-instance";
import {
  forgotPasswordCredentials,
  loginCredentials,
  registerCredentials,
  resetPasswordCredentials,
  updateProfileCredentials,
  updateUserRoleCredentials,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

// --------------- KEYS --------------- //
const AUTH_KEYS = {
  REGISTER: ["register"],
  LOGIN: ["login"],
  FORGOT_PASSWORD: ["forgot-password"],
  RESET_PASSWORD: ["reset-password"],
  ME: ["me"],
  USERS: ["users"],
  UPDATE_PROFILE: ["update-profile"],
  UPDATE_AVATAR: ["update-avatar"],
  UPDATE_USER_ROLE: (id_user: string) => ["update-user-role", id_user],
  DELETE_ACCOUNT: ["delete-account"],
};

// Register query handler
const useRegister = () => {
  return useMutation({
    mutationKey: AUTH_KEYS.REGISTER,
    mutationFn: (credentials: registerCredentials) =>
      api.post("/auth/register", credentials).then((response) => response.data),
  });
};

// Login query handler
const useLogin = () => {
  return useMutation({
    mutationKey: AUTH_KEYS.LOGIN,
    mutationFn: (credentials: loginCredentials) =>
      api.post("/auth/login", credentials).then((response) => response.data),
  });
};

// Forgot Password query handler
const useForgotPassword = () => {
  return useMutation({
    mutationKey: AUTH_KEYS.FORGOT_PASSWORD,
    mutationFn: (credentials: forgotPasswordCredentials) =>
      api.post("/auth/forgot-password", credentials).then((response) => response.data),
  });
};

// Reset Password query handler
const useResetPassword = () => {
  return useMutation({
    mutationKey: AUTH_KEYS.RESET_PASSWORD,
    mutationFn: (credentials: resetPasswordCredentials) =>
      api.post("/auth/reset-password", credentials).then((response) => response.data),
  });
};

// Me query handler
const useMe = (token: boolean) => {
  return useQuery({
    queryKey: AUTH_KEYS.ME,
    queryFn: () => api.get("/auth/me").then((response) => response.data),
    enabled: token,
  });
};

// Users query handler
const useUsers = (token: boolean) => {
  return useQuery({
    queryKey: AUTH_KEYS.USERS,
    queryFn: () => api.get("/auth/users"),
    enabled: token,
  });
};

// Update Profile query handler
const useUpdateProfile = () => {
  return useMutation({
    mutationKey: AUTH_KEYS.UPDATE_PROFILE,
    mutationFn: (credentials: updateProfileCredentials) =>
      api.patch("/auth", credentials).then((response) => response.data),
  });
};

// Update Avatar query handler
const useUpdateAvatar = () => {
  return useMutation({
    mutationKey: AUTH_KEYS.UPDATE_AVATAR,
    mutationFn: (credentials: updateProfileCredentials) =>
      api.patch("/auth/avatar", credentials).then((response) => response.data),
  });
};

// Update User Role query handler
const useUpdateUserRole = (id_user: string) => {
  return useMutation({
    mutationKey: AUTH_KEYS.UPDATE_USER_ROLE(id_user),
    mutationFn: (credentials: updateUserRoleCredentials) =>
      api.patch(`/auth/user-role/${id_user}`, credentials).then((response) => response.data),
  });
};

// Delete Account query handler
const useDeleteAccount = () => {
  return useMutation({
    mutationKey: AUTH_KEYS.DELETE_ACCOUNT,
    mutationFn: () => api.delete("/auth").then((response) => response.data),
  });
};

export {
  AUTH_KEYS,
  useDeleteAccount,
  useForgotPassword,
  useLogin,
  useMe,
  useRegister,
  useResetPassword,
  useUpdateAvatar,
  useUpdateProfile,
  useUpdateUserRole,
  useUsers,
};
