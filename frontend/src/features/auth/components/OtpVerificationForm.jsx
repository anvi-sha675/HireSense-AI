import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";

const LENGTH = 6;

export function OtpVerificationForm() {
  const [digits, setDigits] = useState(Array(LENGTH).fill(""));
  const [submitting, setSubmitting] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const code = digits.join("");

  const handleChange = (index, value) => {
    const clean = value.replace(/[^0-9]/g, "").slice(-1);
    const next = [...digits];
    next[index] = clean;
    setDigits(next);
    if (clean && index < LENGTH - 1) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, LENGTH);
    if (!pasted) return;
    e.preventDefault();
    setDigits(Array.from({ length: LENGTH }, (_, i) => pasted[i] || ""));
    inputsRef.current[Math.min(pasted.length, LENGTH - 1)]?.focus();
  };

  const handleVerify = async () => {
    if (code.length !== LENGTH) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    toast.success("Email verified");
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        to="/register"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--fg-muted))] hover:text-signal-500"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </Link>
      <h1 className="font-display text-2xl font-bold tracking-tight">
        Verify your email
      </h1>
      <p className="mt-1.5 text-sm text-[rgb(var(--fg-muted))]">
        Enter the 6-digit code we just sent you.
      </p>

      <div className="mt-8 flex justify-between gap-2">
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            inputMode="numeric"
            maxLength={1}
            className={cn(
              "h-14 w-12 rounded-sm border bg-[rgb(var(--surface))] text-center font-display text-xl font-semibold outline-none transition-colors sm:w-14",
              "border-[rgb(var(--border))] focus:border-signal-500 focus:ring-2 focus:ring-signal-500/20",
            )}
          />
        ))}
      </div>

      <Button
        className="mt-8 w-full"
        onClick={handleVerify}
        loading={submitting}
        disabled={code.length !== LENGTH}
      >
        Verify code
      </Button>

      <p className="mt-6 text-center text-sm text-[rgb(var(--fg-muted))]">
        Didn't get a code?{" "}
        <button
          className="font-medium text-signal-500 hover:underline"
          onClick={() => toast.success("Code resent")}
        >
          Resend
        </button>
      </p>
    </motion.div>
  );
}
