"use client";

import * as React from "react";
import {
  CircleArrowRight,
  Command,
  LifeBuoy,
  Send,
  UserCircle2
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg"
  },
  navMain: [
    {
      title: "Active Students",
      url: "#",
      icon: UserCircle2,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "#"
        },
        {
          title: "Communications",
          url: "#"
        },
        {
          title: "Programmes",
          url: "#"
        },
        {
          title: "Finance",
          url: "#"
        }
      ]
    }
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send
    }
  ],
  intake: [
    {
      name: "Jan",
      url: "#",
      icon: CircleArrowRight
    },
    {
      name: "Feb",
      url: "#",
      icon: CircleArrowRight
    },
    {
      name: "May",
      url: "#",
      icon: CircleArrowRight
    },
    {
      name: "June",
      url: "#",
      icon: CircleArrowRight
    },
    {
      name: "Sept",
      url: "#",
      icon: CircleArrowRight
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    Student Management
                  </span>
                  <span className="truncate text-xs">UNITAR</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.intake} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
