"use client";

import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

type Status = "idle" | "loading" | "success" | "error";

const SERVICE_OPTIONS = [
  "ICI Roofing",
  "Residential Roofing",
  "Architectural Cladding",
  "Waterproofing",
  "Repairs & Maintenance",
  "Restoration",
  "Not sure — need advice",
];

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-montserrat text-xs font-semibold text-primary-950 uppercase tracking-[0.12em] mb-2"
    >
      {children}
    </label>
  );
}

const inputClass =
  "w-full bg-white border border-gray-200 focus:border-secondary-600 focus:outline-none font-montserrat text-sm text-primary-950 placeholder:text-gray-300 px-4 py-3.5 transition-colors duration-200";

export default function RequestForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    serviceType: "",
    scopeOfWork: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    if (!/^\d+$/.test(formData.number.replace(/[\s\-().+]/g, ""))) {
      setError("Please enter a valid phone number.");
      setStatus("error");
      return;
    }

    try {
      const response = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Something went wrong");
      }

      setStatus("success");
      setFormData({ name: "", email: "", number: "", serviceType: "", scopeOfWork: "" });
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-start justify-center py-12">
        <div className="w-12 h-12 bg-secondary-800 flex items-center justify-center mb-6">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" aria-hidden="true">
            <polyline points="4,12 9,17 20,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-julius text-primary-950 text-2xl mb-3">Quote Request Received</h3>
        <p className="font-montserrat text-gray-500 text-sm leading-relaxed max-w-sm mb-2">
          We&apos;ll review your project details and follow up within one business day with questions or a proposal.
        </p>
        <p className="font-montserrat text-gray-400 text-xs">
          For urgent requests call{" "}
          <a href="tel:+16476295893" className="text-secondary-700 hover:underline">
            (647) 629 5893
          </a>
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 font-montserrat text-xs text-secondary-700 uppercase tracking-widest border-b border-secondary-600 hover:text-secondary-900 transition-colors duration-300"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" noValidate>
      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <FieldLabel htmlFor="name">Full Name *</FieldLabel>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel htmlFor="number">Phone Number *</FieldLabel>
          <input
            type="tel"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
            placeholder="(647) 000 0000"
            className={inputClass}
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <FieldLabel htmlFor="email">Email Address *</FieldLabel>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel htmlFor="serviceType">Service Required *</FieldLabel>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
            className={`${inputClass} cursor-pointer appearance-none`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23374151' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 1rem center",
              paddingRight: "2.5rem",
            }}
          >
            <option value="" disabled>Select a service</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Scope */}
      <div className="mb-7">
        <FieldLabel htmlFor="scopeOfWork">Project Description *</FieldLabel>
        <textarea
          id="scopeOfWork"
          name="scopeOfWork"
          value={formData.scopeOfWork}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Describe your project — building type, approximate size, current issues, timeline, and any other relevant details..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && error && (
        <p className="font-montserrat text-red-600 text-sm mb-4">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="group inline-flex items-center gap-3 bg-primary-950 hover:bg-secondary-800 text-white font-montserrat text-xs font-medium uppercase tracking-widest px-8 py-4 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Sending...
          </>
        ) : (
          <>
            Submit Quote Request
            <FaArrowRight size={10} className="transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
