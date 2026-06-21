"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { LogOut, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className='sticky top-0 z-50 bg-white border-b border-neutral-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 md:h-16'>
        {/* Logo */}
        <Link
          href='/products'
          className='flex items-center gap-2.5 flex-shrink-0 group'>
          <div className='bg-neutral-900 p-1.5 rounded-md group-hover:bg-neutral-700 transition-colors'>
            <ShoppingBag className='w-4 h-4 md:w-5 md:h-5 text-white' />
          </div>
          <span className='text-base md:text-lg font-semibold tracking-tight text-neutral-900 hidden sm:inline'>
            PixelMart
          </span>
        </Link>

        {/* Navigation */}
        <nav className='flex items-center gap-3 md:gap-4'>
          {/* Add Product */}
          <Link href='/add-product'>
            <Button className='flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-700 text-white h-8 md:h-9 px-3 md:px-4 rounded-md text-sm font-medium transition-colors shadow-none'>
              <Plus className='w-3.5 h-3.5' />
              <span className='hidden sm:inline'>Add Product</span>
            </Button>
          </Link>

          {/* Divider */}
          <div className='h-5 w-px bg-neutral-200 hidden sm:block' />

          {/* User Info */}
          <div className='hidden sm:flex flex-col items-end'>
            <p className='text-xs font-medium text-neutral-800 leading-tight truncate max-w-[120px]'>
              {user?.name}
            </p>
            <p className='text-[11px] text-neutral-400 truncate max-w-[120px]'>
              {user?.email}
            </p>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className='text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 p-2 rounded-md transition-colors'
            title='Logout'>
            <LogOut className='w-4 h-4' />
          </button>
        </nav>
      </div>
    </header>
  );
}
