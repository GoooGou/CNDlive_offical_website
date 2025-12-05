// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// ----------------------------------------------------------------------------
// 1. 公共 Schema (加入了 isSlide 开关)
// ----------------------------------------------------------------------------
const createBaseSchema = (image: any) =>
  z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date().default(() => new Date()),
    updatedDate: z.date().optional(),
    author: z.string().default('CNDLive'),
    tags: z.array(z.string()).default([]),
    cover: image().optional(),
    order: z.number().optional(),
    image: image().optional(),

    // ✅ 新增：全局幻灯片开关 (默认关闭)
    isSlide: z.boolean().default(false),
  });

// ----------------------------------------------------------------------------
// 2. 定义集合
// ----------------------------------------------------------------------------

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
  schema: ({ image }) => createBaseSchema(image),
});

// Products (结构特殊，单独加 isSlide)
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
      pubDate: z.date().default(() => new Date()),
      isNew: z.boolean().default(false),
      order: z.number().default(99),
      author: z.string().default('CNDLive'),
      cover: image(),
      features: z.array(z.string()).optional(),
      image: image().optional(),
      // ✅ 新增：这里也加上 isSlide
      isSlide: z.boolean().default(false),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      order: z.number().optional(),
    }),
});

const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema(),
});

// ----------------------------------------------------------------------------
// 3. 导出
// ----------------------------------------------------------------------------
export const collections = {
  news,
  cases,
  blogs,
  learning,
  solutions,
  products,
  pages,
  docs,
};
