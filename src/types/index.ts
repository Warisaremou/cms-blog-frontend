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

// --------- AUTH TYPES --------- //
export type registerCredentials = {
  username: string;
  surname: string;
  firstname: string;
  email: string;
  password: string;
};

export type loginCredentials = {
  identifier: string;
  password: string;
};

export type forgotPasswordCredentials = {
  email: string;
};

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
