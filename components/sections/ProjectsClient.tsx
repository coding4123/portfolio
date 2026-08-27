'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Manrope } from 'next/font/google';
import type { Project } from '@/lib/Projects';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

type ProjectsClientProps = {
  projects: Project[];
};

export default function ProjectsClient({
  projects,
}: ProjectsClientProps) {
  const DEFAULT_VISIBLE = 6;
  const pendingScrollTopRef = useRef<number | null>(null);
  const getResponsiveInitialVisible = () => {
    if (typeof window === 'undefined') {
      return DEFAULT_VISIBLE;
    }

    return window.innerWidth <= 1024 ? 6 : DEFAULT_VISIBLE;
  };
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [initialVisible, setInitialVisible] = useState<number>(
    getResponsiveInitialVisible()
  );
  const [visibleCount, setVisibleCount] = useState<number>(
    getResponsiveInitialVisible()
  );

  /*
   * Categories are generated automatically
   * from the category field in your MDX files.
   */
  const categoryOrder = [
    'ALL',
    'Machine Learning',
    'Mobile Dev',
    'Web Development',
    'Graphic Design',
    'UI/UX',
    'Other',
  ];

  const categories = categoryOrder.filter(
    (category) =>
      category === 'ALL' ||
      projects.some((project) => project.category === category)
  );

  const categoryLabels: Record<string, string> = {
    ALL: 'All',
    'Machine Learning': 'Machine Learning',
    'Mobile Dev': 'Mobile Dev',
    'Web Development': 'Web Dev',
    'Graphic Design': 'Graphic Design',
    'UI/UX': 'UI/UX',
    Other: 'Other',
  };

  /*
   * Filter projects according to the
   * currently selected category.
   */
  const filteredProjects =
    activeCategory === 'ALL'
      ? projects
      : projects.filter(
        (project) =>
          project.category === activeCategory
      );

  const visibleProjects = filteredProjects.slice(
    0,
    visibleCount
  );
  const hasMoreProjects =
    visibleCount < filteredProjects.length;

  useEffect(() => {
    if (pendingScrollTopRef.current === null) {
      return;
    }

    const targetScrollTop =
      pendingScrollTopRef.current;
    pendingScrollTopRef.current = null;

    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: targetScrollTop,
        left: 0,
        behavior: 'auto',
      });
    });
  }, [visibleCount, activeCategory]);

  return (
    <main
      id="projects"
      className={`${manrope.variable} min-h-screen scroll-mt-24 overflow-hidden bg-[#10082B]`}
      style={{ fontFamily: 'var(--font-manrope)' }}
    >
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ===================================================== */}

      

      {/* =====================================================
          PAGE
      ===================================================== */}

      <div className="reveal relative z-10 mx-auto min-h-screen max-w-[1000px] px-5 pb-16 pt-12 sm:px-8">

        {/* =====================================================
            PAGE TITLE
        ===================================================== */}

        <div className="mb-8 text-center">

          <div className="flex items-center justify-center gap-2">

            <span className="h-[3.5px] w-[24px] bg-[#8662C9]" />

            <p className="text-[13px] font-medium italic text-[#FFFFFF]/90">
              Projects
            </p>

          </div>

          <h1
            className="
              mt-0
              text-[28px]
              font-bold
              leading-none
              tracking-[-0.045em]
              text-[#FFFFFF]
              sm:text-[30px]
            "
          >
            <span className="italic text-[#8662C9]">
              Projects
            </span>{' '}
            | Wroked On
          </h1>

        </div>


        {/* =====================================================
            CATEGORY FILTER
        ===================================================== */}

          <div className="mb-6 flex h-[40px] w-full items-center rounded-full bg-[#E8DEFA] px-[5px] shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
          <div className="flex flex-1 items-center justify-start gap-5 overflow-x-auto no-scrollbar px-3 sm:justify-center sm:gap-10">
            {categories.map((category) => {
              const active = activeCategory === category;
              const label = categoryLabels[category] ?? category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    const nextInitialVisible = getResponsiveInitialVisible();
                    setActiveCategory(category);
                    setInitialVisible(nextInitialVisible);
                    setVisibleCount(nextInitialVisible);
                  }}
                  className={`relative shrink-0 px-1 py-1 text-[10px] font-semibold transition-all sm:text-[14px] ${active
                      ? 'text-[#171025]'
                      : 'text-[#171025]/75 hover:text-[#171025]'
                    }`}
                >
                  {label}

                  {active && (
                    <span className="absolute bottom-[-1px] left-1/2 h-[1px] w-[27px] -translate-x-1/2 bg-[#171025]" />
                  )}
                </button>
              );
            })}
          </div>

        </div>

        {/* =====================================================
            PROJECT GRID
        ===================================================== */}

        <div className="grid grid-cols-1 gap-[10px] sm:grid-cols-2 lg:grid-cols-3">

          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
            />
          ))}

        </div>

        {hasMoreProjects ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() =>
                setVisibleCount((current) =>
                  Math.min(current + 6, filteredProjects.length)
                )
              }
              className="rounded-full border border-white/20 bg-white/10 px-5 py-[7px] text-[11px] font-medium text-white shadow-sm backdrop-blur-md transition-all hover:bg-white/20"
            >
              Show more
            </button>
          </div>
        ) : filteredProjects.length > initialVisible ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => {
                pendingScrollTopRef.current = window.scrollY;
                setVisibleCount(initialVisible);
              }}
              className="rounded-full border border-white/20 bg-white/10 px-5 py-[7px] text-[11px] font-medium text-white shadow-sm backdrop-blur-md transition-all hover:bg-white/20"
            >
              Hide projects
            </button>
          </div>
        ) : null}

        {/* =====================================================
            EMPTY STATE
        ===================================================== */}

        {filteredProjects.length === 0 && (
          <div className="flex min-h-[250px] items-center justify-center">
            <p className="text-[11px] text-white/50">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

/* ============================================================
   PROJECT CARD
============================================================ */

function ProjectCard({
  project,
}: {
  project: Project;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const isBehanceProject =
    project.category === 'UI/UX' ||
    project.category === 'UI/UX Design' ||
    project.category === 'Graphic Design' ||
    project.category === 'Graphic';

  const projectHref = isBehanceProject
    ? project.behanceUrl ?? 'https://www.behance.net/asmaxx'
    : `/projects/${project.slug}`;

  const target = isBehanceProject ? '_blank' : undefined;
  const rel = isBehanceProject ? 'noopener noreferrer' : undefined;

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <article className={`reveal ${isVisible ? 'is-visible' : ''} group overflow-hidden rounded-[13px] border border-[#D6C8ED] bg-[#E7DDF8] p-[5px] shadow-[0_3px_10px_rgba(67,42,105,0.15)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px] hover:scale-[1.01] hover:shadow-[0_8px_20px_rgba(67,42,105,0.18)]`}>

      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div className="relative h-[135px] overflow-hidden rounded-[9px] bg-[#160F26]">

        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px h-[200px ]) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[10px] text-white/40">
            No image
          </div>
        )}

      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="px-[1px] pb-[1px] pt-[6px]">

        {/* Title */}

        <h2 className="truncate px-[1px] text-[16px] font-bold leading-tight tracking-[-0.025em] text-[#171025]">
          {project.title}
        </h2>

        {/* Tags */}

        <div className="mt-[7px] flex min-h-[38px] flex-wrap content-start gap-x-[6px] gap-y-[4px] px-[1px]">

          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#2B1E44]/10 bg-transparent px-[7px] py-[4px] text-[10px] font-medium leading-none text-[#302743]/90"
            >
              {tag}
            </span>
          ))}

        </div>

        {/* CTA */}

        <a
          href={projectHref}
          target={target}
          rel={rel}
          className="mt-[7px] flex h-[21px] items-center justify-center rounded-full bg-[#10082B] text-[10px] font-medium text-white transition-all hover:bg-[#21134B]"
        >
          View project
          <span className="ml-[3px] text-[10px]">
            ↗
          </span>
        </a>

      </div>
    </article>
  );
}