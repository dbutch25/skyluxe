"use client";

import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

type Status = "idle" | "loading" | "success" | "error";

// ─── Shared field components ──────────────────────────────────────────────────

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

// ─── Form ─────────────────────────────────────────────────────────────────────

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Something went wrong");
      }

      setStatus("success");
      setFormData({ name: "", email: "", number: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-start justify-center h-full py-12">
        <div className="w-12 h-12 bg-secondary-800 flex items-center justify-center mb-6">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" aria-hidden="true">
            <polyline points="4,12 9,17 20,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-julius text-primary-950 text-2xl mb-3">Message Received</h3>
        <p className="font-montserrat text-gray-500 text-sm leading-relaxed max-w-sm">
          Thanks for reaching out. A member of our team will follow up within one business day.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 font-montserrat text-xs text-secondary-700 uppercase tracking-widest border-b border-secondary-600 hover:text-secondary-900 transition-colors duration-300"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="plausible-event-name=ContactForm w-full"
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        {/* Name */}
        <div>
          <FieldLabel htmlFor="name">Full Name *</FieldLabel>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Mark Goncalves"
            className={inputClass}
          />
        </div>

        {/* Phone */}
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

      {/* Email */}
      <div className="mb-5">
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

      {/* Message */}
      <div className="mb-7">
        <FieldLabel htmlFor="message">Message *</FieldLabel>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Tell us how we can help..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Error */}
      {status === "error" && error && (
        <p className="font-montserrat text-red-600 text-sm mb-4">{error}</p>
      )}

      {/* Submit */}
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
            Send Message
            <FaArrowRight size={10} className="transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
