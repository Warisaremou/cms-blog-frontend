import api from "@/lib/axios-instance";
import { updateProfileCredentials } from "@/types";

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
