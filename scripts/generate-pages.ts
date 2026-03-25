import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const distDir = resolve(process.cwd(), 'dist');
const indexPath = resolve(distDir, 'index.html');

try {
  const indexHtml = readFileSync(indexPath, 'utf-8');

  const errorCodes = ['500', '502', '503'];

  for (const code of errorCodes) {
    const outputHtml = indexHtml.replace('[[STATUS]]', code);
    writeFileSync(resolve(distDir, `${code}.html`), outputHtml);
    console.log(`Generated dist/${code}.html`);
  }

  // Also replace [[STATUS]] in index.html with an empty string to allow query param fallback
  const defaultHtml = indexHtml.replace('[[STATUS]]', '');
  writeFileSync(indexPath, defaultHtml);
  console.log('Updated dist/index.html');

} catch (err) {
  console.error('Error generating pages:', err);
  process.exit(1);
}
