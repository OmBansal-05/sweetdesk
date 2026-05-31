export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "low stock" | "out of stock";
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  joined: string;
};

export type Order = {
  id: string;
  customer: string;
  items: number;
  total: number;
  status: "pending" | "in progress" | "ready" | "completed" | "cancelled";
  date: string;
};

export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  supplier: string;
};

export type DashboardStat = {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
};

export const dashboardStats: DashboardStat[] = [
  { label: "Today's Revenue", value: "$2,847", change: "+18% vs yesterday", trend: "up" },
  { label: "Orders Today", value: "24", change: "6 bulk gift boxes due", trend: "neutral" },
  { label: "Active Customers", value: "1,284", change: "+12 this week", trend: "up" },
  { label: "Low Stock Items", value: "3", change: "Needs attention", trend: "down" },
];

export const products: Product[] = [
  { id: "PRD-001", name: "Kaju Katli", category: "Burfi", price: 480.0, stock: 45, status: "active" },
  { id: "PRD-002", name: "Gulab Jamun", category: "Syrup Sweets", price: 320.0, stock: 8, status: "low stock" },
  { id: "PRD-003", name: "Rasgulla", category: "Syrup Sweets", price: 280.0, stock: 12, status: "active" },
  { id: "PRD-004", name: "Motichoor Ladoo", category: "Ladoo", price: 350.0, stock: 0, status: "out of stock" },
  { id: "PRD-005", name: "Milk Cake", category: "Milk Sweets", price: 420.0, stock: 6, status: "active" },
  { id: "PRD-006", name: "Soan Papdi", category: "Flaky Sweets", price: 240.0, stock: 22, status: "active" },
];

export const customers: Customer[] = [
  { id: "CUS-001", name: "Priya Sharma", email: "priya.sharma@email.com", phone: "+91 98765 43210", orders: 28, totalSpent: 8420.0, joined: "Jan 2024" },
  { id: "CUS-002", name: "Rahul Mehta", email: "rahul.mehta@email.com", phone: "+91 98765 43211", orders: 15, totalSpent: 5200.0, joined: "Mar 2024" },
  { id: "CUS-003", name: "Ananya Patel", email: "ananya.patel@email.com", phone: "+91 98765 43212", orders: 42, totalSpent: 13407.5, joined: "Nov 2023" },
  { id: "CUS-004", name: "Vikram Singh", email: "vikram.singh@email.com", phone: "+91 98765 43213", orders: 7, totalSpent: 1980.0, joined: "Aug 2024" },
  { id: "CUS-005", name: "Neha Gupta", email: "neha.gupta@email.com", phone: "+91 98765 43214", orders: 19, totalSpent: 6750.0, joined: "Feb 2024" },
];

export const orders: Order[] = [
  { id: "ORD-1042", customer: "Priya Sharma", items: 3, total: 1150.0, status: "in progress", date: "May 31, 2026" },
  { id: "ORD-1041", customer: "Ananya Patel", items: 1, total: 480.0, status: "ready", date: "May 31, 2026" },
  { id: "ORD-1040", customer: "Rahul Mehta", items: 5, total: 1680.0, status: "pending", date: "May 31, 2026" },
  { id: "ORD-1039", customer: "Vikram Singh", items: 2, total: 560.0, status: "completed", date: "May 30, 2026" },
  { id: "ORD-1038", customer: "Neha Gupta", items: 4, total: 1290.0, status: "completed", date: "May 30, 2026" },
  { id: "ORD-1037", customer: "Priya Sharma", items: 1, total: 350.0, status: "cancelled", date: "May 29, 2026" },
];

export const inventoryItems: InventoryItem[] = [
  { id: "INV-001", name: "Khoya (Mawa)", category: "Ingredients", quantity: 2, unit: "kg", reorderLevel: 5, supplier: "Dairy Fresh Suppliers" },
  { id: "INV-002", name: "Pure Ghee", category: "Ingredients", quantity: 8, unit: "kg", reorderLevel: 10, supplier: "Amul Distributors" },
  { id: "INV-003", name: "Cashew Nuts", category: "Ingredients", quantity: 3, unit: "kg", reorderLevel: 6, supplier: "Nut Bazaar" },
  { id: "INV-004", name: "Granulated Sugar", category: "Ingredients", quantity: 15, unit: "kg", reorderLevel: 8, supplier: "Local Wholesale Market" },
  { id: "INV-005", name: "Gift Boxes (500g)", category: "Packaging", quantity: 500, unit: "units", reorderLevel: 200, supplier: "PackPro India" },
  { id: "INV-006", name: "Rose Water", category: "Ingredients", quantity: 12, unit: "bottles", reorderLevel: 5, supplier: "Spice & Essence Co." },
];

export const shopSettings = {
  name: "SweetDesk Mithai House",
  email: "hello@sweetdesk.in",
  phone: "+91 22 4567 8900",
  address: "42 Chandni Chowk, Old Delhi, Delhi 110006",
  currency: "INR",
  timezone: "Asia/Kolkata",
  taxRate: 5,
};
