import type { LucideIcon } from "lucide-react";

export interface IUser {
  name: string;
  email: string;
  avatar: string;
}

export interface ITeam {
  name: string;
  logo: LucideIcon;
  plan: string;
}

export interface INavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

export interface IProject {
  name: string;
  url: string;
  icon: LucideIcon;
}

export interface INavigationData {
  user: IUser;
  teams: ITeam[];
  navMain: INavItem[];
  projects: IProject[];
}
