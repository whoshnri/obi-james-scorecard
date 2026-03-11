import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="w-full shrink-0 py-8 mt-10 md:mt-20 bg-[#303868] flex flex-col md:flex-row items-center justify-between px-6 md:px-32 z-50 gap-6 md:gap-0">
      <Link href="/" className="inline-block transition-transform hover:scale-105">
        <img src="/footer_logo.webp" alt="Obi James Logo" className="w-48 max-w-full md:w-auto md:h-36 object-contain" />
      </Link>
      <p className="text-white/80 text-sm md:text-base text-center">© 2023 by Obi James Consultancy Limited. All rights reserved.</p>
    </div>
  );
}
