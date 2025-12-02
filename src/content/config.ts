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
      updatedDate: z.date().optional(),
      author: z.string(),
      tags: z.array(z.string()),

      // 修改处：加上 .optional()
      // 这表示：这个字段可以没有，如果没有，它的值就是 undefined
      cover: image().optional(),
      order: z.number().optional(),
    }),
});

const cases = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/cases' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
      updatedDate: z.date().optional(),
      author: z.string(),
      tags: z.array(z.string()),

      // 修改处：加上 .optional()
      // 这表示：这个字段可以没有，如果没有，它的值就是 undefined
      cover: image().optional(),
      order: z.number().optional(),
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
      updatedDate: z.date().optional(),

      // 修改处：加上 .optional()
      // 这表示：这个字段可以没有，如果没有，它的值就是 undefined
      cover: image().optional(),
      order: z.number().optional(),
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
      updatedDate: z.date().optional(),
      tags: z.array(z.string()),

      // 修改处：加上 .optional()
      // 这表示：这个字段可以没有，如果没有，它的值就是 undefined
      cover: image().optional(),
      order: z.number().optional(),
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
      order: z.number().optional(),
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
      order: z.number().optional(),
    }),
});

//新增产品集合
const products = defineCollection({
  // ✅ 1. 关键点：只匹配 md 和 mdx。
  // 这样 specs.ts 和 downloads.ts 会被这个集合自动忽略（它们只是普通的数据文件），
  // 从而彻底解决了 "post.render is not a function" 的报错。
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/products' }),

  schema: ({ image }) =>
    z.object({
      // ✅ 2. 核心字段改为必填 (去掉 optional)
      // 因为这里只加载 index.mdx，主文件必须要有这些信息，否则构建时报错提示你补全。
      title: z.string(),
      description: z.string(),

      category: z.enum([
        'Video Encoder',
        'Video Decoder',
        'NDI Converter',
        'Manage & IP Gateway',
      ]),

      // --- 默认值字段 ---
      isNew: z.boolean().default(false),
      order: z.number().default(99),
      pubDate: z.date().default(() => new Date()),
      author: z.string().default('CNDLive'),

      // --- 视觉字段 ---
      // 建议 cover 也是必填的，保证列表页布局统一
      cover: image(),
      // 卖点列表依然可选，有的产品可能没有
      features: z.array(z.string()).optional(),
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
