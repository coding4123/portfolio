import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Project = {
  slug: string;
  title: string;
  summary: string;
  role?: string;
  timeline?: string;
  team?: string;
  category: string;
  featured?: boolean;
  image: string;
  images: string[];
  tags: string[];
  tools: string[];
  behanceUrl?: string;
  content: string;
};

const projectsDirectory = path.join(
  process.cwd(),
  'content',
  'projects'
);

/* ============================================================
   FIND ALL MDX FILES
============================================================ */

function getAllMdxFiles(directory: string): string[] {
  const entries = fs.readdirSync(directory, {
    withFileTypes: true,
  });

  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(
      directory,
      entry.name
    );

    if (entry.isDirectory()) {
      files.push(
        ...getAllMdxFiles(fullPath)
      );
    }

    if (
      entry.isFile() &&
      entry.name.endsWith('.mdx')
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

/* ============================================================
   PARSE PROJECT
============================================================ */

function parseProject(
  filePath: string
): Project {
  const fileContent = fs.readFileSync(
    filePath,
    'utf8'
  );

  const { data, content } =
    matter(fileContent);

  const filenameSlug = path
    .basename(filePath, '.mdx')
    .toLowerCase();

  const slug = String(
    data.slug ?? filenameSlug
  );

  const normalizedImages = (() => {
    const rawValues = [
      data.images,
      data.gallery,
      data.image,
    ].flatMap((value) => {
      if (Array.isArray(value)) return value.map(String);
      if (typeof value === 'string') {
        return value
          .split(/\r?\n|,/) 
          .map((item) => item.trim())
          .filter(Boolean);
      }
      return [];
    });

    return rawValues.filter(Boolean);
  })();

  const primaryImage = (() => {
    const rawImage = data.image;

    if (Array.isArray(rawImage)) {
      return String(rawImage[0] ?? '').trim();
    }

    if (typeof rawImage === 'string') {
      return rawImage.trim();
    }

    return '';
  })();

  return {
    slug,

    title: String(
      data.title ?? 'Untitled Project'
    ),

    summary: String(
      data.summary ?? ''
    ),

    role: data.role
      ? String(data.role)
      : undefined,

    timeline: data.timeline
      ? String(data.timeline)
      : undefined,

    team: data.team
      ? String(data.team)
      : undefined,

    category: String(
      data.category ?? 'Other'
    ),

    featured:
      data.featured === true,

    image: primaryImage || normalizedImages[0] || '',

    images: normalizedImages,

    tags: (() => {
      if (Array.isArray(data.tags)) return data.tags.map(String);
      if (typeof data.tags === 'string') {
        return data.tags
          .split(/\r?\n|,|\s-\s/) // split on newlines, commas, or ' - '
          .map((s) => s.replace(/^\s*[-*]\s*/, '').trim())
          .filter(Boolean);
      }
      return [];
    })(),

    tools: (() => {
      if (Array.isArray(data.tools)) return data.tools.map(String);
      if (typeof data.tools === 'string') {
        return data.tools
          .split(/\r?\n|,|\s-\s/) // split on newlines, commas, or ' - '
          .map((s) => s.replace(/^\s*[-*]\s*/, '').trim())
          .filter(Boolean);
      }
      return [];
    })(),

    behanceUrl: data.behanceUrl
      ? String(data.behanceUrl)
      : data.behance
        ? String(data.behance)
        : undefined,

    content,
  };
}

/* ============================================================
   GET ALL PROJECTS
============================================================ */

export function getProjects(): Project[] {
  const files = getAllMdxFiles(projectsDirectory);

  return files
    .map(parseProject)
    .filter((project) => project.slug && project.title)
    .sort((a, b) => {
      const getPriority = (project: Project) => {
        const slug = project.slug.toLowerCase();

        if (slug === 'ratee-posts') return 0;
        if (slug === 'ratee') return 1;
        if (project.category === 'Machine Learning') return 2;

        return 3;
      };

      return getPriority(a) - getPriority(b);
    });
}

/* ============================================================
   GET PROJECT BY SLUG
============================================================ */

export function getProjectBySlug(
  slug: string
): Project | null {
  const projects = getProjects();

  /*
   * Decode the URL in case the slug has
   * been encoded by the browser.
   */
  const decodedSlug = decodeURIComponent(slug);

  return (
    projects.find(
      (project) =>
        project.slug.toLowerCase() ===
        decodedSlug.toLowerCase()
    ) ?? null
  );
}