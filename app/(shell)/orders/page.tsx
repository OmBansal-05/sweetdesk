"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shell/page-header";
import { StatusBadge } from "@/components/shell/status-badge";
import { orders as initialOrders, type Order } from "@/lib/mock-data";

type OrderStatus = Order["status"];

type FormState = {
  customer: string;
  items: string;
  total: string;
  status: OrderStatus;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const statusOptions: { label: string; value: OrderStatus }[] = [
  { label: "Pending", value: "pending" },
  { label: "In progress", value: "in progress" },
  { label: "Ready", value: "ready" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const filterOptions = ["All", "Pending", "In progress", "Ready", "Completed"] as const;

const emptyForm: FormState = {
  customer: "",
  items: "",
  total: "",
  status: "pending",
};

function orderToForm(order: Order): FormState {
  return {
    customer: order.customer,
    items: String(order.items),
    total: String(order.total),
    status: order.status,
  };
}

function nextOrderId(items: Order[]) {
  const max = items.reduce((n, o) => {
    const num = parseInt(o.id.replace("ORD-", ""), 10);
    return Number.isNaN(num) ? n : Math.max(n, num);
  }, 0);
  return `ORD-${max + 1}`;
}

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.customer.trim()) errors.customer = "Customer name is required";
  const items = parseInt(form.items, 10);
  if (!form.items.trim() || Number.isNaN(items) || items < 1) {
    errors.items = "Enter a valid item count (1 or more)";
  }
  const total = parseFloat(form.total);
  if (!form.total.trim() || Number.isNaN(total) || total <= 0) {
    errors.total = "Enter a valid total amount greater than 0";
  }
  return errors;
}

function filterLabelToStatus(filter: string): OrderStatus | null {
  const match = statusOptions.find((s) => s.label === filter);
  return match?.value ?? null;
}

export default function OrdersPage() {
  const [orderList, setOrderList] = useState<Order[]>(initialOrders);
  const [orderIdSearch, setOrderIdSearch] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const filtered = useMemo(() => {
    const orderQuery = orderIdSearch.trim().toLowerCase();
    const customerQuery = customerSearch.trim().toLowerCase();
    const statusValue = filterLabelToStatus(statusFilter);

    return orderList.filter((order) => {
      const matchesOrderId = !orderQuery || order.id.toLowerCase().includes(orderQuery);
      const matchesCustomer =
        !customerQuery || order.customer.toLowerCase().includes(customerQuery);
      const matchesStatus = !statusValue || order.status === statusValue;
      return matchesOrderId && matchesCustomer && matchesStatus;
    });
  }, [orderList, orderIdSearch, customerSearch, statusFilter]);

  function openModal() {
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
  }

  function openEditModal(order: Order) {
    setEditingId(order.id);
    setForm(orderToForm(order));
    setErrors({});
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validation = validateForm(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    const fields = {
      customer: form.customer.trim(),
      items: parseInt(form.items, 10),
      total: parseFloat(form.total),
      status: form.status,
    };

    if (editingId) {
      setOrderList((prev) =>
        prev.map((o) => (o.id === editingId ? { ...o, ...fields } : o)),
      );
    } else {
      const newOrder: Order = {
        id: nextOrderId(orderList),
        ...fields,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
      setOrderList((prev) => [newOrder, ...prev]);
    }

    closeModal();
  }

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  const inputClass = (field: keyof FormState) =>
    `mt-1.5 w-full rounded-lg border px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 ${
      errors[field]
        ? "border-rose-300 focus:border-rose-300 focus:ring-rose-500/20"
        : "border-slate-200 focus:border-rose-300 focus:ring-rose-500/20"
    }`;

  return (
    <>
      <PageHeader
        title="Orders"
        description="Track and manage all customer orders."
        action={
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center justify-center rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
          >
            Create order
          </button>
        }
      />

      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-xs">
            <label htmlFor="order-id-search" className="mb-1 block text-xs font-medium text-slate-500">
              Order ID
            </label>
            <input
              id="order-id-search"
              type="search"
              placeholder="e.g. ORD-1042"
              value={orderIdSearch}
              onChange={(e) => setOrderIdSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>
          <div className="relative flex-1 sm:max-w-xs">
            <label htmlFor="customer-search" className="mb-1 block text-xs font-medium text-slate-500">
              Customer name
            </label>
            <input
              id="customer-search"
              type="search"
              placeholder="e.g. Priya Sharma"
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>
        </div>
        <p className="text-sm text-slate-500">
          Showing <span className="font-semibold text-slate-900">{filtered.length}</span> of{" "}
          <span className="font-semibold text-slate-900">{orderList.length}</span> orders
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setStatusFilter(filter)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              statusFilter === filter
                ? "bg-rose-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                <th className="px-5 py-3 font-medium">Order ID</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Items</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-500">
                    No orders match your search.
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4 font-medium text-slate-900">{order.id}</td>
                    <td className="px-5 py-4 text-slate-600">{order.customer}</td>
                    <td className="px-5 py-4 text-slate-600">{order.items}</td>
                    <td className="px-5 py-4 text-slate-600">{order.date}</td>
                    <td className="px-5 py-4 font-medium text-slate-900">
                      ₹{order.total.toFixed(0)}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => openEditModal(order)}
                        className="text-sm font-semibold text-rose-600 transition-colors hover:text-rose-700"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="order-modal-title"
              className="w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <h2 id="order-modal-title" className="text-lg font-semibold text-slate-900">
                  {editingId ? "Edit Order" : "Create Order"}
                </h2>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  aria-label="Close modal"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 p-5">
                <div>
                  <label htmlFor="order-customer" className="block text-sm font-medium text-slate-700">
                    Customer Name
                  </label>
                  <input
                    id="order-customer"
                    type="text"
                    value={form.customer}
                    onChange={(e) => updateField("customer", e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className={inputClass("customer")}
                  />
                  {errors.customer && <p className="mt-1 text-xs text-rose-600">{errors.customer}</p>}
                </div>

                <div>
                  <label htmlFor="order-items" className="block text-sm font-medium text-slate-700">
                    Item Count
                  </label>
                  <input
                    id="order-items"
                    type="number"
                    min="1"
                    step="1"
                    value={form.items}
                    onChange={(e) => updateField("items", e.target.value)}
                    placeholder="e.g. 3"
                    className={inputClass("items")}
                  />
                  {errors.items && <p className="mt-1 text-xs text-rose-600">{errors.items}</p>}
                </div>

                <div>
                  <label htmlFor="order-total" className="block text-sm font-medium text-slate-700">
                    Total Amount (₹)
                  </label>
                  <input
                    id="order-total"
                    type="number"
                    min="0"
                    step="1"
                    value={form.total}
                    onChange={(e) => updateField("total", e.target.value)}
                    placeholder="e.g. 1150"
                    className={inputClass("total")}
                  />
                  {errors.total && <p className="mt-1 text-xs text-rose-600">{errors.total}</p>}
                </div>

                <div>
                  <label htmlFor="order-status" className="block text-sm font-medium text-slate-700">
                    Status
                  </label>
                  <select
                    id="order-status"
                    value={form.status}
                    onChange={(e) => updateField("status", e.target.value as OrderStatus)}
                    className={inputClass("status")}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
                  >
                    {editingId ? "Save changes" : "Create order"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
