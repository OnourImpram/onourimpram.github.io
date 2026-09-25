const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
test('project share image matches the page instead of the homepage kitchen',()=>{const s=fs.readFileSync('dist/proje/isikli-tv-unitesi/index.html','utf8');assert.match(s,/<meta property="og:image" content="[^"]*r22-full.webp"/)});
test('studio share preview is a desk rather than a kitchen',()=>{const s=fs.readFileSync('dist/tasarim-masasi/index.html','utf8');assert.match(s,/<meta property="og:image" content="[^"]*(devir|atelier-poster)[^"]*\.webp"/)});
