import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="w-full shrink-0 bg-[#303868] flex items-center justify-center z-50 py-4 md:py-0">
      <Link href="/" className="inline-block transition-transform hover:scale-105">
        <img src="/logo.webp" alt="Obi James Logo" className="h-20 md:h-28 object-contain" />
      </Link>
    </div>
  );
}
