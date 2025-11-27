// src/components/navbar/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { MENU_DATA } from '@/components/navbar/menuData'; // 确保路径正确
import AnimatedButton from '@/components/ui/AnimatedButton';

import NavLogo from './NavLogo';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import DropdownMenu from './DropdownMenu';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : 'unset';
  }, [isMobileOpen]);

  const hasSubMenu = (type) => type === 'mega' || type === 'dropdown';

  return (
    // 保持了你要求的纯黑背景和边框样式
    <nav className="fixed top-0 right-0 left-0 z-50 h-20 border-b border-white/10 bg-[#050505] text-white backdrop-blur-md">
      <div className="mx-auto h-full max-w-7xl px-6 lg:px-8">
        <div className="flex h-full items-center justify-between">
          {/* --- Logo --- */}
          <div className="flex shrink-0 items-center">
            <NavLogo />
          </div>

          {/* --- Desktop Menu --- */}
          <div className="hidden h-full items-center space-x-8 lg:flex">
            {MENU_DATA.map((item, index) => (
              <div
                key={index}
                className="group relative flex h-full items-center"
                onMouseEnter={() =>
                  hasSubMenu(item.type) && setActiveMega(index)
                }
                onMouseLeave={() => setActiveMega(null)}
              >
                <a
                  href={item.href || '#'}
                  className={clsx(
                    'relative z-50 flex h-full items-center gap-1 px-1 transition-colors duration-300',
                    'text-sm font-bold tracking-wide',
                    'border-t-4',
                    activeMega === index
                      ? 'border-primary text-white'
                      : 'hover:border-primary border-transparent text-white/80 hover:text-white',
                  )}
                >
                  {item.label}
                  {hasSubMenu(item.type) && (
                    <ChevronDown
                      className={clsx(
                        'mt-0.5 h-3 w-3 transition-transform duration-300',
                        activeMega === index
                          ? 'rotate-180 opacity-100'
                          : 'opacity-50',
                      )}
                    />
                  )}
                </a>

                {/* Sub Menus */}
                {item.type === 'mega' && (
                  <MegaMenu
                    isOpen={activeMega === index}
                    groups={item.groups}
                    onMouseEnter={() => setActiveMega(index)}
                    onMouseLeave={() => setActiveMega(null)}
                  />
                )}

                {item.type === 'dropdown' && (
                  <DropdownMenu
                    isOpen={activeMega === index}
                    items={item.items}
                    onMouseEnter={() => setActiveMega(index)}
                    onMouseLeave={() => setActiveMega(null)}
                  />
                )}
              </div>
            ))}
          </div>

          {/* --- Right Actions --- */}
          <div className="flex items-center space-x-6">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>

            <div className="hidden lg:block">
              <AnimatedButton href="/contact">Contact US</AnimatedButton>
            </div>
          </div>

          {/* --- Mobile Toggle --- */}
          <div className="flex items-center gap-4 lg:hidden">
            {/* 移动端切换按钮 */}
            <ThemeToggle />

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
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

      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </nav>
  );
}
