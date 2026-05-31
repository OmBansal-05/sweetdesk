import Link from "next/link";
import { PageHeader } from "@/components/shell/page-header";
import { StatusBadge } from "@/components/shell/status-badge";
import {
  dashboardStats,
  inventoryItems,
  orders,
  products,
  shopSettings,
} from "@/lib/mock-data";

const INITIAL_STOCK = 50;
const TODAY = "May 31, 2026";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: shopSettings.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function DashboardPage() {
  const recentOrders = orders.slice(0, 5);
  const lowStock = inventoryItems.filter((item) => item.quantity <= item.reorderLevel);

  const topSelling = products
    .map((product) => ({
      ...product,
      unitsSold: INITIAL_STOCK - product.stock,
      revenue: product.price * (INITIAL_STOCK - product.stock),
    }))
    .sort((a, b) => b.unitsSold - a.unitsSold)
    .slice(0, 5);

  const maxUnitsSold = topSelling[0]?.unitsSold ?? 1;

  const revenueByCategory = Object.entries(
    products.reduce<Record<string, number>>((acc, product) => {
      const unitsSold = INITIAL_STOCK - product.stock;
      acc[product.category] = (acc[product.category] ?? 0) + product.price * unitsSold;
      return acc;
    }, {}),
  )
    .map(([category, revenue]) => ({ category, revenue }))
    .sort((a, b) => b.revenue - a.revenue);

  const maxCategoryRevenue = revenueByCategory[0]?.revenue ?? 1;

  const productionToday = products
    .filter((product) => product.status === "low stock" || product.status === "out of stock")
    .map((product) => ({
      name: product.name,
      batches: Math.max(10, INITIAL_STOCK - product.stock),
      status: product.status === "out of stock" ? "In progress" : "Scheduled",
    }));

  const todayOrders = orders.filter((order) => order.date === TODAY);
  const todayItems = todayOrders.reduce((sum, order) => sum + order.items, 0);
  const todayRevenue = todayOrders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => sum + order.total, 0);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your sweet shop performance today."
        action={
          <Link
            href="/orders"
            className="inline-flex items-center justify-center rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
          >
            View all orders
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{stat.value}</p>
            <p
              className={`mt-1 text-sm ${
                stat.trend === "up"
                  ? "text-emerald-600"
                  : stat.trend === "down"
                    ? "text-rose-600"
                    : "text-amber-600"
              }`}
            >
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
          Quick Actions
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Add Product",
              href: "/products",
              description: "Add a new sweet to your menu",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              ),
            },
            {
              label: "Create Order",
              href: "/orders",
              description: "Start a new customer order",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
              ),
            },
            {
              label: "Add Customer",
              href: "/customers",
              description: "Register a new customer",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z" />
              ),
            },
            {
              label: "Update Inventory",
              href: "/inventory",
              description: "Adjust stock and supplies",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              ),
            },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-rose-200 hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600 transition-colors group-hover:bg-rose-600 group-hover:text-white">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  {action.icon}
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-900">{action.label}</p>
                <p className="mt-0.5 text-sm text-slate-500">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-semibold text-slate-900">Top Selling Sweets</h2>
            <p className="mt-0.5 text-sm text-slate-500">By units sold today</p>
          </div>
          <ul className="divide-y divide-slate-100">
            {topSelling.map((product, index) => (
              <li key={product.id} className="px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-50 text-xs font-bold text-rose-600">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-slate-900">{product.name}</p>
                      <p className="text-xs text-slate-500">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">{product.unitsSold} sold</p>
                    <p className="text-xs text-slate-500">{formatCurrency(product.revenue)}</p>
                  </div>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-500 to-amber-500"
                    style={{ width: `${(product.unitsSold / maxUnitsSold) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-semibold text-slate-900">Today&apos;s Production</h2>
            <p className="mt-0.5 text-sm text-slate-500">
              {productionToday.length} sweets scheduled · {todayItems} order items today
            </p>
          </div>
          <ul className="divide-y divide-slate-100">
            {productionToday.map((item) => (
              <li key={item.name} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="font-medium text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.batches} kg batch</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    item.status === "In progress"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-slate-100 px-5 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Today&apos;s order revenue</span>
              <span className="font-semibold text-slate-900">{formatCurrency(todayRevenue)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2 xl:col-span-1">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-semibold text-slate-900">Revenue by Category</h2>
            <p className="mt-0.5 text-sm text-slate-500">Estimated from sales volume</p>
          </div>
          <ul className="divide-y divide-slate-100">
            {revenueByCategory.map((item) => (
              <li key={item.category} className="px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-slate-900">{item.category}</p>
                  <p className="font-semibold text-slate-900">{formatCurrency(item.revenue)}</p>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-rose-500"
                    style={{ width: `${(item.revenue / maxCategoryRevenue) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="font-semibold text-slate-900">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[540px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-500">
                    <th className="px-5 py-3 font-medium">Order</th>
                    <th className="px-5 py-3 font-medium">Customer</th>
                    <th className="px-5 py-3 font-medium">Total</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50">
                      <td className="px-5 py-3 font-medium text-slate-900">{order.id}</td>
                      <td className="px-5 py-3 text-slate-600">{order.customer}</td>
                      <td className="px-5 py-3 text-slate-600">{formatCurrency(order.total)}</td>
                      <td className="px-5 py-3">
                        <StatusBadge status={order.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="font-semibold text-slate-900">Low Stock Alerts</h2>
            </div>
            <ul className="divide-y divide-slate-100">
              {lowStock.map((item) => (
                <li key={item.id} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500">
                      {item.quantity} {item.unit} left
                    </p>
                  </div>
                  <span className="text-xs font-medium text-rose-600">
                    Reorder at {item.reorderLevel}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-slate-100 px-5 py-3">
              <Link href="/inventory" className="text-sm font-medium text-rose-600 hover:text-rose-700">
                Manage inventory →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
