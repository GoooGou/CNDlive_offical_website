// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
// import mdx from '@astrojs/mdx'; // ⚠️ Starlight 自带了 MDX 支持，通常不需要单独引入,否则可能冲突
import starlight from '@astrojs/starlight';

import sitemap from '@astrojs/sitemap';

import partytown from '@astrojs/partytown';

// 1. 检测当前是否是开发环境
const isDev = process.env.npm_lifecycle_event === 'dev';

// https://astro.build/config
export default defineConfig({
  site: 'http://www.cndlive.com/',

  image: {
    // 🔥 3. 关键代码：
    // 如果是开发环境，使用 'noop' (空服务)，完全不处理图片，速度提升 100 倍
    // 如果是生产构建，使用 undefined (默认 sharp)，保证线上画质
    service: isDev ? { entrypoint: 'astro/assets/services/noop' } : undefined,
  },

  vite: {
    plugins: [tailwindcss()],
    // 🚀 开发环境性能优化
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-dom/client',
        'framer-motion',
        'gsap',
        'lottie-react',
        'lottie-web',
        'clsx',
        'lucide-react',
      ],
      // 强制预构建，避免运行时发现新依赖
      force: false,
    },
    server: {
      // 监听文件变化时的性能优化
      watch: {
        // 忽略 node_modules 和 .git 文件夹
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/dist/**',
          '**/.astro/**',
        ],
        // 减少轮询频率
        usePolling: false,
      },
      // 预热常用文件
      warmup: {
        clientFiles: [
          './src/components/hero/HeroCarousel.tsx',
          './src/components/ui/Reveal.tsx',
          './src/components/navbar/Navbar.jsx',
        ],
      },
      // 增加 HMR 性能
      hmr: {
        overlay: true,
      },
      // 文件系统缓存
      fs: {
        strict: true,
      },
    },
    // 构建优化
    build: {
      // 减少内联资源大小限制
      assetsInlineLimit: 4096,
      // 启用 CSS 代码分割
      cssCodeSplit: true,
      // 减少 chunk 大小警告阈值
      chunkSizeWarningLimit: 1000,
    },
    // 启用缓存
    cacheDir: 'node_modules/.vite',
  },
  // @ts-ignore

  integrations: [
    // 1. Starlight 配置 (建议放在最前面)
    // 2. React 支持
    starlight({
      // 🔥 必填：文档站标题
      title: 'CNDLive Support',
      // 🔥🔥🔥 添加这一行，禁用 Starlight 默认的 404 路由 🔥🔥🔥
      defaultLocale: 'root', // 默认语言（通常设为英文或根目录）
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },
        // 添加中文配置后，切换器才会出现
        'zh-cn': {
          label: '简体中文',
          lang: 'zh-CN',
        },
      },
      disable404Route: true,

      // 侧边栏配置
      sidebar: [
        {
          label: '🔙 返回主站',
          link: '/',
          // 可选：加上 icon 让它更好看
          // 可选：新标签页打开
          attrs: { target: '_blank' },
        },
        {
          label: 'Support Docs',
          autogenerate: { directory: 'support' },
        },
      ],
    }), // 3. 如果你发现你的 News/About 页面无法渲染 MDX 了，再把下面这行注释解开
    // mdx(),
    react(),
    sitemap(),
    partytown(),
  ],

  // 预加载策略 - 开发环境禁用以提升性能
  prefetch: isDev
    ? false // 🚀 开发环境完全禁用预加载
    : {
        prefetchAll: true,
        defaultStrategy: 'hover',
      },
});
