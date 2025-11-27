// src/components/navbar/MobileMenu.jsx
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { MENU_DATA } from '@/components/navbar/menuData';

export default function MobileMenu({ isOpen, onClose }) {
  const [expandedGroups, setExpandedGroups] = useState({});

  const toggleGroup = (index) => {
    setExpandedGroups((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const hasSubMenu = (item) => item.type === 'mega' || item.type === 'dropdown';

  return (
    <div
      className={clsx(
        // 🔥 样式微调：bg-[#0a0a0a] -> bg-[#050505] (与 Navbar 颜色完全一致)
        'fixed inset-0 top-20 z-40 min-h-[calc(100vh-4rem)] overflow-y-auto bg-[#050505] pb-20 transition-transform duration-300 ease-in-out lg:hidden',
        isOpen ? 'translate-x-0' : 'translate-x-full',
      )}
    >
      <div className="space-y-6 px-6 py-6">
        {MENU_DATA.map((item, index) => (
          <div
            key={index}
            className="border-b border-white/5 pb-4 last:border-0"
          >
            {hasSubMenu(item) ? (
              <div>
                {/* 这里的 button 是展开/折叠，不需要关闭菜单 */}
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
                  {/* 情况 A: Mega Menu */}
                  {item.type === 'mega' &&
                    item.groups?.map((group, gIndex) => (
                      <div key={gIndex}>
                        <h4 className="mb-3 text-sm font-bold text-gray-500 uppercase">
                          {group.title}
                        </h4>
                        <div className="flex flex-col space-y-3">
                          {group.items.map((sub, sIndex) => (
                            <a
                              key={sIndex}
                              href={sub.href}
                              onClick={onClose} /* ✅ 点击关闭 */
                              className="active:text-primary flex items-center text-sm text-gray-300"
                            >
                              {sub.label}
                              {sub.badge && (
                                <span className="ml-2 rounded bg-[#5BA63D] px-1 text-[10px] text-white">
                                  {sub.badge}
                                </span>
                              )}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}

                  {/* 情况 B: Dropdown Menu */}
                  {item.type === 'dropdown' && (
                    <div className="flex flex-col space-y-3">
                      {item.items?.map((sub, sIndex) => (
                        <a
                          key={sIndex}
                          href={sub.href}
                          onClick={onClose} /* ✅ 点击关闭 */
                          className="active:text-primary flex items-center text-sm text-gray-300"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // 3. 普通链接
              <a
                href={item.href}
                onClick={onClose} /* ✅ 点击关闭 */
                className="active:text-primary block text-lg font-medium text-white"
              >
                {item.label}
              </a>
            )}
          </div>
        ))}

        <div className="pt-4">
          <a
            href="/contact"
            onClick={onClose} /* ✅ 点击关闭 */
            className="border-primary text-primary hover:bg-primary block w-full rounded-full border py-3 text-center font-bold transition hover:text-white"
          >
            Contact US
          </a>
        </div>
      </div>
    </div>
  );
}
