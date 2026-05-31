"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shell/page-header";
import { shopSettings as initialShopSettings } from "@/lib/mock-data";

type ShopForm = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

type FormErrors = Partial<Record<keyof ShopForm, string>>;

function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="font-semibold text-slate-900">{title}</h2>
        <p className="mt-0.5 text-sm text-slate-500">{description}</p>
      </div>
      <div className="space-y-4 p-5">{children}</div>
    </div>
  );
}

function validateShopForm(form: ShopForm): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Shop name is required";
  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address";
  }
  if (!form.phone.trim()) errors.phone = "Phone is required";
  if (!form.address.trim()) errors.address = "Address is required";
  return errors;
}

export default function SettingsPage() {
  const [shop, setShop] = useState<ShopForm>({
    name: initialShopSettings.name,
    email: initialShopSettings.email,
    phone: initialShopSettings.phone,
    address: initialShopSettings.address,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [saved, setSaved] = useState(false);

  const regional = initialShopSettings;

  function updateField(field: keyof ShopForm, value: string) {
    setShop((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function handleSave() {
    const validation = validateShopForm(shop);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setSaved(false);
      return;
    }

    setShop({
      name: shop.name.trim(),
      email: shop.email.trim(),
      phone: shop.phone.trim(),
      address: shop.address.trim(),
    });
    setErrors({});
    setSaved(true);
  }

  const inputClass = (field: keyof ShopForm) =>
    `mt-1.5 w-full rounded-lg border px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 ${
      errors[field]
        ? "border-rose-300 focus:border-rose-300 focus:ring-rose-500/20"
        : "border-slate-200 focus:border-rose-300 focus:ring-rose-500/20"
    }`;

  return (
    <>
      <PageHeader
        title="Settings"
        description="Configure your shop details and preferences."
      />

      <div className="mx-auto max-w-3xl space-y-6">
        <SettingsSection title="Shop information" description="Basic details about your sweet shop.">
          <div>
            <label htmlFor="shop-name" className="block text-sm font-medium text-slate-700">
              Shop name
            </label>
            <input
              id="shop-name"
              type="text"
              value={shop.name}
              onChange={(e) => updateField("name", e.target.value)}
              className={inputClass("name")}
            />
            {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="shop-email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="shop-email"
              type="email"
              value={shop.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={inputClass("email")}
            />
            {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="shop-phone" className="block text-sm font-medium text-slate-700">
              Phone
            </label>
            <input
              id="shop-phone"
              type="tel"
              value={shop.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className={inputClass("phone")}
            />
            {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="shop-address" className="block text-sm font-medium text-slate-700">
              Address
            </label>
            <textarea
              id="shop-address"
              value={shop.address}
              onChange={(e) => updateField("address", e.target.value)}
              rows={2}
              className={inputClass("address")}
            />
            {errors.address && <p className="mt-1 text-xs text-rose-600">{errors.address}</p>}
          </div>
        </SettingsSection>

        <SettingsSection title="Regional settings" description="Currency, timezone, and tax configuration.">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Currency</label>
              <input
                type="text"
                value={regional.currency}
                readOnly
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Timezone</label>
              <input
                type="text"
                value={regional.timezone}
                readOnly
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Tax rate (%)</label>
            <input
              type="text"
              value={regional.taxRate}
              readOnly
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
            />
          </div>
        </SettingsSection>

        <SettingsSection title="Notifications" description="Choose how you receive alerts.">
          {[
            { label: "Low stock alerts", enabled: true },
            { label: "New order notifications", enabled: true },
            { label: "Daily sales summary", enabled: false },
            { label: "Customer review alerts", enabled: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-sm text-slate-700">{item.label}</span>
              <button
                type="button"
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  item.enabled ? "bg-rose-600" : "bg-slate-200"
                }`}
                aria-label={`Toggle ${item.label}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    item.enabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </SettingsSection>

        <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:justify-end">
          {saved && (
            <p className="text-sm font-medium text-emerald-600">Changes saved successfully.</p>
          )}
          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
          >
            Save changes
          </button>
        </div>
      </div>
    </>
  );
}
