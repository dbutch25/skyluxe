"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, authClient } from "@/lib/auth-client";
import Image from "next/image";

type Step = "credentials" | "totp";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCredentials = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn.email({
      email,
      password,
      callbackURL: "/admin",
    });

    if (result.error) {
      // Check if 2FA is required
      if (result.error.message?.includes("two_factor")) {
        setStep("totp");
        setLoading(false);
        return;
      }
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    window.location.href = "/admin";
  };

  const handleTotp = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await authClient.twoFactor.verifyTotp({
      code: totpCode,
    });

    if (result.error) {
      setError("Invalid code. Please try again.");
      setLoading(false);
      return;
    }

    window.location.href = "/admin";

  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Image
            src="/images/Skyluxe_Logo.png"
            alt="Skyluxe Roofing"
            width={200}
            height={80}
            style={{ height: "auto" }}
            className="brightness-0 invert"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {step === "credentials" ? (
            <>
              <h1 className="text-2xl font-julius text-primary-950 mb-6 text-center">
                Admin Login
              </h1>

              <form onSubmit={handleCredentials} className="space-y-4">
                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 font-montserrat text-sm"
                    placeholder="admin@skyluxeroofing.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 font-montserrat text-sm"
                    placeholder="••••••••"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm font-montserrat">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gray-800 text-white py-2.5 rounded-lg font-montserrat font-medium hover:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-julius text-primary-950 mb-2 text-center">
                Two-Factor Auth
              </h1>
              <p className="text-sm text-gray-500 font-montserrat text-center mb-6">
                Enter the 6-digit code from your authenticator app
              </p>

              <form onSubmit={handleTotp} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={totpCode}
                    onChange={(e) =>
                      setTotpCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    required
                    autoComplete="one-time-code"
                    inputMode="numeric"
                    maxLength={6}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest font-montserrat focus:outline-none focus:ring-2 focus:ring-secondary-500"
                    placeholder="000000"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm font-montserrat text-center">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || totpCode.length !== 6}
                  className="w-full bg-gray-800 text-white py-2.5 rounded-lg font-montserrat font-medium hover:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Verifying..." : "Verify"}
                </button>

                <button
                  type="button"
                  onClick={() => { setStep("credentials"); setError(""); }}
                  className="w-full text-sm text-gray-400 hover:text-gray-600 font-montserrat transition-colors"
                >
                  ← Back to login
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
