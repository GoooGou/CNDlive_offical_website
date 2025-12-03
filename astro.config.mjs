// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import astroExpressiveCode from 'astro-expressive-code';

const isDev = process.env.npm_lifecycle_event === 'dev';

// https://astro.build/config
export default defineConfig({
  site: 'http://www.cndlive.com/',

  image: {
    // 🚀 性能优化：开发环境不处理图片，生产环境使用默认 Sharp
    service: isDev ? { entrypoint: 'astro/assets/services/noop' } : undefined,
  },

  markdown: {
    // ⚠️ 关键：关闭 Astro 自带的 Shiki 高亮
    // 因为我们已经使用了 astro-expressive-code 来接管所有代码块渲染
    syntaxHighlight: false,
  },

  vite: {
    plugins: [tailwindcss()],
    // 🚀 开发环境依赖预构建优化
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
      force: false,
    },
    server: {
      // 文件监听优化
      watch: {
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/dist/**',
          '**/.astro/**',
        ],
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
      hmr: {
        overlay: true,
      },
      fs: {
        strict: true,
      },
    },
    build: {
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000,
    },
    cacheDir: 'node_modules/.vite',
  },

  integrations: [
    // 1. Expressive Code 配置 (必须在 mdx/starlight 之前)
    // 用于给全站代码块添加 Mac 风格窗口和复制按钮
    astroExpressiveCode({
      themes: ['github-dark', 'github-light'],
      frames: {
        // ✅ 功能开关放在这里
        showCopyToClipboardButton: true,
      },
      styleOverrides: {
        // 样式微调放在这里
        frames: {
          // e.g. shadowColor: '#000'
        },
      },
    }),

    // 2. Starlight 文档系统
    starlight({
      title: 'CNDLive Support',
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },
        'zh-cn': {
          label: '简体中文',
          lang: 'zh-CN',
        },
      },
      disable404Route: true,
      sidebar: [
        {
          label: '🔙 返回主站',
          link: '/',
          attrs: { target: '_blank' },
        },
        {
          label: 'Support Center',
          autogenerate: { directory: 'support' },
        },
      ],
    }),

    // 3. 其他集成
    react(),
    sitemap(),
    partytown(),
  ],

  // 开发环境禁用预加载以提升性能
  prefetch: isDev
    ? false
    : {
        prefetchAll: true,
        defaultStrategy: 'hover',
      },
});
