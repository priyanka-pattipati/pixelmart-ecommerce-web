"use client";

import { LoginForm } from "@/components/auth-forms/login-form";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useAuth } from "@/context/auth-context";
import { ShoppingBag } from "lucide-react";

export default function LoginPage() {
  const { loading } = useAuth();

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <main className='min-h-screen flex items-center justify-center bg-neutral-50 px-4 py-8'>
      <div className='w-full max-w-sm'>
        {/* Logo */}
        <div className='flex items-center justify-center gap-2 mb-8'>
          <div className='bg-neutral-900 p-2 rounded-md'>
            <ShoppingBag className='w-5 h-5 text-white' />
          </div>
          <span className='text-lg font-semibold tracking-tight text-neutral-900'>
            PixelMart
          </span>
        </div>

        {/* Form Card */}
        <div className='bg-white rounded-2xl border border-neutral-200 p-8'>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
