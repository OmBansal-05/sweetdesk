"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shell/page-header";
import { customers as initialCustomers, type Customer } from "@/lib/mock-data";

type FormState = {
  name: string;
  email: string;
  phone: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = { name: "", email: "", phone: "" };

function customerToForm(customer: Customer): FormState {
  return {
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
  };
}

function nextCustomerId(items: Customer[]) {
  const max = items.reduce((n, c) => {
    const num = parseInt(c.id.replace("CUS-", ""), 10);
    return Number.isNaN(num) ? n : Math.max(n, num);
  }, 0);
  return `CUS-${String(max + 1).padStart(3, "0")}`;
}

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address";
  }
  if (!form.phone.trim()) errors.phone = "Phone is required";
  return errors;
}

export default function CustomersPage() {
  const [customerList, setCustomerList] = useState<Customer[]>(initialCustomers);
  const [nameSearch, setNameSearch] = useState("");
  const [emailSearch, setEmailSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const filtered = useMemo(() => {
    const nameQuery = nameSearch.trim().toLowerCase();
    const emailQuery = emailSearch.trim().toLowerCase();

    return customerList.filter((customer) => {
      const matchesName = !nameQuery || customer.name.toLowerCase().includes(nameQuery);
      const matchesEmail = !emailQuery || customer.email.toLowerCase().includes(emailQuery);
      return matchesName && matchesEmail;
    });
  }, [customerList, nameSearch, emailSearch]);

  function openModal() {
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
  }

  function openEditModal(customer: Customer) {
    setEditingId(customer.id);
    setForm(customerToForm(customer));
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
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    };

    if (editingId) {
      setCustomerList((prev) =>
        prev.map((c) => (c.id === editingId ? { ...c, ...fields } : c)),
      );
    } else {
      const newCustomer: Customer = {
        id: nextCustomerId(customerList),
        ...fields,
        orders: 0,
        totalSpent: 0,
        joined: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      };
      setCustomerList((prev) => [...prev, newCustomer]);
    }

    closeModal();
  }

  function updateField(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function handleDelete(customer: Customer) {
    const confirmed = window.confirm(
      `Delete "${customer.name}"? This action cannot be undone.`,
    );
    if (!confirmed) return;

    setCustomerList((prev) => prev.filter((c) => c.id !== customer.id));

    if (editingId === customer.id) {
      closeModal();
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
        title="Customers"
        description="View customer profiles, order history, and loyalty details."
        action={
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center justify-center rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
          >
            Add customer
          </button>
        }
      />

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-xs">
            <label htmlFor="name-search" className="mb-1 block text-xs font-medium text-slate-500">
              Customer name
            </label>
            <input
              id="name-search"
              type="search"
              placeholder="e.g. Priya Sharma"
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>
          <div className="relative flex-1 sm:max-w-xs">
            <label htmlFor="email-search" className="mb-1 block text-xs font-medium text-slate-500">
              Email
            </label>
            <input
              id="email-search"
              type="search"
              placeholder="e.g. priya.sharma@email.com"
              value={emailSearch}
              onChange={(e) => setEmailSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>
        </div>
        <p className="text-sm text-slate-500">
          Showing <span className="font-semibold text-slate-900">{filtered.length}</span> of{" "}
          <span className="font-semibold text-slate-900">{customerList.length}</span> customers
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-12 text-center text-slate-500 shadow-sm">
          No customers match your search.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((customer) => (
            <div
              key={customer.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-sm font-semibold text-rose-600">
                  {customer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <span className="text-xs text-slate-400">{customer.id}</span>
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{customer.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{customer.email}</p>
              <p className="text-sm text-slate-500">{customer.phone}</p>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
                <div>
                  <p className="text-slate-500">Orders</p>
                  <p className="font-semibold text-slate-900">{customer.orders}</p>
                </div>
                <div>
                  <p className="text-slate-500">Total spent</p>
                  <p className="font-semibold text-slate-900">₹{customer.totalSpent.toFixed(0)}</p>
                </div>
                <div>
                  <p className="text-slate-500">Joined</p>
                  <p className="font-semibold text-slate-900">{customer.joined}</p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <button
                  type="button"
                  onClick={() => openEditModal(customer)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
                >
                  Edit customer
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(customer)}
                  className="w-full rounded-lg border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600 transition-colors hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
                >
                  Delete customer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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
              aria-labelledby="customer-modal-title"
              className="w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <h2 id="customer-modal-title" className="text-lg font-semibold text-slate-900">
                  {editingId ? "Edit Customer" : "Add Customer"}
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
                  <label htmlFor="customer-name" className="block text-sm font-medium text-slate-700">
                    Name
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className={inputClass("name")}
                  />
                  {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="customer-email" className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    id="customer-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="e.g. priya.sharma@email.com"
                    className={inputClass("email")}
                  />
                  {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="customer-phone" className="block text-sm font-medium text-slate-700">
                    Phone
                  </label>
                  <input
                    id="customer-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className={inputClass("phone")}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>}
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
                    {editingId ? "Save changes" : "Add customer"}
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
