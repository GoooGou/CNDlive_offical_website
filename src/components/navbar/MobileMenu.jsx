// src/components/navbar/MobileMenu.jsx
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { SITE_CONFIG } from '@/global.config';
import { MENU_DATA } from '@/components/navbar/menuData';
import { ChevronDown } from 'lucide-react';

export default function MobileMenu({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState({});

  // 1. 客户端挂载检查
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. 锁定 Body 滚动 (Navbar.jsx 里其实已经做了，这里保留也没坏处，双重保险)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleGroup = (index) => {
    setExpandedGroups((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const hasSubMenu = (item) => item.type === 'mega' || item.type === 'dropdown';

  // 3. 动态计算避让高度
  const paddingTopClass = SITE_CONFIG.showPromotionBanner ? 'pt-36' : 'pt-24';

  if (!mounted) return null;

  // 4. Portal 挂载
  return createPortal(
    <div
      className={clsx(
        // 基础样式
        'fixed inset-0 z-[90] h-[100dvh] w-screen bg-[#050505] transition-transform duration-300 ease-in-out lg:hidden',
        paddingTopClass,
        isOpen ? 'translate-x-0' : 'translate-x-full',

        // 🔥🔥🔥 核心修改 1：防止滚动链 (Scroll Chaining) 🔥🔥🔥
        // 加上这个，到了菜单底部再滑也不会带动 body 滚动了
        'overscroll-contain',

        // 允许内部滚动
        'overflow-y-auto pb-20',
      )}
      // 🔥🔥🔥 核心修改 2：恢复触摸事件 🔥🔥🔥
      // 必须加这个！因为 Navbar.jsx 把 body 的 touch-action 关了
      style={{ touchAction: 'auto' }}
    >
      <div className="space-y-6 px-6">
        {MENU_DATA.map((item, index) => (
          <div
            key={index}
            className="border-b border-white/5 pb-4 last:border-0"
          >
            {hasSubMenu(item) ? (
              <div>
                <button
                  onClick={() => toggleGroup(index)}
                  className="mb-2 flex w-full items-center justify-between text-lg font-medium text-white"
                >
                  {item.label}
                  <ChevronDown
                    className={clsx(
                      'h-5 w-5 transition-transform',
                      expandedGroups[index] ? 'rotate-180' : '',
                    )}
                  />
                </button>
                <div
                  className={clsx(
                    'space-y-6 overflow-hidden pl-4 transition-all duration-300',
                    expandedGroups[index]
                      ? 'mt-4 max-h-[1000px] opacity-100'
                      : 'max-h-0 opacity-0',
                  )}
                >
                  {(item.type === 'mega'
                    ? item.groups.flatMap((g) => g.items)
                    : item.items
                  ).map((sub, sIdx) => (
                    <a
                      key={sIdx}
                      href={sub.href}
                      onClick={onClose}
                      className="active:text-primary block text-sm text-gray-300"
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                href={item.href}
                onClick={onClose}
                className="active:text-primary block text-lg font-medium text-white"
              >
                {item.label}
              </a>
            )}
          </div>
        ))}

        {/* Contact 按钮 */}
        <div className="pt-4">
          <a
            href="/contact"
            onClick={onClose}
            className="border-primary text-primary hover:bg-primary block w-full rounded-full border py-3 text-center font-bold transition hover:text-white"
          >
            Contact US
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
