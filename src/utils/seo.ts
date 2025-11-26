// src/utils/seo.ts

// 1. 生成产品 Schema
export function generateProductSchema(post: any, siteUrl: URL) {
  const coverImage = new URL(post.data.cover, siteUrl).toString();

  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: post.data.title,
    image: coverImage,
    description: post.data.description,
    brand: { '@type': 'Brand', name: 'CNDLive' },
    sku: post.id,
    offers: {
      '@type': 'Offer',
      url: new URL(`/products/${post.id}`, siteUrl).toString(),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      price: '0',
    },
  };
}

// 2. 生成文章/新闻/案例 Schema
export function generateArticleSchema(
  post: any,
  siteUrl: URL,
  type: 'NewsArticle' | 'BlogPosting' = 'BlogPosting',
) {
  const coverImage = new URL(post.data.cover, siteUrl).toString();

  return {
    '@context': 'https://schema.org',
    '@type': type,
    headline: post.data.title,
    image: [coverImage],
    datePublished: new Date(post.data.pubDate).toISOString(),
    author: {
      '@type': 'Organization',
      name: post.data.author || 'CNDLive Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CNDLive',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cndlive.com/logo.svg',
      },
    },
    description: post.data.description,
  };
}

// src/utils/seo.ts

// ... 保留你之前的 generateProductSchema 和 generateArticleSchema ...

// 🔥 新增：生成列表页 Schema (ItemList)
export function generateItemListSchema(
  title: string,
  posts: any[],
  basePath: string,
  siteUrl: URL,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: new URL(`${basePath}/${post.id}`, siteUrl).toString(),
      name: post.data.title,
    })),
  };
}
