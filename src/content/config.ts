// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 👇 1. 必须引入 Starlight 的这两个工具
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const news   = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/news" }),
  schema: ({ image }) => z.object({
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
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/pages" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
  }),
});

// 🔥 新增：solutions 集合
const solutions = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/solutions" }),
  schema: ({ image }) => z.object({
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
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/products" }),
  // 修改这里：改成 ({ image }) 
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      'Video Encoder', 
      'Video Decoder', 
      'NDI Converter', 
      'Manage & IP Gateway'
    ]),
    isNew: z.boolean().default(false),
    order: z.number().default(99),

    // 🔥🔥 修复核心：补上 ResourcePost 组件必须的字段 🔥🔥
    
    // 1. 给一个默认日期（当前时间），这样组件就不会报错了
    pubDate: z.date().default(() => new Date()), 
    
    // 2. 补上图片字段（可选），防止组件读取图片时报错
    cover: image().optional(), 
    
    // 3. 补上作者字段（可选，给个默认值）
    author: z.string().default('CNDLive'),
  }),
});

// 👇 2. 补上 Starlight 的 docs 集合定义
const docs = defineCollection({ 
  loader: docsLoader(), // 这里的 loader 会自动去 src/content/docs 里找文件
  schema: docsSchema() 
});
export const collections = { news, pages, solutions, docs, products }; // 记得导出 

