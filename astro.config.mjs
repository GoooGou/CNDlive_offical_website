// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
// import mdx from '@astrojs/mdx'; // ⚠️ Starlight 自带了 MDX 支持，通常不需要单独引入，否则可能冲突
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
 
  integrations: [
    // 1. Starlight 配置 (建议放在最前面)
    starlight({
      // 🔥 必填：文档站标题
      title: 'CNDLive Support',
      
      
      // 自定义 CSS 文件路径
      customCss: [
        // 你的自定义 CSS 文件的相对路径
        './src/styles/starlight-simple.css',
      ],
      // 侧边栏配置
      sidebar: [
              {
          label: '🔙 返回主站',
          link: '/',
          // 可选：加上 icon 让它更好看
          // 可选：新标签页打开
          attrs: { target: '_blank' }, 
        },
        // 方案 A：自动读取 src/content/docs/support 文件夹下的所有内容
        {
          label: 'Support Docs',
          autogenerate: { directory: 'support' },
        },
        
        // 方案 B：手动指定 (如果你想控制顺序)
        // {
        //   label: 'Start Here',
        //   items: [
        //     { label: 'Introduction', link: '/support/intro' },
        //   ],
        // },
      ],
    }),

    // 2. React 支持
    react(),
    
    // 3. 如果你发现你的 News/About 页面无法渲染 MDX 了，再把下面这行注释解开
    // mdx(), 
  ],

  // 预加载策略
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});