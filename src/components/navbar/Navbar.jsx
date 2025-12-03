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
  const [activeMega, setActiveMega] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const desktopMenuRef = useRef(null);

  useOnClickOutside(desktopMenuRef, () => setActiveMega(null), {
    eventTypes: ['mousedown', 'touchstart'],
  });

  // ✅✅✅ 修复核心：更稳健的滚动锁定逻辑
  useEffect(() => {
    if (isMobileOpen) {
      // 1. 物理禁止 Body 滚动
      document.body.style.overflow = 'hidden';
      // 2. 针对 iOS 的增强：禁止默认触摸行为 (需要在 MobileMenu 里开启 auto)
      document.body.style.touchAction = 'none';
    } else {
      // 恢复滚动 (使用空字符串比 unset 兼容性更好)
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    // 清理函数：组件卸载时确保恢复，防止死锁
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMobileOpen]);

  const hasSubMenu = (type) => type === 'mega' || type === 'dropdown';

  const handleMouseEnter = (idx) => {
    setIsTransitioning(true);
    setActiveMega(idx);
  };

  const handleItemClick = (e) => {
    setIsTransitioning(false);
    setActiveMega(null);
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

          {/* 桌面菜单 */}
          <div
            ref={desktopMenuRef}
            className="hidden h-full items-center space-x-8 lg:flex"
          >
            {MENU_DATA.map((item, idx) => (
              <div
                key={idx}
                className="group relative flex h-full items-center"
                onMouseEnter={() =>
                  hasSubMenu(item.type) && handleMouseEnter(idx)
                }
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

                {item.type === 'mega' && (
                  <MegaMenu
                    isOpen={activeMega === idx}
                    groups={item.groups}
                    onMouseEnter={() => setActiveMega(idx)}
                    onMouseLeave={() => setActiveMega(null)}
                    isTransitioning={isTransitioning}
                    onItemClick={handleItemClick}
                  />
                )}

                {item.type === 'dropdown' && (
                  <DropdownMenu
                    isOpen={activeMega === idx}
                    items={item.items}
                    onMouseEnter={() => setActiveMega(idx)}
                    onMouseLeave={() => setActiveMega(null)}
                    isTransitioning={isTransitioning}
                    onItemClick={handleItemClick}
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
