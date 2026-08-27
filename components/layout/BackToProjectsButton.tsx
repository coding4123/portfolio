'use client';

import { useRouter } from 'next/navigation';

export default function BackToProjectsButton() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/#projects');
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="group flex items-center gap-3 rounded-full border border-white/15 bg-white/6 px-6 py-3 text-[12px] font-medium text-white/90 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white"
    >
      <span className="transition-transform group-hover:-translate-x-1 text-[12px] leading-none">←</span>
      <span className="leading-none text-[12px]">Back to projects</span>
    </button>
  );
}
