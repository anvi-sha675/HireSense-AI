import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/common/field-error";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-confidence-500/10 text-confidence-500">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-bold tracking-tight">
          Check your inbox
        </h1>
        <p className="mt-2 text-sm text-[rgb(var(--fg-muted))]">
          We sent a reset link to{" "}
          <span className="font-medium text-[rgb(var(--fg))]">
            {getValues("email")}
          </span>
          .
        </p>
        <Button
          className="mt-8 w-full"
          variant="secondary"
          onClick={() => navigate("/otp-verification")}
        >
          Enter code instead
        </Button>
        <Link
          to="/login"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-signal-500 hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        to="/login"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--fg-muted))] hover:text-signal-500"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </Link>
      <h1 className="font-display text-2xl font-bold tracking-tight">
        Forgot your password?
      </h1>
      <p className="mt-1.5 text-sm text-[rgb(var(--fg-muted))]">
        Enter the email on your account and we'll send a reset link.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgb(var(--fg-muted))]" />
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              className="pl-9"
              error={!!errors.email}
              {...register("email")}
            />
          </div>
          <FieldError message={errors.email?.message} />
        </div>

        <Button type="submit" className="w-full" loading={isSubmitting}>
          Send reset link
        </Button>
      </form>
    </motion.div>
  );
}
