// src/components/navbar/MegaMenu.jsx
import React from 'react';
import clsx from 'clsx';

export default function MegaMenu({
  isOpen,
  groups,
  onMouseEnter,
  onMouseLeave,
  onItemClick,        // 👈 接收父组件传递的点击关闭函数
  isTransitioning,    // 👈 接收父组件传递的过渡状态
}) {
  return (
    <div
      className={clsx(
        // ... 其他类
        'fixed top-20 right-0 left-0 z-40 origin-top border-b border-white/10 bg-[#050505] shadow-2xl',

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
      {/* 内容容器 */}
      <div className="mx-auto   px-6 py-10 lg:px-8">
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
                    onClick={onItemClick} // 🚨 核心修复点 B: 绑定点击事件，调用父组件的关闭逻辑
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