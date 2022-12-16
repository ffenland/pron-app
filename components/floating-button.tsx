import Link from "next/link";
import React from "react";

interface FloatingButton {
  children: React.ReactNode;
  href: string;
}

export default function FloatingButton({ children, href }: FloatingButton) {
  return (
    <Link href={href}>
      <div className="max-w-2xl mx-auto w-full fixed bottom-20 flex justify-end pr-4">
        <button className="bg-cyan-600 text-white w-12 aspect-square flex justify-center items-center rounded-full shadow-md shadow-slate-800">
          {children}
        </button>
      </div>
    </Link>
  );
}
