// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// ----------------------------------------------------------------------------
// 🛠️ 1. 提取公共 Schema 生成器 (DRY 原则)
// ----------------------------------------------------------------------------
// 这涵盖了 news, cases, blogs, learning, solutions 共有的字段
const createBaseSchema = (image: any) =>
  z.object({
    title: z.string(),
    description: z.string(),

    // ✅ 优化：日期自动生成
    // 如果 MD 文件里没写 pubDate，默认使用当前构建时间 (new Date())
    pubDate: z.date().default(() => new Date()),

    updatedDate: z.date().optional(),

    // ✅ 优化：作者默认值
    // 如果没写 author，默认为 'CNDLive'，省去每次都写的麻烦
    author: z.string().default('CNDLive'),

    // ✅ 优化：标签默认值
    // 如果没写 tags，默认为空数组 []，防止报错
    tags: z.array(z.string()).default([]),

    cover: image().optional(),
    order: z.number().optional(),
  });

// ----------------------------------------------------------------------------
// 📂 2. 定义集合
// ----------------------------------------------------------------------------

// 使用公共 Schema 的集合
const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: ({ image }) => createBaseSchema(image),
});

const cases = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/cases' }),
  schema: ({ image }) => createBaseSchema(image),
});

const blogs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blogs' }),
  schema: ({ image }) => createBaseSchema(image),
});

const learning = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/learning' }),
  schema: ({ image }) => createBaseSchema(image),
});

const solutions = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/solutions' }),
  // Solutions 直接复用公共 Schema，因为它现在的字段跟上面完全一致了
  schema: ({ image }) => createBaseSchema(image),
});

// Pages 比较简单，单独定义
const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      order: z.number().optional(),
    }),
});

// Products 结构特殊，单独定义
const products = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/products' }),
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
      // 这里的日期也加上默认值
      pubDate: z.date().default(() => new Date()),
      isNew: z.boolean().default(false),
      order: z.number().default(99),
      author: z.string().default('CNDLive'),
      cover: image(), // 必填
      features: z.array(z.string()).optional(),
    }),
});

// Starlight Docs
const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema(),
});

// ----------------------------------------------------------------------------
// 📤 3. 导出
// ----------------------------------------------------------------------------
export const collections = {
  news,
  pages,
  solutions,
  docs,
  products,
  cases,
  blogs,
  learning,
};
