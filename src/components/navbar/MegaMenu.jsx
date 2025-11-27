// src/components/navbar/MegaMenu.jsx
import React from 'react';
import clsx from 'clsx';

export default function MegaMenu({
  isOpen,
  groups,
  onMouseEnter,
  onMouseLeave,
}) {
  return (
    <div
      className={clsx(
        // 🔥 核心修改：
        // 1. bg-surface-muted -> bg-[#050505] (强制纯黑背景，与 Navbar 融为一体)
        // 2. border-white/10: 保持这个微弱的白色边框，用于深色模式下的分割
        'fixed top-20 right-0 left-0 z-40 origin-top border-b border-white/10 bg-[#050505] shadow-2xl transition-all duration-300',
        isOpen
          ? 'visible translate-y-0 opacity-100'
          : 'invisible -translate-y-2 opacity-0',
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* 内容容器 */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {groups?.map((group, index) => (
            <div key={index} className="flex flex-col">
              {/* 分组标题：保持白色 */}
              <h3 className="mb-5 border-b border-dashed border-white/20 pb-2 text-lg font-bold text-white">
                {group.title}
              </h3>

              <div className="flex flex-col space-y-4">
                {group.items.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    className="group/link /* 链接颜色：默认白色半透明 -> 悬停品牌红 */ hover:text-primary flex items-center text-sm font-medium text-white/60 transition-colors"
                  >
                    <span
                      className={clsx(item.active && 'text-primary font-bold')}
                    >
                      {item.label}
                    </span>

                    {item.badge && (
                      <span className="ml-2 rounded bg-[#5BA63D] px-1.5 py-0.5 text-[10px] font-bold text-white">
                        {item.badge}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
