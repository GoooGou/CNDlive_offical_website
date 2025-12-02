// src/components/navbar/MobileMenu.jsx
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { SITE_CONFIG } from '@/global.config'; // 确保路径与您的配置一致
import { MENU_DATA } from '@/components/navbar/menuData'; // 假设菜单数据路径
import { ChevronDown } from 'lucide-react';

export default function MobileMenu({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState({});

  // 1. 客户端挂载检查 (避免 SSR 水合不匹配)
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. 🔥 核心逻辑：禁止背景滚动
  useEffect(() => {
    if (isOpen) {
      // 锁定：记录当前滚动位置并禁止滚动
      // (简单版直接 hidden，如果需防止抖动可加 padding-right 处理滚动条宽度)
      document.body.style.overflow = 'hidden';
    } else {
      // 解锁
      document.body.style.overflow = '';
    }
    // 组件卸载时强制解锁，防止意外死锁
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleGroup = (index) => {
    setExpandedGroups((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const hasSubMenu = (item) => item.type === 'mega' || item.type === 'dropdown';

  // 3. 🔥 动态计算避让高度 (Padding Top)
  // Header z-index 是 100，菜单在下面，内容必须往下推
  // 无 Banner: Navbar(80px) + 间隙 -> pt-24 (96px)
  // 有 Banner: Navbar(80px) + Banner(40px) + 间隙 -> pt-36 (144px)
  const paddingTopClass = SITE_CONFIG.showPromotionBanner ? 'pt-36' : 'pt-24';

  // 未挂载时不渲染
  if (!mounted) return null;

  // 4. 使用 Portal 挂载到 body，确保 fixed 定位相对于视口
  return createPortal(
    <div
      className={clsx(
        // 固定全屏，层级 90 (低于 Header 的 100)
        'fixed inset-0 z-[90] h-[100dvh] w-screen overflow-y-auto bg-[#050505] pb-20 transition-transform duration-300 ease-in-out lg:hidden',
        paddingTopClass, // 应用动态 padding
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <div className="space-y-6 px-6">
        {MENU_DATA.map((item, index) => (
          <div key={index} className="border-b border-white/5 pb-4 last:border-0">
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
                      expandedGroups[index] ? 'rotate-180' : ''
                    )}
                  />
                </button>
                <div
                  className={clsx(
                    'space-y-6 overflow-hidden pl-4 transition-all duration-300',
                    expandedGroups[index] ? 'mt-4 max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  {/* 子菜单渲染逻辑 */}
                  {(item.type === 'mega' ? item.groups.flatMap(g => g.items) : item.items).map((sub, sIdx) => (
                    <a
                      key={sIdx}
                      href={sub.href}
                      onClick={onClose}
                      className="block text-sm text-gray-300 active:text-primary"
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
                className="block text-lg font-medium text-white active:text-primary"
              >
                {item.label}
              </a>
            )}
          </div>
        ))}
        
        {/* 其他按钮 */}
        <div className="pt-4">
            <a href="/contact" onClick={onClose} className="block w-full rounded-full border border-primary py-3 text-center font-bold text-primary transition hover:bg-primary hover:text-white">
                Contact US
            </a>
        </div>
      </div>
    </div>,
    document.body // 挂载目标
  );
}