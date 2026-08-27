"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('home');

  const routeActiveSection = pathname.startsWith('/projects')
    ? 'projects'
    : pathname === '/contact'
      ? 'contact'
      : null;

  const resolvedActiveSection = routeActiveSection ?? activeSection;

  useEffect(() => {
    if (pathname !== '/') {
      return;
    }

    const sectionIds = [
      'home',
      'about',
      'projects',
      'services',
      'education',
      'contact',
    ];

    const updateActiveSection = () => {
      const sections = sectionIds
        .map((sectionId) => document.getElementById(sectionId))
        .filter((section): section is HTMLElement => Boolean(section));

      if (!sections.length) {
        return;
      }

      const triggerPoint = window.scrollY + 220;
      let currentSection = sections[0].id;

      for (const section of sections) {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;

        if (sectionTop <= triggerPoint) {
          currentSection = section.id;
        }
      }

      setActiveSection(currentSection);
    };

    let frameId = 0;
    const handleScroll = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.cancelAnimationFrame(frameId);
    };
  }, [pathname]);

  const linkClass = (sectionId: string) =>
    `transition-all duration-200 hover:opacity-100 ${
      resolvedActiveSection === sectionId
        ? isLightSection
          ? 'font-semibold text-[#3A2B57]'
          : 'font-semibold text-[#F2E7FF] drop-shadow-[0_0_12px_rgba(195,162,241,0.6)]'
        : isLightSection
          ? 'text-[#3A2B57]/55'
          : 'text-white/55'
    }`;

  const isLightSection =
    resolvedActiveSection === 'services' ||
    resolvedActiveSection === 'education' ||
    resolvedActiveSection === 'contact';

  return (
    <header className="fixed left-0 right-0 top-4 z-50">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-10 lg:px-14">
        <nav
          className={`relative flex h-[42px] w-full items-center justify-between rounded-full px-5 shadow-lg backdrop-blur-xl transition-colors duration-300 overflow-hidden ${
            isLightSection
              ? 'border border-[#D8CAE7]/80 bg-[#F5EEF9]/70'
              : 'border border-white/10 bg-white/10'
          }`}
        >
          <Link
            href="/"
            className="relative flex h-[30px] w-[40px] shrink-0 items-center"
          >
            <Image
              src="/images/logo.png"
              alt="Asmaa logo"
              fill
              className="object-contain"
            />
          </Link>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-[11px] font-medium sm:flex">
            <a href="#home" className={linkClass('home')}>
              Home
            </a>
            <a href="#about" className={linkClass('about')}>
              About Me
            </a>
            <a href="#projects" className={linkClass('projects')}>
              Projects
            </a>
            <a href="#services" className={linkClass('services')}>
              Services
            </a>
          </div>

          <a
            href="#contact"
            className={`rounded-full px-4 py-[6px] text-[10px] font-medium backdrop-blur-md transition-all hover:opacity-90 ${
              isLightSection
                ? 'border border-[#BDAED6]/80 bg-[#F7F1FB]/90 text-[#3A2B57]'
                : 'border border-white/25 bg-white/15 text-white'
            }`}
          >
            contact me
          </a>
        </nav>
      </div>
    </header>
  );
}
