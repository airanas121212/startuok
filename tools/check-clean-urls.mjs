import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] ?? '.');
const files = [];
const failures = [];
const indexPath = /(?:^|\/)index\.html(?:[?#]|$)/i;

async function walk(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(entryPath);
    } else if (/\.(?:html|xml)$/i.test(entry.name)) {
      files.push(entryPath);
    }
  }
}

function lineNumber(source, offset) {
  return source.slice(0, offset).split('\n').length;
}

function report(file, source, offset, context, value) {
  failures.push(
    `${path.relative(root, file)}:${lineNumber(source, offset)} ${context}: ${value}`
  );
}

function attributes(tag) {
  const values = new Map();
  const pattern = /\b([\w:-]+)\s*=\s*(["'])(.*?)\2/gis;
  for (const match of tag.matchAll(pattern)) {
    values.set(match[1].toLowerCase(), match[3]);
  }
  return values;
}

function checkHtml(file, source) {
  const content = source.replace(/<!--[\s\S]*?-->/g, '');

  for (const match of content.matchAll(/\b(href|action)\s*=\s*(["'])(.*?)\2/gis)) {
    if (indexPath.test(match[3])) {
      report(file, content, match.index, `${match[1]} URL`, match[3]);
    }
  }

  for (const match of content.matchAll(/<meta\b[^>]*>/gis)) {
    const values = attributes(match[0]);
    if ((values.get('property') ?? '').toLowerCase() !== 'og:url') continue;
    const value = values.get('content') ?? '';
    if (indexPath.test(value)) {
      report(file, content, match.index, 'Open Graph URL', value);
    }
  }

  for (const match of content.matchAll(
    /<script\b[^>]*type\s*=\s*(["'])application\/ld\+json\1[^>]*>([\s\S]*?)<\/script>/gi
  )) {
    if (/(?:^|\/)index\.html(?:[?#"'\s]|$)/i.test(match[2])) {
      report(file, content, match.index, 'structured data', '/index.html');
    }
  }
}

function checkXml(file, source) {
  for (const match of source.matchAll(/<loc>(.*?)<\/loc>/gis)) {
    const value = match[1].trim();
    if (indexPath.test(value)) {
      report(file, source, match.index, 'sitemap URL', value);
    }
  }
}

await walk(root);

for (const file of files) {
  const source = await fs.readFile(file, 'utf8');
  if (/\.html$/i.test(file)) checkHtml(file, source);
  else checkXml(file, source);
}

if (failures.length) {
  console.error('Clean URL check failed:\n' + failures.map((item) => `- ${item}`).join('\n'));
  process.exit(1);
}

console.log(`Clean URL check passed (${files.length} public HTML/XML files).`);
