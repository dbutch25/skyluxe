"use client";

import React, { useState } from "react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setError(null);

        // Basic validation
        if (!formData.email.includes("@")) {
            setError("Please enter a valid email address.");
            setStatus("error");
            return;
        }

        if (!/^\d+$/.test(formData.number)) {
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

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
        }
    };


    return (
        <div className="container mx-auto py-10 px-4">
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto shadow-md rounded font-montserrat bg-primary-50 px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-primary-950 text-sm font-bold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-primary-950 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="number" className="block text-primary-950 text-sm font-bold mb-2">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        id="number"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-primary-950 text-sm font-bold mb-2">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-secondary-600 hover:bg-primary-800 hover:border-2 border-secondary-600 text-primary-50 font-bold py-2 px-4 rounded flex items-center justify-center gap-2"
                    disabled={status === "loading"}
                >
                    {status === "loading" && (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                    )}
                    {status === "loading" ? "Sending..." : "Send"}
                </button>

                {status === "success" && <p className="mt-4 text-green-500">Email sent successfully!</p>}
                {status === "error" && <p className="mt-4 text-red-500">Error: {error}</p>}
            </form>
        </div>
    );
}
