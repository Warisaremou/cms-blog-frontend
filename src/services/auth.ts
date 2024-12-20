import api from "@/lib/axios-instance";
import {
  forgotPasswordCredentials,
  loginCredentials,
  registerCredentials,
  resetPasswordCredentials,
  updateProfileCredentials,
} from "@/types";

export const createAccount = async (payload: registerCredentials) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};

export const login = async (payload: loginCredentials) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

export const forgotPassword = async (payload: forgotPasswordCredentials) => {
  const response = await api.post("/auth/forgot-password", payload);
  return response.data;
};

export const resetPassword = async (payload: resetPasswordCredentials) => {
  const response = await api.post("/auth/reset-password", payload);
  return response.data;
};

export const getUserData = async () => {
  const response = await api.get("/auth/me").then((res) => res);
  return response.data;
};

export const updateUserAvatar = async ({ image }: { image: File }) => {
  const form = new FormData();
  if (image) form.append("image", image);

  const response = await api
    .patch("/auth/avatar", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res);
  return response.data;
};

export const updateUserProfile = async (data: updateProfileCredentials) => {
  const response = await api.patch("/auth", data).then((res) => res);
  return response.data;
};

export const deleteAccount = async () => {
  const response = await api.delete("/auth").then((res) => res);
  return response.data;
};
