import * as z from "zod";

export const loginSchema = z
  .object({
    identifier: z.string().min(1, {
      message: "Username or email is required",
    }),
    password: z.string().min(1, {
      message: "Password required",
    }),
  })
  .required();

export const registerSchema = z
  .object({
    username: z.string().min(3, {
      message: "Username must have at leat 3 characters",
    }),
    surname: z.string().min(3, {
      message: "Surname must have at leat 3 characters",
    }),
    firstname: z.string().min(3, {
      message: "Firstname must have at leat 3 characters",
    }),
    email: z.string().email({
      message: "Enter a valid email",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must have at least 8 characters",
      })
      .max(50)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%^&*])(?=.{8,})/, {
        message: "Password must have at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
      }),
  })
  .required();

export const forgotPasswordSchema = z
  .object({
    email: z.string().email({
      message: "Enter a valid email",
    }),
  })
  .required();

export const resetPasswordSchema = z
  .object({
    hashValue: z.string(),
    password: z
      .string()
      .min(8, {
        message: "Password must have at least 8 characters",
      })
      .max(50)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%^&*])(?=.{8,})/, {
        message: "Password must have at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
      }),
    confirmPassword: z.string().min(8, {
      message: "Password must have at least 8 characters",
    }),
  })
  .required()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const updateProfileSchema = z.object({
  surname: z.string(),
  firstname: z.string(),
  address: z.string(),
  date_of_birth: z.string(),
  description: z.string(),
});
