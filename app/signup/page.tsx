"use client";

import { SignupForm } from "@/components/auth-forms/signup-form";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useAuth } from "@/context/auth-context";
import { ShoppingBag } from "lucide-react";

export default function SignupPage() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <main className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-neutral-50 px-4 py-8'>
      <div className='w-full max-w-md'>
        {/* Logo */}
        <div className='flex items-center justify-center gap-2 mb-8'>
          <div className='bg-blue-600 p-2.5 rounded-lg'>
            <ShoppingBag className='w-6 h-6 text-white' />
          </div>
          <span className='text-2xl font-bold text-foreground'>PixelMart</span>
        </div>

        {/* Form Card */}
        <div className='bg-white rounded-2xl shadow-lg p-8 border border-neutral-200'>
          <SignupForm />
        </div>
      </div>
    </main>
  );
}
