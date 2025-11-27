// src/components/navbar/DropdownMenu.jsx
import React from 'react';
import clsx from 'clsx';

export default function DropdownMenu({
  isOpen,
  items,
  onMouseEnter,
  onMouseLeave,
}) {
  return (
    <div
      className={clsx(
        // 🔥 核心修改：
        // 1. bg-[#0a0a0a] -> bg-[#050505] (与 Navbar/MegaMenu 统一使用纯黑)
        // 2. border-white/10: 保持深色下的微弱边框
        'absolute top-20 left-0 z-40 w-56 origin-top rounded-b-lg border border-white/10 bg-[#050505] py-2 shadow-xl transition-all duration-300',
        isOpen
          ? 'visible translate-y-0 opacity-100'
          : 'invisible -translate-y-2 opacity-0',
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex flex-col">
        {items?.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="hover:text-primary block px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
          >
            {item.label}
            {item.badge && (
              <span className="ml-2 rounded bg-[#5BA63D] px-1.5 py-0.5 text-[10px] font-bold text-white">
                {item.badge}
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
