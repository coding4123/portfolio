import { Manrope } from 'next/font/google';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import BackToProjectsButton from '@/components/layout/BackToProjectsButton';
import Footer from '@/components/layout/SiteFooter';
import ProjectPhotoLightbox from '@/components/ui/ProjectPhotoLightbox';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

const projectDir = path.join(process.cwd(), 'content/projects');

function parseChallengeFromMarkdown(markdown: string) {
  const match = markdown.match(/##\s*The Challenge\s*[\r\n]+(?:>\s*)?([\s\S]*?)(?:\n\s*\n|$)/);

  if (!match) {
    return '';
  }

  return match[1]
    .replace(/^>\s*/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseOverviewFromMarkdown(markdown: string) {
  const match = markdown.match(/##\s*Overview\s*[\r\n]+([\s\S]*?)(?:\n##\s|$)/);

  if (!match) {
    return '';
  }

  return match[1]
    .replace(/\*\*|[#>*_`\-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseMethodologyFromMarkdown(markdown: string) {
  const match = markdown.match(/##\s*Methodology\s*[\r\n]+([\s\S]*?)(?:\n##\s|\n---\s*$|$)/);

  if (!match) {
    return [] as { title: string; description: string }[];
  }

  const lines = match[1]
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => /^(?:#{1,6}\s*)?\d+\./.test(line));

  return lines.map((line, index) => {
    const cleaned = line.replace(/^(?:#{1,6}\s*)?\d+\.\s*/, '').trim();

    // If the line starts with a bolded title like **TITLE** rest, prefer that as the title
    const boldMatch = cleaned.match(/^\*\*(.+?)\*\*\s*(.*)$/);

    if (boldMatch) {
      const titleRaw = boldMatch[1].trim();
      const descriptionRaw = boldMatch[2].trim();

      const title = titleRaw.replace(/\*+/g, '').trim();
      const description = descriptionRaw.replace(/\*+/g, '').trim() || 'Core process step.';

      return {
        title,
        description,
      };
    }

    // Prefer splitting title and description on common separators
    const parts = cleaned.split(/\s*(?:[:–—]| - )\s*/);
    let title = parts[0] ? parts[0].trim() : `Step ${index + 1}`;
    let description = parts.slice(1).join(' ').trim() || 'Core process step.';

    // Remove any residual markdown emphasis or code markers
    title = title.replace(/\*+/g, '').replace(/`/g, '').trim();
    description = description.replace(/\*+/g, '').replace(/`/g, '').trim();

    return {
      title,
      description,
    };
  });
}

async function getProject(slug: string) {
  async function findFile(directory: string): Promise<string | null> {
    const entries = await fs.readdir(/* turbopackIgnore: true */ directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        const result = await findFile(fullPath);

        if (result) {
          return result;
        }
      }

      if (entry.isFile() && entry.name.endsWith('.mdx')) {
        const fileContent = await fs.readFile(/* turbopackIgnore: true */ fullPath, 'utf8');
        const { data } = matter(fileContent);

        const fileSlug = String(data.slug ?? path.basename(entry.name, '.mdx'));

        if (fileSlug === slug) {
          return fullPath;
        }
      }
    }

    return null;
  }

  const filePath = await findFile(projectDir);

  if (!filePath) {
    return null;
  }

  const fileContent = await fs.readFile(/* turbopackIgnore: true */ filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    data,
    content,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const data = project.data as Record<string, string | string[] | undefined>;
  const title = String(data.title ?? slug.replace(/-/g, ' '));
  const category = String(data.category ?? 'Product Design');
  const year = String(data.year ?? '2025');
  const summary = String(data.summary ?? data.description ?? '');
  const galleryImages = (() => {
    const rawValues = [data.images, data.gallery, data.image, data.heroImage].flatMap((value) => {
      if (Array.isArray(value)) return value.map(String);
      if (typeof value === 'string') {
        return value
          .split(/\r?\n|,/) 
          .map((item) => item.trim())
          .filter(Boolean);
      }
      return [];
    });

    return [...new Set(rawValues.filter(Boolean))];
  })();
  const role = String(data.role ?? 'Product Designer');
  const timeline = String(data.timeline ?? '12 Weeks');
  const team = String(data.team ?? 'Solo Project');
  const tools = Array.isArray(data.tools) ? data.tools.map(String) : [];
  const markdown = project.content ?? '';
  const challenge = String(data.challenge ?? parseChallengeFromMarkdown(markdown)).trim();
  const overviewText = parseOverviewFromMarkdown(markdown) || summary;
  const methodologySteps = parseMethodologyFromMarkdown(markdown);

  return (
    <main
      className={`${manrope.variable} relative min-h-screen overflow-hidden bg-[#10082B] text-white`}
      style={{ fontFamily: 'var(--font-manrope)' }}
    >
      <div className="absolute inset-x-0 top-30 z-40">
        <div className="mx-auto max-w-[1000px] px-5">
          <div className="flex justify-start">
            <BackToProjectsButton />
          </div>
        </div>
      </div>
      <section className="relative z-10 pt-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[780px] overflow-hidden">
          <div className="absolute left-1/2 top-[180px] h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-[#7043B8]/20 blur-[130px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#10082B] via-[#10082B]/80 to-[#10082B]" />
        </div>

        <div className="mx-auto max-w-[1000px] px-5 pb-16 pt-[90px] sm:px-8 sm:pt-[105px]">
          <div className="flex items-center justify-center gap-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            <span className="text-[#C3A2F1]">{category}</span>
            <span className="text-white/40">/</span>
            <span>{year}</span>
          </div>

          <h1 className="mx-auto mt-4 max-w-[780px] text-center text-[32px] font-bold  leading-[1.05] tracking-[-0.045em] sm:text-[48px] md:text-[58px]">
            {title}
          </h1>

          {summary && (
            <p className="mx-auto mt-5 max-w-[560px] text-center text-[24px] font-medium leading-[1.5] text-white/80 sm:text-[16px]">
              {summary}
            </p>
          )}

          {galleryImages.length > 0 && (
            <div className="mt-8">
              {/* <div className="mb-4 flex items-center justify-center gap-2">
                <span className="h-px w-5 bg-[#C3A2F1]" />
                <h2 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white">
                  Project Photos
                </h2>
                <span className="h-px w-5 bg-[#C3A2F1]" />
              </div> */}

              <ProjectPhotoLightbox images={galleryImages} title={title} />
            </div>
          )}

          <div className="mt-6 flex items-center justify-center gap-2">
            <a
              href="#overview"
              className="flex h-[40px]  items-center rounded-full border border-[#C3A2F1]/30 bg-[#C3A2F1]/10 px-4 text-[12px] font-medium text-[#C3A2F1] no-underline visited:text-[#C3A2F1] transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#C3A2F1]/20 hover:shadow-[0_0_0_1px_rgba(195,162,241,0.2)] focus:text-[#C3A2F1] focus-visible:outline-none"
            >
              Overview
            </a>

            <a
              href="#methodology"
              className="flex h-[40px] items-center rounded-full border border-white/10 bg-white/[0.03] px-4 text-[12px] text-white/40 no-underline visited:text-white/40 transition-all duration-200 hover:-translate-y-[1px] hover:bg-white/8 hover:text-white/70 focus:text-white/40 focus-visible:outline-none"
            >
              Process
            </a>
          </div>
        </div>
      </section>

      <section id="overview" className="relative border-t border-white/10 bg-[#10082B]">
        <div className="mx-auto max-w-[1000px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="h-px w-5 bg-[#C3A2F1]" />
                <h2 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white">
                  Overview
                </h2>
              </div>

              <p className="max-w-[570px] text-[14px] leading-[1.7] text-white/80">
                {overviewText}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-7">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white">
                  Role
                </p>
                <p className="text-[10px] font-medium text-white/80">{role}</p>
              </div>

              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white">
                  Timeline
                </p>
                <p className="text-[10px] font-medium text-white/80">{timeline}</p>
              </div>

              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white ">
                  Team
                </p>
                <p className="text-[10px] font-medium text-white/80">{team}</p>
              </div>

              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white">
                  Tools
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {tools.map((tool: string) => (
                    <span
                      key={tool}
                      className="rounded-full border border-white/20 bg-white/5 px-2 py-1 text-[8px] text-white/80 transition-colors duration-200 hover:bg-[#C3A2F1] hover:text-[#10082B] cursor-pointer"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {challenge && (
            <div className="relative mt-14 overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.045] p-7 sm:p-9">
              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#8D5BCB]/20 blur-[70px]" />

              <div className="relative">
                <div className="mb-4 inline-flex rounded-full border border-[#C3A2F1]/20 bg-[#C3A2F1]/10 px-3 py-1 text-[12px] font-medium uppercase tracking-[0.15em] text-[#C3A2F1]">
                  The Challenge
                </div>
                <h3 className="max-w-[700px] text-[20px] font-bold leading-[1.15] tracking-[-0.035em] text-white sm:text-[25px]">
                  {challenge}
                </h3>
              </div>
            </div>
          )}

          {methodologySteps.length > 0 && (
            <div id="methodology" className="relative mt-14 overflow-hidden rounded-[18px] border border-white/10 bg-[#110c22]/80 p-6 sm:p-8">
              <div className="pointer-events-none absolute -left-20 top-8 h-40 w-40 rounded-full bg-[#8D5BCB]/20 blur-[70px]" />

              <div className="relative">
                <div className="mb-6 inline-flex rounded-full border border-[#C3A2F1]/20 bg-[#C3A2F1]/10 px-3 py-1 text-[12px] font-medium uppercase tracking-[0.15em] text-[#C3A2F1]">
                  Methodology
                </div>

                <div className="flex flex-col items-center gap-5">
                  {methodologySteps.map((step, index) => (
                    <div key={`${step.title}-${index}`} className="relative w-full max-w-[720px] pl-[52px]">
                      <div className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border border-[#C3A2F1]/40 bg-[#C3A2F1]/10 text-[12px] font-semibold text-[#C3A2F1]">
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      <div className="relative">
                        <div className="flex min-h-[120px] w-full flex-col items-start justify-start rounded-[16px] border border-[#C3A2F1]/25 bg-[#1A1233] p-4 text-left shadow-[0_0_0_1px_rgba(195,162,241,0.08)]">
                          <p className="text-[14px] font-semibold uppercase tracking-[0.08em] text-[#EADBFF]">
                            {step.title}
                          </p>
                          <p className="mt-2 text-[14px] font-medium leading-[1.6] text-white/75">
                            {step.description}
                          </p>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* <section className="border-t border-white/10 bg-[#0D0724]">
        <div className="mx-auto max-w-[850px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-white/65 prose-p:text-[11px] prose-p:leading-[1.75] prose-a:text-[#C3A2F1]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
          </div>
        </div>
      </section> */}

      <section className="border-t border-white/10 bg-[#10082B]">
        <div className="mx-auto flex max-w-[1000px] justify-center px-5 py-12 sm:px-8">
          <BackToProjectsButton />
        </div>
      </section>

      <Footer />
    </main>
  );
}
