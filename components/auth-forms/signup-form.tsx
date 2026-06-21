"use client";

import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import { sanitizeInput } from "@/utils/validation";
import { CheckCircle, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.push("/products");
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (
        !name.trim() ||
        !email.trim() ||
        !password.trim() ||
        !confirmPassword.trim()
      )
        throw new Error("Please fill in all fields");
      if (password !== confirmPassword)
        throw new Error("Passwords do not match");
      if (password.length < 6)
        throw new Error("Password must be at least 6 characters");
      await signup(
        sanitizeInput(email),
        sanitizeInput(password),
        sanitizeInput(name),
      );
      router.push("/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const iconClass =
    "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400";
  const inputClass =
    "pl-9 h-10 bg-neutral-50 border-neutral-200 focus:border-neutral-900 focus:ring-0 text-sm";
  const labelClass =
    "block text-xs font-medium uppercase tracking-wide text-neutral-500";

  return (
    <form onSubmit={handleSubmit} className='w-full space-y-5'>
      <div className='space-y-1'>
        <h1 className='text-xl font-semibold text-neutral-900'>
          Create account
        </h1>
        <p className='text-sm text-neutral-500'>
          Join PixelMart to start managing products
        </p>
      </div>

      <div className='space-y-4'>
        {[
          {
            id: "name",
            label: "Full name",
            type: "text",
            placeholder: "John Doe",
            value: name,
            set: setName,
            Icon: User,
          },
          {
            id: "email",
            label: "Email address",
            type: "email",
            placeholder: "you@example.com",
            value: email,
            set: setEmail,
            Icon: Mail,
          },
          {
            id: "password",
            label: "Password",
            type: "password",
            placeholder: "••••••••",
            value: password,
            set: setPassword,
            Icon: Lock,
          },
          {
            id: "confirmPassword",
            label: "Confirm password",
            type: "password",
            placeholder: "••••••••",
            value: confirmPassword,
            set: setConfirmPassword,
            Icon: CheckCircle,
          },
        ].map(({ id, label, type, placeholder, value, set, Icon }) => (
          <div key={id} className='space-y-1.5'>
            <label htmlFor={id} className={labelClass}>
              {label}
            </label>
            <div className='relative'>
              <Icon className={iconClass} />
              <Input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => set(e.target.value)}
                disabled={loading}
                className={inputClass}
              />
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className='rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600'>
          {error}
        </div>
      )}

      <Button
        type='submit'
        disabled={loading}
        className='w-full h-10 bg-neutral-900 hover:bg-neutral-700 text-white font-medium rounded-lg transition-colors disabled:opacity-40 text-sm'>
        {loading ? (
          <div className='flex items-center gap-2'>
            <LoadingSpinner size='sm' />
            <span>Creating account...</span>
          </div>
        ) : (
          "Create account"
        )}
      </Button>

      <div className='flex items-center gap-3'>
        <div className='flex-1 h-px bg-neutral-100' />
        <span className='text-xs text-neutral-400'>
          Already have an account?
        </span>
        <div className='flex-1 h-px bg-neutral-100' />
      </div>

      <Link
        href='/login'
        className='block w-full text-center py-2.5 px-4 border border-neutral-200 hover:border-neutral-400 text-neutral-700 hover:text-neutral-900 font-medium rounded-lg transition-colors text-sm'>
        Sign in
      </Link>
    </form>
  );
}
