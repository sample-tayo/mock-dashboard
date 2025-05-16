import {
  BookOpen,
  Package,
  Settings2,
  ShoppingCart,
  SquareTerminal,
  Users,
  TrendingUp,
} from "lucide-react";

export const NAVIGATION_DATA = {
  user: {
    name: "Bolaji Makinde",
    email: "bolaji_makinde@ymail.com",
    avatar: "/sample.jpg",
  },
  teams: [
    {
      name: "Mini Dashboard",
      logo: Package,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Products",
      url: "#",
      icon: Package,
      isActive: true,
      items: [
        {
          title: "All Products",
          url: "#",
        },
        {
          title: "Categories",
          url: "#",
        },
        {
          title: "Inventory",
          url: "#",
        },
      ],
    },
    {
      title: "Orders",
      url: "#",
      icon: ShoppingCart,
      items: [
        {
          title: "All Orders",
          url: "#",
        },
        {
          title: "Pending",
          url: "#",
        },
        {
          title: "Completed",
          url: "#",
        },
        {
          title: "Cancelled",
          url: "#",
        },
      ],
    },
    {
      title: "Customers",
      url: "#",
      icon: Users,
      items: [
        {
          title: "All Customers",
          url: "#",
        },
        {
          title: "VIP",
          url: "#",
        },
        {
          title: "Segments",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Getting Started",
          url: "#",
        },
        {
          title: "API Reference",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Integrations",
          url: "#",
        },
      ],
    },
  ],
};

export const PRODUCT_STATS = [
  {
    title: "Total Products",
    value: "254",
    description: "+12 from last month",
    icon: Package,
  },
  {
    title: "Total Orders",
    value: "1,429",
    description: "+8% from last month",
    icon: ShoppingCart,
  },
  {
    title: "Active Customers",
    value: "573",
    description: "+19% from last month",
    icon: Users,
  },
  {
    title: "Revenue",
    value: "$45,231.89",
    description: "+20.1% from last month",
    icon: TrendingUp,
  },
];
