import test from 'node:test';
import assert from 'node:assert/strict';
import { inspectPage } from './check_seo.mjs';

const fixture = (extra = '', canonical = 'https://winki.win/example/') => `
  <!doctype html><html><head><title>Example</title>
  <meta name="description" content="A useful example.">
  <link rel="canonical" href="${canonical}"><meta property="og:url" content="${canonical}">
  ${extra}</head><body><main><h1>Example</h1></main></body></html>`;

test('valid page is accepted', () => {
  assert.deepEqual(inspectPage(fixture(), '/example/', true).errors, []);
});
test('relative canonical is rejected', () => {
  assert(inspectPage(fixture('', '/example/'), '/example/').errors.some((error) => error.includes('absolute')));
});
test('noindex in sitemap is rejected', () => {
  assert(
    inspectPage(fixture('<meta name="robots" content="noindex,follow">'), '/example/', true).errors.some((error) =>
      error.includes('sitemap')
    )
  );
});
test('demo indexing is rejected', () => {
  assert(
    inspectPage(fixture('', 'https://winki.win/services/'), '/services/').errors.some((error) =>
      error.includes('must be noindex')
    )
  );
});
test('invalid JSON-LD is rejected', () => {
  assert(
    inspectPage(fixture('<script type="application/ld+json">{broken}</script>'), '/example/').errors.some((error) =>
      error.includes('valid JSON')
    )
  );
});
test('homepage without product links is rejected', () => {
  assert(
    inspectPage(fixture('', 'https://winki.win/'), '/').errors.some((error) => error.includes('main product link'))
  );
});
test('unsupported travel schema type is rejected', () => {
  const page = fixture(
    '<script type="application/ld+json">{"@type":"TravelGuide"}</script>',
    'https://winki.win/travel-china/'
  );
  assert(inspectPage(page, '/travel-china/').errors.some((error) => error.includes('supported schema type')));
});
test('travel checklist WebPage schema is accepted', () => {
  const page = fixture(
    '<script type="application/ld+json">{"@type":"WebPage","url":"https://winki.win/travel-china/"}</script>'
  )
    .replaceAll('https://winki.win/example/', 'https://winki.win/travel-china/')
    .replace('</main>', '<a href="https://en.nia.gov.cn/n147413/c217834/content.html">Policy source</a></main>');
  assert.deepEqual(inspectPage(page, '/travel-china/').errors, []);
});
