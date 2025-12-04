// 文件位置: src/components/product/index.ts

import Title from './ProductTitle.astro';
import Hero from './ProductHeroSection.astro';
import HeroImg from './HeroImg.astro';
import PostImage from '@/components/mdx/PostImage.astro';
import LottieBox from '@/components/animation/LottieBox.astro';

// ✅ 这里的核心是导出一个对象，包含了所有子组件
export const ProductOverview = {
  Title: Title,
  Hero: Hero,
  HeroImg: HeroImg,
  PostImage: PostImage,
  LottieBox: LottieBox,
};
