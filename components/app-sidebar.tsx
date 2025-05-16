"use client";

import type * as React from "react";
import { NAVIGATION_DATA } from "@/constants/navigation";
import { NavMain } from "@/components/navigation/nav-main";
import { NavUser } from "@/components/navigation/nav-user";
import { TeamSwitcher } from "@/components/navigation/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={NAVIGATION_DATA.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NAVIGATION_DATA.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={NAVIGATION_DATA.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
