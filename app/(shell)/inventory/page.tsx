"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shell/page-header";
import { inventoryItems as initialInventory, type InventoryItem } from "@/lib/mock-data";

type FormState = {
  name: string;
  category: string;
  quantity: string;
  unit: string;
  supplier: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = { name: "", category: "", quantity: "", unit: "", supplier: "" };

function itemToForm(item: InventoryItem): FormState {
  return {
    name: item.name,
    category: item.category,
    quantity: String(item.quantity),
    unit: item.unit,
    supplier: item.supplier,
  };
}

function StockIndicator({ quantity, reorderLevel }: { quantity: number; reorderLevel: number }) {
  const percentage = Math.min((quantity / (reorderLevel * 2)) * 100, 100);
  const color =
    quantity <= reorderLevel ? "bg-rose-500" : quantity <= reorderLevel * 1.5 ? "bg-amber-500" : "bg-emerald-500";

  return (
    <div className="flex items-center gap-3">
      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
      <span className="text-sm text-slate-600">
        {quantity} / {reorderLevel * 2}
      </span>
    </div>
  );
}

function isLowStock(quantity: number, reorderLevel: number) {
  return quantity <= reorderLevel;
}

function nextInventoryId(items: InventoryItem[]) {
  const max = items.reduce((n, item) => {
    const num = parseInt(item.id.replace("INV-", ""), 10);
    return Number.isNaN(num) ? n : Math.max(n, num);
  }, 0);
  return `INV-${String(max + 1).padStart(3, "0")}`;
}

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Item name is required";
  if (!form.category.trim()) errors.category = "Category is required";
  const quantity = parseFloat(form.quantity);
  if (!form.quantity.trim() || Number.isNaN(quantity) || quantity < 0) {
    errors.quantity = "Enter a valid quantity (0 or more)";
  }
  if (!form.unit.trim()) errors.unit = "Unit is required";
  if (!form.supplier.trim()) errors.supplier = "Supplier is required";
  return errors;
}

export default function InventoryPage() {
  const [inventoryList, setInventoryList] = useState<InventoryItem[]>(initialInventory);
  const [search, setSearch] = useState("");
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const categoryOptions = useMemo(
    () => [...new Set(inventoryList.map((i) => i.category))],
    [inventoryList],
  );

  const unitOptions = useMemo(
    () => [...new Set(inventoryList.map((i) => i.unit))],
    [inventoryList],
  );

  const supplierOptions = useMemo(
    () => [...new Set(inventoryList.map((i) => i.supplier))],
    [inventoryList],
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return inventoryList.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query);
      const matchesLowStock = !lowStockOnly || isLowStock(item.quantity, item.reorderLevel);
      return matchesSearch && matchesLowStock;
    });
  }, [inventoryList, search, lowStockOnly]);

  const lowStockCount = inventoryList.filter((item) =>
    isLowStock(item.quantity, item.reorderLevel),
  ).length;

  function openModal() {
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
  }

  function openEditModal(item: InventoryItem) {
    setEditingId(item.id);
    setForm(itemToForm(item));
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

    const quantity = parseFloat(form.quantity);
    const fields = {
      name: form.name.trim(),
      category: form.category.trim(),
      quantity,
      unit: form.unit.trim(),
      supplier: form.supplier.trim(),
      reorderLevel: Math.max(5, Math.ceil(quantity / 2)),
    };

    if (editingId) {
      setInventoryList((prev) =>
        prev.map((item) => (item.id === editingId ? { ...item, ...fields } : item)),
      );
    } else {
      const newItem: InventoryItem = {
        id: nextInventoryId(inventoryList),
        ...fields,
      };
      setInventoryList((prev) => [...prev, newItem]);
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

  function handleDelete(item: InventoryItem) {
    const confirmed = window.confirm(
      `Delete "${item.name}"? This action cannot be undone.`,
    );
    if (!confirmed) return;

    setInventoryList((prev) => prev.filter((i) => i.id !== item.id));

    if (editingId === item.id) {
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
        title="Inventory"
        description="Monitor ingredients, supplies, and stock levels."
        action={
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center justify-center rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
          >
            Add item
          </button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total items</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{inventoryList.length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Low stock</p>
          <p className="mt-1 text-2xl font-bold text-rose-600">{lowStockCount}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Suppliers</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {new Set(inventoryList.map((i) => i.supplier)).size}
          </p>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="search"
            placeholder="Search by item name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
          />
        </div>
        <p className="text-sm text-slate-500">
          Showing <span className="font-semibold text-slate-900">{filtered.length}</span> of{" "}
          <span className="font-semibold text-slate-900">{inventoryList.length}</span> items
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setLowStockOnly(false)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            !lowStockOnly
              ? "bg-rose-600 text-white"
              : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
          }`}
        >
          All items
        </button>
        <button
          type="button"
          onClick={() => setLowStockOnly(true)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            lowStockOnly
              ? "bg-rose-600 text-white"
              : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
          }`}
        >
          Low stock only
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                <th className="px-5 py-3 font-medium">Item</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Stock level</th>
                <th className="px-5 py-3 font-medium">Unit</th>
                <th className="px-5 py-3 font-medium">Supplier</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-500">
                    No inventory items match your search.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-400">{item.id}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{item.category}</td>
                    <td className="px-5 py-4">
                      <StockIndicator quantity={item.quantity} reorderLevel={item.reorderLevel} />
                    </td>
                    <td className="px-5 py-4 text-slate-600">{item.unit}</td>
                    <td className="px-5 py-4 text-slate-600">{item.supplier}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          className="text-sm font-semibold text-rose-600 transition-colors hover:text-rose-700"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          className="text-sm font-semibold text-slate-500 transition-colors hover:text-rose-600"
                        >
                          Delete
                        </button>
                      </div>
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
              aria-labelledby="item-modal-title"
              className="w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <h2 id="item-modal-title" className="text-lg font-semibold text-slate-900">
                  {editingId ? "Edit Item" : "Add Item"}
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
                  <label htmlFor="item-name" className="block text-sm font-medium text-slate-700">
                    Item Name
                  </label>
                  <input
                    id="item-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="e.g. Khoya (Mawa)"
                    className={inputClass("name")}
                  />
                  {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="item-category" className="block text-sm font-medium text-slate-700">
                    Category
                  </label>
                  <input
                    id="item-category"
                    type="text"
                    list="category-options"
                    value={form.category}
                    onChange={(e) => updateField("category", e.target.value)}
                    placeholder="e.g. Ingredients"
                    className={inputClass("category")}
                  />
                  <datalist id="category-options">
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                  {errors.category && <p className="mt-1 text-xs text-rose-600">{errors.category}</p>}
                </div>

                <div>
                  <label htmlFor="item-quantity" className="block text-sm font-medium text-slate-700">
                    Quantity
                  </label>
                  <input
                    id="item-quantity"
                    type="number"
                    min="0"
                    step="1"
                    value={form.quantity}
                    onChange={(e) => updateField("quantity", e.target.value)}
                    placeholder="e.g. 10"
                    className={inputClass("quantity")}
                  />
                  {errors.quantity && <p className="mt-1 text-xs text-rose-600">{errors.quantity}</p>}
                </div>

                <div>
                  <label htmlFor="item-unit" className="block text-sm font-medium text-slate-700">
                    Unit
                  </label>
                  <input
                    id="item-unit"
                    type="text"
                    list="unit-options"
                    value={form.unit}
                    onChange={(e) => updateField("unit", e.target.value)}
                    placeholder="e.g. kg"
                    className={inputClass("unit")}
                  />
                  <datalist id="unit-options">
                    {unitOptions.map((unit) => (
                      <option key={unit} value={unit} />
                    ))}
                  </datalist>
                  {errors.unit && <p className="mt-1 text-xs text-rose-600">{errors.unit}</p>}
                </div>

                <div>
                  <label htmlFor="item-supplier" className="block text-sm font-medium text-slate-700">
                    Supplier
                  </label>
                  <input
                    id="item-supplier"
                    type="text"
                    list="supplier-options"
                    value={form.supplier}
                    onChange={(e) => updateField("supplier", e.target.value)}
                    placeholder="e.g. Dairy Fresh Suppliers"
                    className={inputClass("supplier")}
                  />
                  <datalist id="supplier-options">
                    {supplierOptions.map((supplier) => (
                      <option key={supplier} value={supplier} />
                    ))}
                  </datalist>
                  {errors.supplier && <p className="mt-1 text-xs text-rose-600">{errors.supplier}</p>}
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
                    {editingId ? "Save changes" : "Add item"}
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
