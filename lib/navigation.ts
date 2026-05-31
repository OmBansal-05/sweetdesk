export type NavItem = {
  label: string;
  href: string;
  icon: "dashboard" | "products" | "customers" | "orders" | "inventory" | "settings";
};

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Products", href: "/products", icon: "products" },
  { label: "Customers", href: "/customers", icon: "customers" },
  { label: "Orders", href: "/orders", icon: "orders" },
  { label: "Inventory", href: "/inventory", icon: "inventory" },
  { label: "Settings", href: "/settings", icon: "settings" },
];
