"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { ShieldCheck, ShieldOff, Copy, Check, Loader2 } from "lucide-react";

type Step = "idle" | "setup" | "verify" | "done";

interface TotpSetupData {
  totpURI: string;
  backupCodes?: string[];
}

export default function SecuritySettingsPage() {
  const { data: session } = authClient.useSession();
  const [step, setStep] = useState<Step>("idle");
  const [setupData, setSetupData] = useState<TotpSetupData | null>(null);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const twoFactorEnabled =
    (session?.user as { twoFactorEnabled?: boolean })?.twoFactorEnabled ?? false;

  // ── Step 1: request TOTP setup from better-auth ───────────────────────────
  const handleEnable = async () => {
    if (!password) { setError("Password is required"); return; }
    setLoading(true);
    setError("");

    try {
      const result = await authClient.twoFactor.enable({ password });

      // better-auth returns the data directly on result.data
      // The shape is: { totpURI: string, backupCodes: string[] }
      const data = result?.data as TotpSetupData | undefined;

      if (!data?.totpURI) {
        console.error("2FA enable response:", result);
        setError(
          result?.error?.message ??
          "Failed to initialise 2FA. Check your password and try again."
        );
        setLoading(false);
        return;
      }

      setSetupData(data);
      setStep("setup");
    } catch (e) {
      console.error(e);
      setError("Unexpected error. Please try again.");
    }

    setLoading(false);
  };

  // ── Step 2: verify the TOTP code to confirm setup ─────────────────────────
  const handleVerify = async () => {
    if (code.length !== 6) return;
    setLoading(true);
    setError("");

    try {
      const result = await authClient.twoFactor.verifyTotp({ code });
      if (result?.error) {
        setError("Invalid code — please try again.");
        setLoading(false);
        return;
      }
      setStep("done");
    } catch (e) {
      console.error(e);
      setError("Verification failed. Please try again.");
    }

    setLoading(false);
  };

  const handleDisable = async () => {
    if (!confirm("Are you sure you want to disable 2FA?")) return;
    setLoading(true);
    setError("");
    try {
      const result = await authClient.twoFactor.disable({ password });
      if (result?.error) {
        setError(result.error.message ?? "Failed to disable 2FA.");
      } else {
        setPassword("");
      }
    } catch (e) {
      setError("Failed to disable 2FA.");
    }
    setLoading(false);
  };

  const copySecret = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Extract the raw secret from the TOTP URI for manual entry
  // URI format: otpauth://totp/Skyluxe%20CMS:email?secret=BASE32SECRET&...
  const rawSecret = setupData?.totpURI
    ? new URLSearchParams(setupData.totpURI.split("?")[1]).get("secret") ?? ""
    : "";

  // Build QR code URL
  const qrUrl = setupData?.totpURI
    ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(setupData.totpURI)}`
    : "";

  return (
    <div className="max-w-lg">
      <h1 className="text-3xl font-julius text-primary-950 mb-2">Security</h1>
      <p className="text-gray-500 font-montserrat text-sm mb-8">
        Manage two-factor authentication for your admin account.
      </p>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          {twoFactorEnabled || step === "done" ? (
            <ShieldCheck size={24} className="text-green-500" />
          ) : (
            <ShieldOff size={24} className="text-gray-400" />
          )}
          <div>
            <h2 className="font-julius text-primary-950">
              Two-Factor Authentication
            </h2>
            <p className="text-xs font-montserrat text-gray-400">
              {twoFactorEnabled || step === "done"
                ? "Enabled — your account is protected"
                : "Not enabled"}
            </p>
          </div>
        </div>

        {/* ── IDLE: offer to enable ── */}
        {step === "idle" && !twoFactorEnabled && (
          <div className="space-y-4">
            <p className="text-sm font-montserrat text-gray-600">
              Add an extra layer of security using an authenticator app
              (Google Authenticator, Authy, 1Password, etc.)
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                Confirm your password to continue
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleEnable()}
                className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat"
                placeholder="••••••••"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm font-montserrat">{error}</p>
            )}
            <button
              onClick={handleEnable}
              disabled={loading || !password}
              className="w-full py-2.5 bg-primary-950 text-white rounded-lg font-montserrat text-sm font-medium hover:bg-primary-800 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Setting up..." : "Enable 2FA"}
            </button>
          </div>
        )}

        {/* ── SETUP: show QR code ── */}
        {step === "setup" && setupData && (
          <div className="space-y-5">
            <p className="text-sm font-montserrat text-gray-600">
              <strong>Step 1:</strong> Scan the QR code below with your
              authenticator app.
            </p>

            {/* QR Code */}
            <div className="flex justify-center p-4 bg-gray-50 rounded-xl border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrUrl}
                alt="2FA QR Code"
                width={200}
                height={200}
                className="rounded"
              />
            </div>

            {/* Manual secret */}
            {rawSecret && (
              <div className="bg-gray-50 rounded-lg p-3 border">
                <p className="text-xs text-gray-400 font-montserrat mb-1">
                  Can&apos;t scan? Enter this key manually in your app:
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-sm font-mono text-primary-950 break-all select-all">
                    {rawSecret}
                  </code>
                  <button
                    onClick={() => copySecret(rawSecret)}
                    className="text-gray-400 hover:text-primary-950 transition-colors shrink-0"
                    title="Copy secret"
                  >
                    {copied ? (
                      <Check size={16} className="text-green-500" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Backup codes */}
            {setupData.backupCodes && setupData.backupCodes.length > 0 && (
              <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                <p className="text-xs font-montserrat text-amber-700 mb-2 font-medium">
                  ⚠ Save these backup codes somewhere safe. Each can only be
                  used once.
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {setupData.backupCodes.map((code, i) => (
                    <code key={i} className="text-xs font-mono text-amber-900">
                      {code}
                    </code>
                  ))}
                </div>
              </div>
            )}

            {/* Verify code */}
            <div>
              <p className="text-sm font-montserrat text-gray-600 mb-2">
                <strong>Step 2:</strong> Enter the 6-digit code from your app
                to confirm setup.
              </p>
              <input
                type="text"
                value={code}
                onChange={(e) =>
                  setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                inputMode="numeric"
                maxLength={6}
                autoFocus
                className="w-full px-3 py-3 border rounded-lg text-center text-2xl tracking-widest font-montserrat focus:outline-none focus:ring-2 focus:ring-secondary-500"
                placeholder="000000"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm font-montserrat">{error}</p>
            )}

            <button
              onClick={handleVerify}
              disabled={loading || code.length !== 6}
              className="w-full py-2.5 bg-primary-950 text-white rounded-lg font-montserrat text-sm font-medium hover:bg-primary-800 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Verifying..." : "Confirm & Enable 2FA"}
            </button>

            <button
              type="button"
              onClick={() => { setStep("idle"); setSetupData(null); setCode(""); setError(""); }}
              className="w-full text-sm text-gray-400 hover:text-gray-600 font-montserrat transition-colors"
            >
              Cancel
            </button>
          </div>
        )}

        {/* ── DONE ── */}
        {step === "done" && (
          <div className="text-center py-6">
            <ShieldCheck size={52} className="text-green-500 mx-auto mb-3" />
            <p className="font-julius text-primary-950 text-xl mb-1">
              2FA Enabled!
            </p>
            <p className="text-sm font-montserrat text-gray-500">
              Your account is now protected. You&apos;ll be asked for a code on
              next login.
            </p>
          </div>
        )}

        {/* ── Already enabled: offer to disable ── */}
        {twoFactorEnabled && step === "idle" && (
          <div className="space-y-4 mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm font-montserrat text-gray-500">
              To disable 2FA, confirm your password below.
            </p>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm font-montserrat"
                placeholder="Your password"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm font-montserrat">{error}</p>
            )}
            <button
              onClick={handleDisable}
              disabled={loading || !password}
              className="w-full py-2.5 bg-red-500 text-white rounded-lg font-montserrat text-sm font-medium hover:bg-red-600 disabled:opacity-50 transition-colors"
            >
              {loading ? "Disabling..." : "Disable 2FA"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}