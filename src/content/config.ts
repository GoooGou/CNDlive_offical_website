// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 👇 1. 必须引入 Starlight 的这两个工具
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
      author: z.string(),
      tags: z.array(z.string()),

      // 修改处：加上 .optional()
      // 这表示：这个字段可以没有，如果没有，它的值就是 undefined
      cover: image().optional(),
    }),
});

const cases = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/cases' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
      author: z.string(),
      tags: z.array(z.string()),

      // 修改处：加上 .optional()
      // 这表示：这个字段可以没有，如果没有，它的值就是 undefined
      cover: image().optional(),
    }),
});
const blogs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blogs' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
      author: z.string(),
      tags: z.array(z.string()),

      // 修改处：加上 .optional()
      // 这表示：这个字段可以没有，如果没有，它的值就是 undefined
      cover: image().optional(),
    }),
});

const learning = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/learning' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
      author: z.string(),
      tags: z.array(z.string()),

      // 修改处：加上 .optional()
      // 这表示：这个字段可以没有，如果没有，它的值就是 undefined
      cover: image().optional(),
    }),
});

// 🔥 新增：pages 集合 (用于 About, Contact, Privacy Policy 等单页)
// 🔥 必须有 pages 的定义
const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
    }),
});

// 🔥 新增：solutions 集合
const solutions = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/solutions' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cover: image().optional(),

      // 🔥🔥 补上这两个字段，跟 News 保持一致
      pubDate: z.date(),
      author: z.string().optional(), // 作者可以是可选的
    }),
});

//新增产品集合
const products = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/products' }),
  // 修改这里：改成 ({ image })
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      category: z.enum([
        'Video Encoder',
        'Video Decoder',
        'NDI Converter',
        'Manage & IP Gateway',
      ]),
      isNew: z.boolean().default(false),
      order: z.number().default(99),

      // 🔥🔥 修复核心：补上 ResourcePost 组件必须的字段 🔥🔥

      // 1. 给一个默认日期（当前时间），这样组件就不会报错了
      pubDate: z.date().default(() => new Date()),

      // 2. 补上图片字段（可选），防止组件读取图片时报错
      cover: image().optional(),
      // 🔥 新增：核心卖点列表 (显示在产品图右侧)
      features: z.array(z.string()).optional(),
      // 3. 补上作者字段（可选，给个默认值）
      author: z.string().default('CNDLive'),
      // 🔥 新增复杂的 downloads 结构
      downloads: z
        .array(
          z.object({
            category: z.string(), // 例如 "Documents" 或 "Firmware"
            items: z.array(
              z.object({
                title: z.string(), // 例如 "Quick Start Guide" 或 "C6-V1.01.0031"
                fileUrl: z.string(), // 文件路径
                date: z.string().optional(), // 例如 "2024.10"
                releaseNotes: z.string().optional(), // 固件更新日志 (支持 Markdown)
              }),
            ),
          }),
        )
        .optional(),
      manualPdf: z.string().optional(),
      // 🔥 2. 新增：技术参数 (数组格式，方便遍历渲染表格)
      // 保持这个结构不变
      specs: z
        .array(
          z.object({
            label: z.string(),
            value: z.string(), // 这里存长文本 (Markdown)
          }),
        )
        .optional(),
    }),
});

// 👇 2. 补上 Starlight 的 docs 集合定义
const docs = defineCollection({
  loader: docsLoader(), // 这里的 loader 会自动去 src/content/docs 里找文件
  schema: docsSchema(),
});
export const collections = {
  news,
  pages,
  solutions,
  docs,
  products,
  cases,
  blogs,
  learning,
}; // 记得导出
