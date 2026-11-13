export type NavIconName = "home" | "wallet" | "list" | "send" | "settings";

export const navItems: { href: string; label: string; icon: NavIconName }[] = [
  { href: "/dashboard", label: "Dashboard", icon: "home" },
  { href: "/accounts", label: "Accounts", icon: "wallet" },
  { href: "/transactions", label: "Transactions", icon: "list" },
  { href: "/transfers", label: "Transfers", icon: "send" },
  { href: "/settings", label: "Settings", icon: "settings" },
];
