const fs=require('node:fs');
const m=JSON.parse(fs.readFileSync('dist/release-v23.json','utf8'));
const r=JSON.parse(fs.readFileSync('dist/launch-readiness.json','utf8'));
const checks={previewProtected:!m.indexable,phoneConfigured:r.contact.telephone,confirmedEmail:r.contact.email,confirmedHours:r.contact.hours,confirmedAddress:r.contact.address,commercialHost:!new URL(m.siteUrl).hostname.endsWith('github.io'),sitemapGenerated:r.sitemapGenerated,structuredData:r.schema,robotsScope:r.robotsLocation};
console.log(JSON.stringify(checks,null,2));
if(process.argv.includes('--production')&&(!m.indexable||!checks.confirmedEmail||!checks.confirmedHours||!checks.commercialHost||!checks.sitemapGenerated)){console.error('Production prerequisites are not complete. Preview remains protected.');process.exit(1)}
