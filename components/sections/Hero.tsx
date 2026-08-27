import Image from 'next/image';
import { Manrope } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});
export default function Hero() {
  return (
    <div
      className={`${manrope.variable} relative min-h-screen overflow-visible bg-[#10082B] pt-24`}
      style={{ fontFamily: 'var(--font-manrope)' }}
    >
      {/* =====================================================
          SHARED BACKGROUND
          ===================================================== */}

      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[140vh] overflow-hidden">
        <Image
          src="/images/hero pic.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-x-0 bottom-0 h-[340px] bg-gradient-to-t from-[#10082B] via-[#10082B]/75 to-transparent" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[280px] bg-gradient-to-t from-[#10082B] via-[#10082B]/85 to-transparent" />

      {/* =====================================================
          HERO
          ===================================================== */}

      <section
        id="home"
        className="relative z-10 min-h-screen w-full scroll-mt-24 text-white"
      >
        <div className="mx-auto flex min-h-screen max-w-[1200px] flex-col px-5 sm:px-8">

          {/* ================= HERO CONTENT ================= */}

          <div className="reveal flex flex-1 flex-col items-center justify-start pt-44 text-center sm:pt-24 lg:pt-20">

            {/* Heading */}
            <h1 className="max-w-[1000px] text-[28px] sm:text-[36px] md:text-[48px] lg:text-[64px] font-bold leading-[1.08] tracking-[-0.045em]">
              Turning ideas into pixels, code,
              <br />
              and a little bit of magic.
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-[620px] text-[14px] font-medium leading-[1.45] text-white/85 sm:text-[15px] lg:text-[16px]">
              From the first wireframe to the final line of code, I create
              <br className="hidden sm:block" />
              products that are polished, purposeful, and built to inspire —
              <br className="hidden sm:block" />
              combining design finesse with technical skill.
            </p>

            {/* Buttons */}
            <div className="mt-12 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="/Asmaa-MOBAREK_cv.pdf"
                download="Asmaa-MOBAREK_cv.pdf"
                className="rounded-full border border-white/20 bg-white/10 px-6 sm:px-12 py-[8px] text-[16px] font-medium text-white shadow-sm backdrop-blur-md transition-all hover:bg-white/20 w-full sm:w-auto text-center"
              >
                Download cv
              </a>

              <a
                href="#contact"
                className="rounded-full border border-white/20 bg-white/10 px-6 sm:px-12 py-[8px] text-[16px] font-medium text-white shadow-sm backdrop-blur-md transition-all hover:bg-white/20 w-full sm:w-auto text-center"
              >
                Contact me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ABOUT
          ===================================================== */}

      <section
        id="about"
        className="relative z-10 min-h-screen w-full scroll-mt-24 bg-transparent text-white"
      >
        <div className="mx-auto grid min-h-screen max-w-[980px] grid-cols-1 items-center gap-5 px-4 pb-10 sm:px-10 md:grid-cols-[320px_1fr] md:gap-12">

          {/* ================= ILLUSTRATION ================= */}

          <div className="relative mx-auto h-[260px] w-[220px] sm:h-[300px] sm:w-[250px] md:mx-0 md:h-[360px] md:w-[300px]">
            <Image
              src="/images/asmaa.png"
              alt="Asmaa picture"
              fill
              sizes="300px"
              className="object-contain"
            />
          </div>

          {/* ================= ABOUT CONTENT ================= */}

          <div className="reveal max-w-[560px]">

            {/* Small title */}
            <div className="mb-1 flex items-center gap-2">
              <span className="h-[2.5px] w-[24px] bg-[#8662C9]" />

              <p className="text-[12px] font-semibold text-white/80">
                About Me
              </p>
            </div>

            {/* Heading */}
            <h2 className="text-[28px] font-bold leading-tight tracking-[-0.025em] sm:text-[44px]">
              Who is{' '}
              <span className="font-medium italic text-[#C3A2F1]">
                Asmaa MOBAREK
              </span>{' '}
              ?
            </h2>

            {/* Description */}
            <p className="mt-4 max-w-[700px] text-[12px] leading-[1.6] text-white/85 sm:mt-6 sm:text-[17px]">
              I&apos;m an <span className="font-semibold text-[#C3A2F1]">AI &amp; Data Science</span> engineering student at ENSIA, focused on understanding problems, finding practical solutions, and creating work that brings real value.
              <br />
              
              My work blends <span className="font-semibold text-[#C3A2F1]">AI</span>, <span className="font-semibold text-[#C3A2F1]">data science</span>, <span className="font-semibold text-[#C3A2F1]">software development</span>, and <span className="font-semibold text-[#C3A2F1]">UI/UX design</span>. I enjoy turning ideas into polished products that are useful, meaningful, and built to make an impact.
            
              <br />
              Through my projects, I&apos;ve explored <span className="font-semibold text-[#C3A2F1]">machine learning</span>, <span className="font-semibold text-[#C3A2F1]">geospatial analysis</span>, <span className="font-semibold text-[#C3A2F1]">time-series forecasting</span>, <span className="font-semibold text-[#C3A2F1]">mobile applications</span>, and <span className="font-semibold text-[#C3A2F1]">user-centered design</span>.
              <br />
          
              Beyond technology, I&apos;m interested in <span className="font-semibold text-[#C3A2F1]">business</span> and <span className="font-semibold text-[#C3A2F1]">entrepreneurship</span>—understanding people, spotting opportunities, and turning ideas into sustainable value.
              <br />
          
              I&apos;m continuously learning and bringing together analytical thinking, creativity, and a practical mindset in everything I build.
            </p>

            {/* ================= STATS ================= */}

            <div className="mt-5 flex items-start gap-3 sm:mt-6 sm:gap-7">

              <div className="min-w-0 flex-1">
                <p className="text-[18px] font-bold text-[#C3A2F1] sm:text-[24px]">
                  +02
                </p>
                <p className="mt-[-1px] text-[10px] leading-snug text-white/75 sm:text-[16px] sm:whitespace-nowrap">
                  Years Of Experience
                </p>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[18px] font-bold text-[#C3A2F1] sm:text-[24px]">
                  +10
                </p>
                <p className="mt-[-1px] text-[10px] leading-snug text-white/75 sm:text-[16px] sm:whitespace-nowrap">
                  Projects Completed
                </p>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[18px] font-bold text-[#C3A2F1] sm:text-[24px]">
                  +6
                </p>
                <p className="mt-[-1px] text-[10px] leading-snug text-white/75 sm:text-[16px] sm:whitespace-nowrap">
                  Industry Covered
                </p>
              </div>
            </div>

            {/* ================= BUTTONS ================= */}

            <div className="mt-5 flex w-full flex-col items-center gap-3 sm:mt-6 sm:flex-row sm:items-center">

              <a
                href="#contact"
                className="flex h-[36px] w-full items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 text-[14px] font-medium text-white backdrop-blur-md transition-all hover:bg-white/20 sm:h-[40px] sm:w-auto sm:text-[16px]"
              >
                Contact me
              </a>

              <a
                href="/Asmaa-MOBAREK_cv.pdf"
                download="Asmaa-MOBAREK_cv.pdf"
                className="flex h-[36px] w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 text-[14px] font-medium text-white backdrop-blur-md transition-all hover:bg-white/20 sm:h-[40px] sm:w-auto sm:text-[16px]"
              >
                Download cv
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[8px] text-[#10082B]">
                  →
                </span>
              </a>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}