import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  updateProfileSchema,
} from "@/lib/validations/auth";
import { commentSchema } from "@/lib/validations/comment";
import { addPostSchema } from "@/lib/validations/post";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

export interface NavItem {
  title: string;
  href: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type Meta = {
  page: number;
  per_page: number;
};

// --------- AUTH TYPES --------- //
export interface User {
  id_user: string;
  username: string;
  surname: string;
  firstname: string;
  email: string;
  address: string;
  avatar: string | null;
  date_of_birth: undefined | string;
  description: string;
}
export interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  userData: User;
}

export type registerCredentials = z.infer<typeof registerSchema>;

export type loginCredentials = z.infer<typeof loginSchema>;

export type forgotPasswordCredentials = z.infer<typeof forgotPasswordSchema>;

export type resetPasswordFormCredentials = z.infer<typeof resetPasswordSchema>;

export type resetPasswordCredentials = {
  hashValue: string;
  password: string;
};

export type updateProfileCredentials = z.infer<typeof updateProfileSchema>;

export type updateUserRoleCredentials = {
  id_role: string;
};

// --------- POSTS TYPES --------- //
export type addPostCredentials = z.infer<typeof addPostSchema>;

export interface Post {
  id_post: string;
  image: string | null;
  title: string;
  content: string;
  categories: Category[];
  user: User;
  created_at: Date;
}

export interface PostList {
  data: Post[];
  meta: Meta;
}

// --------- CATEGORIES TYPES --------- //
export interface Category {
  id_category: string;
  name: string;
}

export interface CategoryList {
  data: Category[];
}

// --------- COMMENTS TYPES --------- //
export type Comment = z.infer<typeof commentSchema>;

export interface CommentData {
  id_comment: string;
  content: string;
  created_at: Date;
  id_user: string;
}
