const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('index.html', 'utf8');
const start = html.indexOf('// Curated official YouTube videos;');
const end = html.indexOf('P.watch={', start);
assert(start >= 0 && end > start, 'curated cinema block exists');
const context = vm.createContext({esc: s => String(s), openModal: () => {}, I: {x: '×'}});
vm.runInContext(html.slice(start, end), context);
const evaluate = expression => vm.runInContext(expression, context);
assert.equal(evaluate('ET_FILMS.length'), 18);
for (const film of evaluate('ET_FILMS')) {
  assert.match(film.id, /^[\w-]{11}$/);
  assert.match(film.platform, /^https:\/\//);
}
assert.match(evaluate('etCinema()'), /Inside Out 2/);
assert.match(evaluate('ET_CAT="cartoons"; etCinema()'), /Moana 2/);
assert.doesNotMatch(evaluate('etCinema()'), /Fear Street/);
assert.match(evaluate('ET_CAT="horror"; etCinema()'), /Fear Street/);
assert.match(evaluate('ET_CAT="games"; etCinema()'), /لا توجد فيديوهات مختارة/);
assert.match(html, /\$\{wOpenBox\(false\)\}/, 'existing channel launcher retained');
assert.match(html, /useraddch:/, 'existing channel saving retained');
assert(!JSON.parse(fs.readFileSync('vercel.json')).redirects?.some(x => x.destination.includes('preview')), 'production root is not redirected to preview');
console.log('PASS cinematic categories, official video metadata, existing channel launcher and production routing');
