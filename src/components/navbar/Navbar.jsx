// src/components/navbar/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { useOnClickOutside } from 'usehooks-ts';
import { MENU_DATA } from '@/components/navbar/menuData';
import AnimatedButton from '@/components/ui/AnimatedButton';
import NavLogo from './NavLogo';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import DropdownMenu from './DropdownMenu';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState(null); // 桌面下拉索引
  const [isTransitioning, setIsTransitioning] = useState(true); // 🚨 新状态：控制 CSS 过渡

  // 桌面菜单根节点（只包桌面，避免移动端被外部点击监听误杀）
  const desktopMenuRef = useRef(null);

  // 外部点击 → 关闭桌面下拉
  useOnClickOutside(desktopMenuRef, () => setActiveMega(null), {
    eventTypes: ['mousedown', 'touchstart'],
  });

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : 'unset';
  }, [isMobileOpen]);

  const hasSubMenu = (type) => type === 'mega' || type === 'dropdown';

  // 🚨 新增：处理鼠标进入事件 (重新启用过渡)
  const handleMouseEnter = (idx) => {
    setIsTransitioning(true); // 鼠标进入时启用过渡动画
    setActiveMega(idx);
  };

  // 🚨 新增：处理菜单项点击事件 (强制关闭并禁用过渡)
  const handleItemClick = (e) => {
    // 1. 禁用过渡：防止 Safari 闪烁
    setIsTransitioning(false);
    // 2. 立即关闭菜单：解决点击后不消失的问题
    setActiveMega(null);

    // 3. 解决 Safari 焦点残留问题
    if (e && e.currentTarget && typeof e.currentTarget.blur === 'function') {
      e.currentTarget.blur();
    }
  };

  return (
    <nav className="h-20 border-b border-white/10 bg-[#050505] text-white backdrop-blur-md">
      <div className="mx-auto h-full px-6 lg:px-8">
        <div className="flex h-full items-center justify-between">
          {/* Logo */}
          <div className="flex shrink-0 items-center">
            <NavLogo />
          </div>

          {/* 桌面菜单 - 包在 desktopMenuRef 里 */}
          <div
            ref={desktopMenuRef}
            className="hidden h-full items-center space-x-8 lg:flex"
          >
            {MENU_DATA.map((item, idx) => (
              <div
                key={idx}
                className="group relative flex h-full items-center"
                // 🚨 调用新的 handleMouseEnter
                onMouseEnter={() =>
                  hasSubMenu(item.type) && handleMouseEnter(idx)
                }
                // 🚨 保持 onMouseLeave 关闭菜单
                onMouseLeave={() => setActiveMega(null)}
              >
                <a
                  href={item.href || '#'}
                  className={clsx(
                    'relative z-50 flex h-full items-center gap-1 px-1 transition-colors duration-300',
                    'border-t-4 text-sm font-bold tracking-wide',
                    activeMega === idx
                      ? 'border-primary text-white'
                      : 'hover:border-primary border-transparent text-white/80 hover:text-white',
                  )}
                >
                  {item.label}
                  {hasSubMenu(item.type) && (
                    <ChevronDown
                      className={clsx(
                        'mt-0.5 h-3 w-3 transition-transform duration-300',
                        activeMega === idx
                          ? 'rotate-180 opacity-100'
                          : 'opacity-50',
                      )}
                    />
                  )}
                </a>

                {/* 子菜单 - 🚨 新增 isTransitioning 和 onItemClick */}
                {item.type === 'mega' && (
                  <MegaMenu
                    isOpen={activeMega === idx}
                    groups={item.groups}
                    onMouseEnter={() => setActiveMega(idx)}
                    onMouseLeave={() => setActiveMega(null)}
                    isTransitioning={isTransitioning} // MegaMenu也需要这个属性来控制过渡
                    onItemClick={handleItemClick}
                  />
                )}

                {item.type === 'dropdown' && (
                  <DropdownMenu
                    isOpen={activeMega === idx}
                    items={item.items}
                    onMouseEnter={() => setActiveMega(idx)}
                    onMouseLeave={() => setActiveMega(null)}
                    isTransitioning={isTransitioning} // 🚨 新增 isTransitioning
                    onItemClick={handleItemClick} // 🚨 新增 onItemClick
                  />
                )}
              </div>
            ))}
          </div>

          {/* 右侧按钮 */}
          <div className="flex items-center space-x-6">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            <div className="hidden lg:block">
              <AnimatedButton href="/contact">Contact US</AnimatedButton>
            </div>
          </div>

          {/* 移动端汉堡 */}
          <div className="flex items-center gap-4 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileOpen((o) => !o)}
              className="text-gray-300 hover:text-white"
            >
              {isMobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 移动端抽屉 */}
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </nav>
  );
}
