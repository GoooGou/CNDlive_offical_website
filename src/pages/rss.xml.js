// src/pages/rss.xml.js
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  // 获取所有案例
  const cases = await getCollection('cases');

  return rss({
    // RSS 标题
    title: 'CNDLive Updates & Success Stories',
    // RSS 描述
    description: 'Latest news, firmware updates, and case studies from CNDLive.',
    // 你的网站地址
    site: context.site,
    
    // 生成列表
    items: cases.map((post) => {
      // 🔥 核心修复逻辑：
      // 1. 优先尝试 post.slug (Astro 标准生成的 URL 友好名)
      // 2. 如果没有，尝试 post.id (文件名)
      // 3. 如果前两个都没有，尝试 frontmatter 里的 post.data.slug
      const urlSlug = post.slug || post.id || post.data.slug;

      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        // 拼接链接
        link: `/cases/${urlSlug}/`,
        author: post.data.author,
      };
    }),
    
    customData: `<language>en-us</language>`,
  });
}