'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Manrope } from 'next/font/google';
import { useCallback, useEffect, useRef, useState } from 'react';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

/* ============================================================
   TYPES
============================================================ */

type Service = {
  title: string;
  image: string;
  tags: string[];
};

type Tool = {
  name: string;
  image: string;
};


/* ============================================================
   SERVICES
============================================================ */

const services: Service[] = [
  {
    title: 'UI/UX Design',
    image: '/images/services/uiux.png',
    tags: [
      'UX Research',
      'Wireframing',
      'Prototyping',
      'Usability Testing',
      'Visual Design',
      'Design Systems',
    ],
  },
  {
    title: 'Graphic Design',
    image: '/images/services/graphic.png',
    tags: [
      'Brand Identity',
      'Packaging',
      'Social Assets',
      'Campaign Design',
      'Typography',
      'Visual Storytelling',
    ],
  },
  {
    title: 'Web Development',
    image: '/images/services/web.png',
    tags: [
      'Frontend',
      'Responsive UI',
      'Performance',
      'Automation',
      'Scalable Builds',
      'Modern Stack',
    ],
  },
  {
    title: 'Mobile Development',
    image: '/images/services/mob.png',
    tags: [
      'Cross-platform',
      'UX First',
      'Clean Code',
      'App Flows',
      'Optimized',
      'Maintenance',
    ],
  },
  {
    title: 'Smart Systems',
    image: '/images/services/smartsystems.png',
    tags: [
      'Machine Learning',
      'Deep Learning',
      'RAG Systems',
      'Data Pipelines',
      'Automation',
      'Insight Generation',
    ],
  },
];


/* ============================================================
   TOOLS
============================================================ */

const tools: Tool[] = [
  {
    name: 'Figma',
    image: '/images/tools/Figma.png',
  },
  {
    name: 'Next.js',
    image: '/images/tools/Next.js.png',
  },
  {
    name: 'React',
    image: '/images/tools/React.png',
  },
  {
    name: 'Tailwind CSS',
    image: '/images/tools/Tailwind CSS.png',
  },
  {
    name: 'Python',
    image: '/images/tools/Python.png',
  },
  {
    name: 'FastAPI',
    image: '/images/tools/FastAPI.png',
  },
  {
    name: 'Flask',
    image: '/images/tools/Flask.png',
  },
  {
    name: 'C++',
    image: '/images/tools/C++ (CPlusPlus).png',
  },
  {
    name: 'C',
    image: '/images/tools/C.png',
  },
  {
    name: 'Arduino',
    image: '/images/tools/Arduino.png',
  },
  {
    name: 'Firebase',
    image: '/images/tools/Firebase.png',
  },
  {
    name: 'Supabase',
    image: '/images/tools/icons8-supabase-48.png',
  },
  {
    name: 'PostgreSQL',
    image: '/images/tools/PostgresSQL.png',
  },
  {
    name: 'SQLite',
    image: '/images/tools/SQLite.png',
  },
  {
    name: 'Oracle',
    image: '/images/tools/Oracle.png',
  },
  {
    name: 'Git',
    image: '/images/tools/Git.png',
  },
  {
    name: 'GitHub',
    image: '/images/tools/GitHub.png',
  },
  {
    name: 'Linux',
    image: '/images/tools/Linux.png',
  },
  {
    name: 'Slack',
    image: '/images/tools/Slack.png',
  },
  {
    name: 'Jira',
    image: '/images/tools/Jira.png',
  },
  {
    name: 'PHP',
    image: '/images/tools/PHP.png',
  },
];


/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function ServicesPage() {
  const servicesRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const servicesSectionRef = useRef<HTMLElement | null>(null);

  const serviceCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const toolCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedService, setSelectedService] =
    useState<number | null>(null);

  const [selectedTool, setSelectedTool] =
    useState<number | null>(null);

  const [serviceIndex, setServiceIndex] = useState(0);
  const [toolIndex, setToolIndex] = useState(0);
  const [isServicesVisible, setIsServicesVisible] = useState(true);

  const resetSelectionState = useCallback(() => {
    setSelectedService(null);
    setSelectedTool(null);
  }, []);


  /* ============================================================
     CENTER SERVICE
  ============================================================ */

  const centerService = (index: number) => {
    const card = serviceCardRefs.current[index];
    const container = servicesRef.current;

    if (!card || !container) return;

    const targetLeft =
      card.offsetLeft -
      (container.clientWidth - card.offsetWidth) / 2;

    container.scrollTo({
      left: targetLeft,
      behavior: 'smooth',
    });
  };


  /* ============================================================
     CENTER TOOL
  ============================================================ */

  const centerTool = (index: number) => {
    const card = toolCardRefs.current[index];
    const container = toolsRef.current;

    if (!card || !container) return;

    const targetLeft =
      card.offsetLeft -
      (container.clientWidth - card.offsetWidth) / 2;

    container.scrollTo({
      left: targetLeft,
      behavior: 'smooth',
    });
  };


  useEffect(() => {
    const section = servicesSectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsServicesVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.25,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* ============================================================
     SERVICES AUTO MOVEMENT
  ============================================================ */

  useEffect(() => {
    if (selectedService !== null || !isServicesVisible) return;

    const interval = window.setInterval(() => {
      setServiceIndex((current) => {
        const next =
          current >= services.length - 1
            ? 0
            : current + 1;

        window.requestAnimationFrame(() => {
          centerService(next);
        });

        return next;
      });
    }, 2000);

    return () => {
      window.clearInterval(interval);
    };
  }, [selectedService, isServicesVisible]);


  /* ============================================================
     TOOLS AUTO MOVEMENT
  ============================================================ */

  useEffect(() => {
    if (selectedTool !== null || !isServicesVisible) return;

    const interval = window.setInterval(() => {
      setToolIndex((current) => {
        const next =
          current >= tools.length - 1
            ? 0
            : current + 1;

        window.requestAnimationFrame(() => {
          centerTool(next);
        });

        return next;
      });
    }, 2000);

    return () => {
      window.clearInterval(interval);
    };
  }, [selectedTool, isServicesVisible]);


  /* ============================================================
     SERVICE CLICK
  ============================================================ */

  const handleServiceClick = (index: number) => {
    setSelectedService(index);
    setServiceIndex(index);

    window.requestAnimationFrame(() => {
      centerService(index);
    });
  };


  /* ============================================================
     TOOL CLICK
  ============================================================ */

  const handleToolClick = (index: number) => {
    setSelectedTool(index);
    setToolIndex(index);

    window.requestAnimationFrame(() => {
      centerTool(index);
    });
  };


  /* ============================================================
     CLICK OUTSIDE
  ============================================================ */

  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) return;

      const clickedInsideServices = servicesRef.current?.contains(target);
      const clickedInsideTools = toolsRef.current?.contains(target);

      if (clickedInsideServices || clickedInsideTools) {
        return;
      }

      resetSelectionState();
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [resetSelectionState]);


  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <main
      className={`
        ${manrope.variable}
        relative
        min-h-screen
        w-full
        max-w-full
        overflow-x-hidden
        bg-[#E9DFFF]
      `}
      style={{
        fontFamily: 'var(--font-manrope)',
      }}
    >

      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ===================================================== */}

      

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          min-h-screen
          w-full
          max-w-[1100px]
          overflow-hidden
          px-5
          pb-12
          pt-[96px]
          sm:px-8
        "
      >

        {/* =====================================================
            TITLE
        ===================================================== */}

        <div className="reveal mb-8 text-center">

          <div className="flex items-center justify-center gap-2">

            <span className="h-[3.5px] w-[24px] bg-[#8662C9]" />

            <p className="text-[13px] font-medium italic text-[#171025]">
              Services
            </p>

          </div>

          <h1
            className="
              mt-0
              text-[28px]
              font-bold
              leading-none
              tracking-[-0.045em]
              text-[#171025]
              sm:text-[30px]
            "
          >
            <span className="italic text-[#8662C9]">
              Services
            </span>{' '}
            | Provide
          </h1>

        </div>


        {/* =====================================================
            SERVICES CAROUSEL
        ===================================================== */}

        <section
          ref={servicesSectionRef}
          id="services"
            className="reveal relative w-full max-w-full scroll-mt-[200px]"
        >

          <div className="relative mx-auto w-full max-w-[920px]">

            {/* LEFT FADE */}

            <div
              className="
                pointer-events-none
                absolute
                inset-y-0
                left-0
                z-20
                w-[100px]
              "
              style={{
                background:
                  'linear-gradient(90deg, #E9DFFF 0%, rgba(233,223,255,0.90) 30%, rgba(233,223,255,0) 100%)',
              }}
            />

            {/* RIGHT FADE */}

            <div
              className="
                pointer-events-none
                absolute
                inset-y-0
                right-0
                z-20
                w-[100px]
              "
              style={{
                background:
                  'linear-gradient(270deg, #E9DFFF 0%, rgba(233,223,255,0.90) 30%, rgba(233,223,255,0) 100%)',
              }}
            />

            {/* SCROLLER */}

            <div
              ref={servicesRef}
              className="
                no-scrollbar
                flex
                w-full
                max-w-full
                items-center
                gap-[18px]
                overflow-x-auto
                overflow-y-hidden
                px-[100px]
                py-[30px]
                scroll-smooth
                snap-x
                snap-mandatory
              "
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >

              {services.map((service, index) => (

                <div
                  key={`${service.title}-${index}`}
                  ref={(element) => {
                    serviceCardRefs.current[index] = element;
                  }}
                  className="shrink-0 snap-center"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >

                  <ServiceCard
                    service={service}
                    active={
                      selectedService === index ||
                      (
                        selectedService === null &&
                        serviceIndex === index
                      )
                    }
                    onClick={() => {
                      handleServiceClick(index);
                    }}
                  />

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* =====================================================
            TOOLS
        ===================================================== */}

        <section className="reveal mt-10 w-full max-w-full ">

          <h2
            className="
              text-center
              text-[14px]
              font-bold
              tracking-[-0.025em]
              text-[#43366A]
            "
          >
            Explore the tools behind my projects
          </h2>


          {/* TOOL CAROUSEL */}

          <div
            className="relative mx-auto mt-5 w-full max-w-[900px] rounded-[18px]"
           
          >

            {/* LEFT FADE */}

            <div
              className="
                pointer-events-none
                absolute
                inset-y-0
                left-0
                z-20
                w-[85px]
              "
              style={{
                background:
                  'linear-gradient(90deg, #E9DFFF 0%, rgba(233,223,255,0.92) 30%, rgba(233,223,255,0) 100%)',
              }}
            />


            {/* RIGHT FADE */}

            <div
              className="
                pointer-events-none
                absolute
                inset-y-0
                right-0
                z-20
                w-[85px]
              "
              style={{
                background:
                  'linear-gradient(-90deg, #E9DFFF 0%, rgba(233,223,255,0.92) 30%, rgba(233,223,255,0) 100%)',
              }}
            />


            {/* TOOL SCROLLER */}

            <div
              ref={toolsRef}
              className="
                no-scrollbar
                flex
                w-full
                max-w-full
                items-center
                gap-7
                overflow-x-auto
                overflow-y-hidden
                px-[80px]
                py-[35px]
                scroll-smooth
                snap-x
                snap-mandatory
              "
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >

              {tools.map((tool, index) => (

                <div
                  key={tool.name}
                  ref={(element) => {
                    toolCardRefs.current[index] = element;
                  }}
                  className="shrink-0"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >

                  <ToolCard
                    tool={tool}
                    active={
                      selectedTool === index ||
                      (
                        selectedTool === null &&
                        toolIndex === index
                      )
                    }
                    onClick={() => {
                      handleToolClick(index);
                    }}
                  />

                </div>

              ))}

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}


/* ============================================================
   SERVICE CARD
============================================================ */

function ServiceCard({
  service,
  active,
  onClick,
}: {
  service: Service;
  active: boolean;
  onClick: () => void;
}) {

  return (
    <article
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={`
        group
        relative
        cursor-pointer
        overflow-hidden
        rounded-[12px]
        p-[5px]
        transition-all
        duration-500
        ease-out

        ${
          active
            ? `
              z-10
              w-[255px]
              bg-gradient-to-b
              from-[#10082B]
              to-[#C3A2F1]
              sm:w-[275px]
            `
            : `
              w-[215px]
              bg-[#10082B]
              opacity-[0.88]
              shadow-[0_7px_18px_rgba(16,8,43,0.16)]
              sm:w-[235px]
            `
        }
      `}
    >

      {/* IMAGE */}

      <div
        className={`
          relative
          overflow-hidden
          rounded-[8px]
          bg-[#160D2B]
          transition-all
          duration-500
          ${
            active
              ? 'h-[118px] sm:h-[125px]'
              : 'h-[100px] sm:h-[105px]'
          }
        `}
      >

        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="275px"
          className="
            object-cover
            transition-transform
            duration-500
            group-hover:scale-[1.04]
          "
        />

        <div
          className={`
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-[#10082B]/25
            to-transparent
            ${
              active
                ? 'opacity-0'
                : 'opacity-40'
            }
          `}
        />

      </div>


      {/* CONTENT */}

      <div className="px-[2px] pb-[4px] pt-[5px]">

        <h3
          className={`
            truncate
            font-bold
            leading-tight
            text-white
            transition-all
            duration-300
            ${
              active
                ? 'text-[16px]'
                : 'text-[14px]'
            }
          `}
        >
          {service.title}
        </h3>


        {/* TAGS */}

        <div
          className={`
            mt-[5px]
            flex
            min-h-[45px]
            flex-wrap
            content-start
            gap-[3px]
            transition-all
            duration-300
            ${
              active
                ? 'min-h-[52px]'
                : ''
            }
          `}
        >

          {service.tags.map((tag, tagIndex) => (

            <span
              key={`${service.title}-${tag}-${tagIndex}`}
              className={`
                rounded-[3px]
                bg-[#E9DFFF]
                px-[5px]
                py-[3px]
                font-medium
                leading-none
                text-[#33274C]
                ${
                  active
                    ? 'text-[8px]'
                    : 'text-[7px]'
                }
              `}
            >
              {tag}
            </span>

          ))}

        </div>


        {/* VIEW MORE */}

        <Link
          href="/#projects"
          onClick={(event) => {
              event.stopPropagation();

              if (typeof window !== 'undefined' && window.location.pathname === '/') {
                event.preventDefault();

                const el = document.getElementById('projects');
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 88;
                  window.scrollTo({ top, left: 0, behavior: 'smooth' });
                } else {
         
                  window.location.hash = 'projects';
                }
              }
            }}
          className={`
            mt-[5px]
            flex
            h-[22px]
            items-center
            justify-center
            rounded-full
            font-medium
            transition-all
            ${
              active
                ? 'bg-[#E9DFFF] text-[8px] text-[#33274C] hover:bg-[#E0D0FF]'
                : 'bg-[#E9DFFF] text-[7.5px] text-[#33274C] hover:bg-[#E0D0FF]'
            }
          `}
        >
          View More

          <span className="ml-[4px]">
            ↗
          </span>

        </Link>

      </div>

    </article>
  );
}


/* ============================================================
   TOOL CARD
============================================================ */

function ToolCard({
  tool,
  active,
  onClick,
}: {
  tool: Tool;
  active: boolean;
  onClick: () => void;
}) {

  return (
    <div
      className="
        group
        relative
        flex
        h-[88px]
        w-[58px]
        shrink-0
        items-start
        justify-center
      "
    >

      {/* TOOL ICON */}

      <button
        type="button"
        aria-label={tool.name}
        onClick={(event) => {
          event.stopPropagation();
          onClick();
        }}
        className="
          relative
          flex
          h-[58px]
          w-[58px]
          items-center
          justify-center
        "
      >

        <span
          className={`
            relative
            flex
            h-[58px]
            w-[58px]
            items-center
            justify-center
            rounded-full
            transition-all
            duration-300
            ${
              active
                ? `
                  scale-[1.1]
                  bg-[#A887D7]
                  shadow-[0_10px_25px_rgba(103,67,160,0.30)]
                `
                : `
                  bg-white
                  shadow-[0_4px_12px_rgba(67,42,105,0.10)]
                  group-hover:scale-105
                  group-hover:shadow-[0_7px_18px_rgba(67,42,105,0.16)]
                `
            }
          `}
        >

          <span
            className="
              relative
              flex
              h-[32px]
              w-[32px]
              items-center
              justify-center
            "
          >

            <Image
              src={tool.image}
              alt={tool.name}
              fill
              sizes="32px"
              className="object-contain"
            />

          </span>

        </span>

      </button>


      {/* TOOL NAME AT BOTTOM */}

      <span
        className={`
          pointer-events-none
          absolute
          left-1/2
          top-[63px]
          z-[60]
          -translate-x-1/2
          whitespace-nowrap
          rounded-full
          bg-[#A887D7]
          px-2.5
          py-1
          text-[8px]
          font-medium
          text-white
          shadow-[0_4px_12px_rgba(103,67,160,0.30)]
          transition-all
          duration-200
          ${
            active
              ? 'top-[67px] opacity-100'
              : 'opacity-0 group-hover:top-[67px] group-hover:opacity-100'
          }
        `}
      >
        {tool.name}
      </span>

    </div>
  );
}