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

  useEffect(() => {
    setMounted(true);
  }, []);

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
  const paddingTopClass = SITE_CONFIG.showPromotionBanner ? 'pt-36' : 'pt-24';

  if (!mounted) return null;

  return createPortal(
    <div
      className={clsx(
        'fixed inset-0 z-90 h-dvh w-screen bg-[#050505] transition-transform duration-300 ease-in-out lg:hidden',
        paddingTopClass,
        isOpen ? 'translate-x-0' : 'translate-x-full',
        'overscroll-contain',
        'overflow-y-auto pb-20',
      )}
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
                    'overflow-hidden pl-4 transition-all duration-300',
                    expandedGroups[index]
                      ? 'mt-4 max-h-[1000px] opacity-100' // 如果内容很多，建议适当调大 max-h
                      : 'max-h-0 opacity-0',
                  )}
                >
                  {/* 🔥🔥🔥 修改开始：区分 Mega Menu (带分组) 和 普通 Dropdown 🔥🔥🔥 */}
                  {item.type === 'mega' ? (
                    // 方案 A: 渲染分组 (Mega Menu)
                    <div className="space-y-6">
                      {item.groups.map((group, gIdx) => (
                        <div key={gIdx} className="flex flex-col gap-3">
                          {/* 分组标题 */}
                          <div className="text-xs font-bold tracking-wider text-gray-500 uppercase">
                            {group.title}
                          </div>
                          {/* 分组内的链接 */}
                          <div className="flex flex-col gap-3 border-l border-white/10 pl-3">
                            {group.items.map((sub, sIdx) => (
                              <a
                                key={sIdx}
                                href={sub.href}
                                onClick={onClose}
                                className="active:text-primary block text-sm text-gray-300"
                              >
                                {sub.label}
                                {sub.badge && (
                                  <span className="bg-primary/20 text-primary ml-2 rounded px-1.5 py-0.5 text-[10px]">
                                    {sub.badge}
                                  </span>
                                )}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // 方案 B: 普通 Dropdown (无分组)
                    <div className="flex flex-col gap-4">
                      {item.items.map((sub, sIdx) => (
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
                  )}
                  {/* 🔥🔥🔥 修改结束 🔥🔥🔥 */}
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
