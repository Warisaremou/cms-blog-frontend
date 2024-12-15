import { forgotPasswordSchema, loginSchema, registerSchema } from "@/lib/validations/auth";
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
  address: string | null;
  avatar: string | null;
  date_of_birth: Date | null;
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

export type resetPasswordCredentials = {
  hashValue: string;
  password: string;
};

export type updateProfileCredentials = {
  surname: string;
  firstname: string;
  address: string;
  date_of_birth: Date;
};

export type updateUserRoleCredentials = {
  id_role: string;
};

// --------- POSTS TYPES --------- //
export type addPostCredentials = {
  image?: string;
  title: string;
  content: string;
  categories: string;
};

export interface Post {
  id_post: string;
  title: string;
  content: string;
  image: string;
  categories: string;
  created_at: Date;
  user: User;
}

export interface PostList {
  data: Post[];
  meta: Meta;
}
