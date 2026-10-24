import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';
import { load } from 'js-yaml';

const origin = 'https://winki.win';
const productIds = [
  'aesthetic-calculator',
  'chronicle',
  'flip-timer',
  'focus-one',
  'meowtalkie',
  'photo-swipe-cleaner',
  'deliseek',
  'vocaltrans',
  'aitrans',
];
const demos = [
  '/services/',
  '/pricing/',
  '/homes/mobile-app/',
  '/homes/personal/',
  '/homes/saas/',
  '/homes/startup/',
  '/landing/click-through/',
  '/landing/lead-generation/',
  '/landing/pre-launch/',
  '/landing/product/',
  '/landing/sales/',
  '/landing/subscription/',
];
const attribute = (node, name) => node.attrs?.find((attr) => attr.name === name)?.value;
const walk = (node) => [node, ...(node.childNodes || []).flatMap(walk)];
const text = (node) => (node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join(''));
const normalize = (path) => (path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`);

export function inspectPage(html, path, inSitemap = false) {
  const nodes = walk(parse(html));
  const main = nodes.find((node) => node.tagName === 'main');
  const mainNodes = main ? walk(main) : [];
  const head = nodes.find((node) => node.tagName === 'head');
  const headNodes = head ? walk(head) : [];
  const metas = headNodes.filter((node) => node.tagName === 'meta');
  const meta = (name) => metas.find((node) => attribute(node, 'name') === name || attribute(node, 'property') === name);
  const title = text(headNodes.find((node) => node.tagName === 'title') || {}).trim();
  const canonical = attribute(
    headNodes.find((node) => node.tagName === 'link' && attribute(node, 'rel') === 'canonical') || {},
    'href'
  );
  const robots = attribute(meta('robots') || {}, 'content') || '';
  const links = mainNodes
    .filter((node) => node.tagName === 'a')
    .map((node) => attribute(node, 'href'))
    .filter(Boolean);
  const errors = [];
  const expect = (condition, message) => {
    if (!condition) errors.push(message);
  };
  const schemas = [];
  for (const node of nodes.filter(
    (node) => node.tagName === 'script' && attribute(node, 'type') === 'application/ld+json'
  )) {
    try {
      const schema = JSON.parse(text(node));
      schemas.push(...(schema['@graph'] || [schema]));
    } catch {
      errors.push('JSON-LD is not valid JSON');
    }
  }
  expect(Boolean(title), 'Missing title');
  expect(Boolean(attribute(meta('description') || {}, 'content')), 'Missing description');
  expect(Boolean(canonical?.startsWith(`${origin}/`)), 'Canonical must be absolute on the primary domain');
  expect(canonical === `${origin}${path}`, 'Canonical does not match this page');
  expect(attribute(meta('og:url') || {}, 'content') === canonical, 'og:url and canonical disagree');
  expect(!inSitemap || !/\bnoindex\b/i.test(robots), 'noindex page appears in sitemap');
  expect(!/\bWinki\b.*\bWinki\b/i.test(title), 'Repeated brand in title');
  if (demos.includes(path)) {
    expect(/\bnoindex\b/i.test(robots), 'Demo page must be noindex');
    expect(!inSitemap, 'Demo page appears in sitemap');
    expect(
      !schemas.some((schema) => schema['@type'] === 'SoftwareApplication' || schema['@type'] === 'FAQPage'),
      'Demo has placeholder app schema'
    );
  }
  if (path === '/') {
    for (const id of productIds) expect(links.includes(`/homes/${id}/`), `Homepage missing main product link: ${id}`);
    expect(
      !/Michael Knight|Starship Enterprise|Production-ready|CSS\./i.test(text(main || {})),
      'Homepage contains template text'
    );
    expect(
      nodes.some((node) => attribute(node, 'id') === 'apps'),
      'Missing app directory anchor'
    );
  }
  if (path === '/contact/') {
    expect(links.includes('mailto:winkiwiki@QQ.com'), 'Support email is not a link');
    expect(
      !/Night City|purchased templates|template installation/i.test(text(main || {})),
      'Contact contains template content'
    );
  }
  if (path === '/travel-china/') {
    expect(!schemas.some((schema) => schema['@type'] === 'TravelGuide'), 'TravelGuide is not a supported schema type');
    expect(
      schemas.some((schema) => schema['@type'] === 'WebPage' && schema.url === canonical),
      'Travel checklist must have a WebPage schema with its canonical URL'
    );
    expect(
      !/72\/144|Live Rate|Verification Test Codes|perfect translation/i.test(text(main || {})),
      'Travel page contains outdated or unsafe claims'
    );
    expect(
      links.includes('https://en.nia.gov.cn/n147413/c217834/content.html'),
      'Travel page missing official policy source'
    );
    expect(
      !nodes.some((node) => (attribute(node, 'src') || '').includes('paytestcode')),
      'Travel page contains unverified payment codes'
    );
  }
  if (productIds.some((id) => path === `/homes/${id}/`)) {
    const software = schemas.find((schema) => schema['@type'] === 'SoftwareApplication');
    expect(Boolean(software), 'Missing app schema');
    if (software) {
      expect(software.url === canonical, 'App schema URL and canonical disagree');
      expect(!software.appleAppStoreId && !software.googlePlayAppStoreId, 'Nonstandard store ID schema properties');
      expect(Array.isArray(software.installUrl) && software.installUrl.length > 0, 'Missing installUrl');
      for (const url of software.installUrl || []) expect(/^https:\/\//.test(url), 'installUrl must use HTTPS');
    }
    expect(mainNodes.filter((node) => node.tagName === 'h1').length === 1, 'Product must have one H1');
    expect(
      links.some((link) => /https:\/\/(apps\.apple\.com|play\.google\.com)\//.test(link)),
      'Missing native download link'
    );
    expect(
      links.some((link) => /^\/(?:category\/|travel-china\/|[^/]+(?:story|notes)\/)/.test(link)),
      'Missing related content link'
    );
  }
  if (schemas.some((schema) => schema['@type'] === 'BlogPosting')) {
    expect(
      links.some((link) => /^\/homes\/[^/]+\/$/.test(link)),
      'Article has no main product link'
    );
    expect(links.includes('/about/'), 'Article missing author/about link');
    expect(
      schemas.some((schema) => schema['@type'] === 'BreadcrumbList'),
      'Article missing breadcrumb schema'
    );
  }
  return { errors, links, nodes, mainNodes, schemas };
}

const filesUnder = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? filesUnder(join(directory, entry.name)) : [join(directory, entry.name)]
  );

export function checkBuild(directory = 'dist') {
  const dist = resolve(directory);
  if (!existsSync(join(dist, 'sitemap-0.xml'))) throw new Error('Build first: sitemap-0.xml is missing');
  const files = filesUnder(dist);
  const sitemapFiles = files.filter((file) => /sitemap-\d+\.xml$/.test(file));
  const sitemap = new Set(
    sitemapFiles.flatMap((file) =>
      [...readFileSync(file, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname)
    )
  );
  const failures = [];
  let pageCount = 0;
  let articleCount = 0;
  for (const file of files.filter((file) => file.endsWith('.html') && !file.includes('/decapcms/'))) {
    const local = relative(dist, file);
    const path = local === 'index.html' ? '/' : local.endsWith('/index.html') ? `/${local.slice(0, -10)}` : `/${local}`;
    // 404 is intentionally noindex and is not a canonical content route.
    if (path === '/404.html') continue;
    const result = inspectPage(readFileSync(file, 'utf8'), path, sitemap.has(path));
    failures.push(...result.errors.map((message) => `${path}: ${message}`));
    pageCount++;
    articleCount += Number(result.schemas.some((schema) => schema['@type'] === 'BlogPosting'));
    for (const href of result.links) {
      const url = new URL(href, origin);
      if (url.origin !== origin) continue;
      const target = join(dist, url.pathname);
      if (url.pathname === '/' || existsSync(target) || existsSync(join(target, 'index.html'))) continue;
      failures.push(`${path}: missing internal link target ${url.pathname}`);
    }
    if (path === '/meowtalkie-shy-cat-story/') {
      for (const image of result.mainNodes.filter((node) => node.tagName === 'img')) {
        const widths = [...(attribute(image, 'srcset') || '').matchAll(/(\d+)w/g)].map((match) => Number(match[1]));
        if (widths.some((width) => width > 2400)) failures.push(`${path}: oversized image variant`);
      }
    }
  }
  for (const path of sitemap) {
    if (!existsSync(join(dist, path, 'index.html'))) failures.push(`Sitemap target is missing: ${path}`);
    if (normalize(path) !== path) failures.push(`Noncanonical sitemap URL: ${path}`);
  }
  const postDirectory = resolve('src/data/post');
  const publishedCount = filesUnder(postDirectory)
    .filter((file) => /\.(md|mdx)$/.test(file))
    .filter((file) => {
      const frontmatter = readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
      return frontmatter && load(frontmatter[1])?.draft !== true;
    }).length;
  if (articleCount !== publishedCount)
    failures.push(`Expected ${publishedCount} published article schemas, found ${articleCount}`);
  if (failures.length) throw new Error(failures.join('\n'));
  console.log(
    `SEO checks passed: ${pageCount} pages, ${sitemap.size} sitemap URLs, ${articleCount} articles, ${productIds.length} products, ${demos.length} noindex demos.`
  );
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  checkBuild(process.argv[2] || 'dist');
}
