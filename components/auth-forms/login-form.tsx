"use client";

import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!email.trim() || !password.trim())
        throw new Error("Please fill in all fields");
      await login(email.trim(), password.trim());
      router.push("/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full space-y-5'>
      {/* Header */}
      <div className='space-y-1'>
        <h1 className='text-xl font-semibold text-neutral-900'>Welcome back</h1>
        <p className='text-sm text-neutral-500'>
          Sign in to your PixelMart account
        </p>
      </div>

      {/* Fields */}
      <div className='space-y-4'>
        <div className='space-y-1.5'>
          <label
            htmlFor='email'
            className='block text-xs font-medium uppercase tracking-wide text-neutral-500'>
            Email address
          </label>
          <Input
            id='email'
            type='email'
            placeholder='you@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className='h-10 bg-neutral-50 border-neutral-200 focus:border-neutral-900 focus:ring-0 text-sm'
          />
        </div>

        <div className='space-y-1.5'>
          <label
            htmlFor='password'
            className='block text-xs font-medium uppercase tracking-wide text-neutral-500'>
            Password
          </label>
          <Input
            id='password'
            type='password'
            placeholder='••••••••'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className='h-10 bg-neutral-50 border-neutral-200 focus:border-neutral-900 focus:ring-0 text-sm'
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className='rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600'>
          {error}
        </div>
      )}

      {/* Submit */}
      <Button
        type='submit'
        disabled={loading}
        className='w-full h-10 bg-neutral-900 hover:bg-neutral-700 text-white font-medium rounded-lg transition-colors disabled:opacity-40 text-sm'>
        {loading ? (
          <div className='flex items-center gap-2'>
            <LoadingSpinner size='sm' />
            <span>Signing in...</span>
          </div>
        ) : (
          "Sign in"
        )}
      </Button>

      {/* Divider */}
      <div className='flex items-center gap-3'>
        <div className='flex-1 h-px bg-neutral-100' />
        <span className='text-xs text-neutral-400'>Don't have an account?</span>
        <div className='flex-1 h-px bg-neutral-100' />
      </div>

      {/* Sign Up Link */}
      <Link
        href='/signup'
        className='block w-full text-center py-2.5 px-4 border border-neutral-200 hover:border-neutral-400 text-neutral-700 hover:text-neutral-900 font-medium rounded-lg transition-colors text-sm'>
        Create account
      </Link>

      {/* Demo Credentials */}
      <div className='rounded-lg bg-neutral-50 border border-neutral-100 px-4 py-3 space-y-1.5'>
        <p className='text-xs font-medium uppercase tracking-wide text-neutral-400'>
          Demo credentials
        </p>
        <p className='text-xs text-neutral-500'>
          Email:{" "}
          <span className='font-mono text-neutral-800'>demo@PixelMart.com</span>
        </p>
        <p className='text-xs text-neutral-500'>
          Password: <span className='font-mono text-neutral-800'>demo123</span>
        </p>
      </div>
    </form>
  );
}
