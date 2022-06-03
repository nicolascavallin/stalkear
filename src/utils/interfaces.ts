import { User } from "firebase/auth";

export interface UserData {
  username: string;
  theme: Theme;
  createdAt: string;
  // links: Link[];
  // customTheme: CustomTheme;
}

export interface Link {
  id: string;
  title: string;
  url: string;
}

export type Theme = "default" | "dark" | "custom";

export interface CustomTheme {
  backgroundColor: string;
  fontFamily: string;
}
