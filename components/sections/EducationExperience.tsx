import { Manrope } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

function GraduationIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 9.5L12 4L21 9.5L12 15L3 9.5Z"
        fill="#8863D5"
      />
      <path
        d="M6 11.5V16.5C6 16.5 8.5 19 12 19C15.5 19 18 16.5 18 16.5V11.5"
        stroke="#8863D5"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 10V15"
        stroke="#8863D5"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="7"
        width="18"
        height="13"
        rx="2"
        stroke="#8863D5"
        strokeWidth="1.7"
      />
      <path
        d="M8 7V5C8 4.45 8.45 4 9 4H15C15.55 4 16 4.45 16 5V7"
        stroke="#8863D5"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M3 12H21"
        stroke="#8863D5"
        strokeWidth="1.7"
      />
      <path
        d="M10 12V14H14V12"
        stroke="#8863D5"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function EducationExperience() {
  return (
    <section
      id="education"
      className={`${manrope.variable} min-h-screen w-full bg-[#E9DFFF] px-5 py-20 text-[#10082B] sm:px-8 md:py-24`}
      style={{ fontFamily: 'var(--font-manrope)' }}
    >
      <div className="reveal mx-auto max-w-[780px]">

        {/* =====================================================
            SECTION TITLE
            ===================================================== */}

        <div className="mb-12 text-center">

          {/* Small title */}
          <div className="flex items-center justify-center gap-2">
            <span className="h-[4px] w-[24px] bg-[#8662C9]" />

            <p className="text-[11px] font-semibold italic text-[#160D2B]">
              Education And Experience
            </p>
          </div>

          {/* Main title */}
          <h2 className="mx-auto mt-1 max-w-[430px] text-[30px] font-bold leading-[1.05] tracking-[-0.04em] sm:text-[34px]">

            My{' '}

            <span className="italic text-[#8662C9]">
              Academic
            </span>{' '}

            and

            <br />

            <span className="italic text-[#8662C9]">
              Professional
            </span>{' '}

            journey

          </h2>
        </div>


        {/* =====================================================
            CARDS
            ===================================================== */}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* ================= EDUCATION ================= */}

          <div className="min-h-[430px] rounded-[10px] border border-[#D6C8ED] bg-[#E9DFFF] p-3 shadow-[0_3px_10px_rgba(67,42,105,0.15)] transition-transform duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_8px_20px_rgba(67,42,105,0.18)]">

            {/* Card heading */}
            <div className="mb-7 flex items-center gap-3">

              <div className="flex h-[49px] w-[49px] shrink-0 items-center justify-center rounded-full bg-[#E9DFFF]">
                <GraduationIcon />
              </div>

              <h3 className="text-[22px] font-semibold text-[#8863D5]">
                Education
              </h3>

            </div>


            {/* Timeline */}
            <div className="max-h-[360px] space-y-5 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

              


              {/* Education 2 */}
              <div className="relative border-l-[4px] border-[#10082B] pl-3.5">

                <p className="text-[16px] font-semibold leading-none text-[#705B96]">
                  2023 - Present
                </p>

                <p className="mt-1 text-[15px] font-semibold leading-[1.35] text-[#705B96]">
                  The Algerian Higher School of AI
                </p>

                <p className="text-[22px] font-bold leading-[1.25] text-[#8863D5]">
                  AI &amp; Data Science
                  <br />
                  Engineering Student
                </p>

              </div>


               {/* Education 1 */}
              <div className="relative border-l-[4px] border-[#10082B] pl-3.5">

                <p className="text-[16px] font-semibold leading-none text-[#705B96]">
                  2020 - 2023
                </p>

                <p className="mt-1 text-[15px] font-semibold leading-[1.35] text-[#705B96]">
                  Zerrouk Bouchrit High School
                </p>

                <p className="text-[22px] font-bold leading-[1.25] text-[#8863D5]">
                  Baccalaureate Degree
                </p>

              </div>
              

            </div>
          </div>


          {/* ================= EXPERIENCE ================= */}

          <div className="min-h-[430px] rounded-[10px] border border-[#D6C8ED] bg-[#E9DFFF] p-3 shadow-[0_3px_10px_rgba(67,42,105,0.15)] transition-transform duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_8px_20px_rgba(67,42,105,0.18)]">

            {/* Card heading */}
            <div className="mb-7 flex items-center gap-3">

              <div className="flex h-[49px] w-[49px] shrink-0 items-center justify-center rounded-full bg-[#E9DFFF]">
                <BriefcaseIcon />
              </div>

              <h3 className="text-[22px] font-semibold text-[#8863D5]">
                Work Experience
              </h3>

            </div>

            
            {/* Timeline */}
            <div className="max-h-[360px] space-y-5 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              
              <div className="relative border-l-[4px] border-[#10082B] pl-3.5">

                <p className="text-[16px] font-semibold leading-none text-[#705B96]">
                  Sep - 2026
                </p>

                <p className="mt-1 text-[15px] font-semibold leading-[1.35] text-[#705B96]">
                  Sonatrach
                </p>

                <p className="text-[22px] font-bold leading-[1.25] text-[#8863D5]">
                  AI & Data Science intern
                </p>

              </div>
              <div className="relative border-l-[4px] border-[#10082B] pl-3.5">

                <p className="text-[16px] font-semibold leading-none text-[#705B96]">
                  Sep - 2025
                </p>

                <p className="mt-1 text-[15px] font-semibold leading-[1.35] text-[#705B96]">
                  Elevvo Pathways
                </p>

                <p className="text-[22px] font-bold leading-[1.25] text-[#8863D5]">
                  UI/UX intern
                </p>

              </div>

              <div className="relative border-l-[4px] border-[#10082B] pl-3.5">

                <p className="text-[16px] font-semibold leading-none text-[#705B96]">
                  2024 - 2025
                </p>

                <p className="mt-1 text-[15px] font-semibold leading-[1.35] text-[#705B96]">
                  @apeak_shop
                </p>

                <p className="text-[22px] font-bold leading-[1.25] text-[#8863D5]">
                  Owner, Social media
                  <br />
                  manager
                </p>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}