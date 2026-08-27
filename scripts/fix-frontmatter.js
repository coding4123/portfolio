import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

function getAllMdxFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...getAllMdxFiles(fullPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }

  return files;
}

function fixFrontmatterAsteriskLists(content) {
  const firstMarker = content.indexOf('---');

  if (firstMarker !== 0) {
    return { changed: false, content };
  }

  const secondMarker = content.indexOf('\n---', firstMarker + 3);

  if (secondMarker === -1) {
    return { changed: false, content };
  }

  const frontMatter = content.slice(0, secondMarker + 4);
  const body = content.slice(secondMarker + 4);

  let fixedFront = frontMatter.replace(/^([ \t]*)\*\s+(.*)$/gm, '$1- $2');
  fixedFront = fixedFront.replace(/^([ \t]*)-(\S)/gm, '$1- $2');

  const newContent = fixedFront + body;

  return {
    changed: newContent !== content,
    content: newContent,
  };
}

const projectsDir = path.join(process.cwd(), 'content', 'projects');
const files = getAllMdxFiles(projectsDir);
const changedFiles = [];
const errors = [];

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  const { changed, content } = fixFrontmatterAsteriskLists(original);

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    changedFiles.push(file);
  }
}

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');

  try {
    matter(source);
  } catch (error) {
    errors.push({ file, error: String(error.message) });
  }
}

console.log('changedFiles:', changedFiles.length);
for (const file of changedFiles) {
  console.log('  ', file);
}

if (errors.length) {
  console.error('\nerrors during parsing:');
  for (const error of errors) {
    console.error(' -', error.file, '\n   ', error.error);
  }
  process.exit(2);
}

console.log('\nAll files parsed successfully.');
process.exit(0);
