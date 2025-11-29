import React from 'react';
import { CtaButton } from '../atoms/CtaButton';

interface HeroContentProps {
  title: string;
  description: string;
  ctaText: string;
}

export const HeroContent: React.FC<HeroContentProps> = ({ title, description, ctaText }) => {
  return (
    <div className="flex flex-col items-start justify-center space-y-6 max-w-xl z-10">
      <h1 className="w-full text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight capitalize text-center lg:text-left">
        {title}
      </h1>
      <p className="text-base md:text-lg opacity-80 leading-relaxed line-clamp-3">
        {description}
      </p>
      <div className="pt-4 flex justify-center lg:justify-start w-full">
        <CtaButton text={ctaText} />
      </div>
    </div>
  );
};