// src/components/navbar/DropdownMenu.jsx
import React from 'react';
import clsx from 'clsx';

export default function DropdownMenu({
  isOpen,
  items,
  onMouseEnter,
  onMouseLeave,
  onItemClick,        // 👈 接收父组件传递的点击关闭函数
  isTransitioning,    // 👈 接收父组件传递的过渡状态
}) {
  return (
    <div
      className={clsx(
        // ... 其他类
        'absolute top-20 left-0 z-40 w-56 origin-top rounded-b-lg border border-white/10 bg-[#050505] py-2 shadow-xl',
        
        // 🚨 核心修复点 A: 只有在 isTransitioning 为 true 时才启用过渡
        //    点击时设置为 false，强制菜单立即消失，解决 Safari 闪烁问题。
        isTransitioning && 'transition-all duration-300', 

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
            onClick={onItemClick} // 🚨 核心修复点 B: 绑定点击事件，调用父组件的关闭逻辑
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