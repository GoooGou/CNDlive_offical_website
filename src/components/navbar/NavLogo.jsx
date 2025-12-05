// src/components/navbar/NavLogo.jsx
import React from 'react';
import LottieReact from 'lottie-react';
import logoAnimation from '../../assets/logo.json'; // 确保路径正确

// 修复 Vite/Astro 环境下的 ESM 导出问题
const Lottie = LottieReact.default || LottieReact;

export default function NavLogo() {
  return (
    <a href="/" className="block">
      <div className="h-20 w-32 md:-mt-4 md:w-40">
        <Lottie animationData={logoAnimation} loop={true} autoplay={true} />
      </div>
    </a>
  );
}
