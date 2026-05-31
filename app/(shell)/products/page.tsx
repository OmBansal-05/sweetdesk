"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shell/page-header";
import { StatusBadge } from "@/components/shell/status-badge";
import { products as initialProducts, type Product } from "@/lib/mock-data";

type SortField = "name" | "price" | "stock";
type SortDir = "asc" | "desc";

type FormState = {
  name: string;
  category: string;
  price: string;
  stock: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = { name: "", category: "", price: "", stock: "" };

function productToForm(product: Product): FormState {
  return {
    name: product.name,
    category: product.category,
    price: String(product.price),
    stock: String(product.stock),
  };
}

function getStatus(stock: number): Product["status"] {
  if (stock === 0) return "out of stock";
  if (stock <= 10) return "low stock";
  return "active";
}

function nextProductId(items: Product[]) {
  const max = items.reduce((n, p) => {
    const num = parseInt(p.id.replace("PRD-", ""), 10);
    return Number.isNaN(num) ? n : Math.max(n, num);
  }, 0);
  return `PRD-${String(max + 1).padStart(3, "0")}`;
}

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.category.trim()) errors.category = "Category is required";
  const price = parseFloat(form.price);
  if (!form.price.trim() || Number.isNaN(price) || price <= 0) {
    errors.price = "Enter a valid price greater than 0";
  }
  const stock = parseInt(form.stock, 10);
  if (!form.stock.trim() || Number.isNaN(stock) || stock < 0) {
    errors.stock = "Enter a valid stock amount (0 or more)";
  }
  return errors;
}

export default function ProductsPage() {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const selected = useMemo(
    () => productList.find((p) => p.id === selectedId) ?? null,
    [productList, selectedId],
  );

  const categories = useMemo(
    () => ["All", ...new Set(productList.map((p) => p.category))],
    [productList],
  );

  const categoryOptions = useMemo(
    () => [...new Set(productList.map((p) => p.category))],
    [productList],
  );

  function toggleSort(field: SortField) {
    if (sortBy === field) {
      setSortDir((dir) => (dir === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDir(field === "name" ? "asc" : "desc");
    }
  }

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = productList.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.id.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });

    return result.sort((a, b) => {
      let cmp = 0;
      if (sortBy === "name") cmp = a.name.localeCompare(b.name);
      else if (sortBy === "price") cmp = a.price - b.price;
      else cmp = a.stock - b.stock;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [productList, search, category, sortBy, sortDir]);

  function openModal() {
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
  }

  function openEditModal(product: Product) {
    setEditingId(product.id);
    setForm(productToForm(product));
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

    const stock = parseInt(form.stock, 10);
    const updatedFields = {
      name: form.name.trim(),
      category: form.category.trim(),
      price: parseFloat(form.price),
      stock,
      status: getStatus(stock),
    };

    if (editingId) {
      setProductList((prev) =>
        prev.map((p) => (p.id === editingId ? { ...p, ...updatedFields } : p)),
      );
    } else {
      const newProduct: Product = {
        id: nextProductId(productList),
        ...updatedFields,
      };
      setProductList((prev) => [...prev, newProduct]);
      setSelectedId(newProduct.id);
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

  function SortButton({ field, label }: { field: SortField; label: string }) {
    const active = sortBy === field;
    return (
      <button
        type="button"
        onClick={() => toggleSort(field)}
        className={`inline-flex items-center gap-1 font-medium transition-colors ${
          active ? "text-rose-600" : "text-slate-500 hover:text-slate-700"
        }`}
      >
        {label}
        {active && (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            {sortDir === "asc" ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            )}
          </svg>
        )}
      </button>
    );
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
        title="Products"
        description="Manage your menu items, pricing, and availability."
        action={
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center justify-center rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
          >
            Add product
          </button>
        }
      />

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
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
          />
        </div>
        <p className="text-sm text-slate-500">
          Showing <span className="font-semibold text-slate-900">{filtered.length}</span> of{" "}
          <span className="font-semibold text-slate-900">{productList.length}</span> products
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              category === cat
                ? "bg-rose-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                  <th className="px-5 py-3">
                    <SortButton field="name" label="Product" />
                  </th>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3">
                    <SortButton field="price" label="Price" />
                  </th>
                  <th className="px-5 py-3">
                    <SortButton field="stock" label="Stock" />
                  </th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-slate-500">
                      No products match your search.
                    </td>
                  </tr>
                ) : (
                  filtered.map((product) => (
                    <tr
                      key={product.id}
                      onClick={() => setSelectedId(selectedId === product.id ? null : product.id)}
                      className={`cursor-pointer transition-colors hover:bg-slate-50 ${
                        selectedId === product.id ? "bg-rose-50 hover:bg-rose-50" : ""
                      }`}
                    >
                      <td className="px-5 py-4">
                        <p className="font-medium text-slate-900">{product.name}</p>
                        <p className="text-xs text-slate-400">{product.id}</p>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{product.category}</td>
                      <td className="px-5 py-4 font-medium text-slate-900">
                        ₹{product.price.toFixed(0)}
                      </td>
                      <td className="px-5 py-4 text-slate-600">{product.stock}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={product.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selected && (
          <>
            <div
              className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
              onClick={() => setSelectedId(null)}
              aria-hidden="true"
            />
            <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-slate-200 bg-white shadow-xl lg:static lg:z-auto lg:shrink-0 lg:shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <h2 className="font-semibold text-slate-900">Product Details</h2>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  aria-label="Close panel"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{selected.id}</p>
                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Product name</dt>
                    <dd className="mt-1 text-lg font-semibold text-slate-900">{selected.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Category</dt>
                    <dd className="mt-1 text-slate-900">{selected.category}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Price</dt>
                    <dd className="mt-1 text-slate-900">₹{selected.price.toFixed(0)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Stock</dt>
                    <dd className="mt-1 text-slate-900">{selected.stock} units</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Status</dt>
                    <dd className="mt-2">
                      <StatusBadge status={selected.status} />
                    </dd>
                  </div>
                </dl>
                <button
                  type="button"
                  onClick={() => openEditModal(selected)}
                  className="mt-6 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
                >
                  Edit product
                </button>
              </div>
            </aside>
          </>
        )}
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
              aria-labelledby="product-modal-title"
              className="w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <h2 id="product-modal-title" className="text-lg font-semibold text-slate-900">
                  {editingId ? "Edit Product" : "Add Product"}
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
                  <label htmlFor="product-name" className="block text-sm font-medium text-slate-700">
                    Name
                  </label>
                  <input
                    id="product-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="e.g. Kaju Katli"
                    className={inputClass("name")}
                  />
                  {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="product-category" className="block text-sm font-medium text-slate-700">
                    Category
                  </label>
                  <input
                    id="product-category"
                    type="text"
                    list="category-options"
                    value={form.category}
                    onChange={(e) => updateField("category", e.target.value)}
                    placeholder="e.g. Burfi"
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
                  <label htmlFor="product-price" className="block text-sm font-medium text-slate-700">
                    Price (₹)
                  </label>
                  <input
                    id="product-price"
                    type="number"
                    min="0"
                    step="1"
                    value={form.price}
                    onChange={(e) => updateField("price", e.target.value)}
                    placeholder="e.g. 480"
                    className={inputClass("price")}
                  />
                  {errors.price && <p className="mt-1 text-xs text-rose-600">{errors.price}</p>}
                </div>

                <div>
                  <label htmlFor="product-stock" className="block text-sm font-medium text-slate-700">
                    Stock
                  </label>
                  <input
                    id="product-stock"
                    type="number"
                    min="0"
                    step="1"
                    value={form.stock}
                    onChange={(e) => updateField("stock", e.target.value)}
                    placeholder="e.g. 25"
                    className={inputClass("stock")}
                  />
                  {errors.stock && <p className="mt-1 text-xs text-rose-600">{errors.stock}</p>}
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
                    {editingId ? "Save changes" : "Add product"}
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
