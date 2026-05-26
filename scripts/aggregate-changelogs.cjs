const fs = require('fs');
const path = require('path');

const repoRoot = process.cwd();
const changelogsDir = path.join(repoRoot, 'changelogs');
const outFile = path.join(repoRoot, 'CHANGELOG.md');

if (!fs.existsSync(changelogsDir)) {
  console.log('No changelogs directory found. Exiting.');
  process.exit(0);
}

const files = fs.readdirSync(changelogsDir)
  .filter(f => f.endsWith('.md'))
  .sort() // filenames start with ISO timestamps so lexical sort works
  .reverse(); // newest first

const header = `# Changelog

This file aggregates individual changelog entries generated on commits (folder changelogs/).

`;

let content = header;

for (const file of files) {
  const full = path.join(changelogsDir, file);
  const raw = fs.readFileSync(full, 'utf8');
  content += `## ${file}\n\n`;
  // Strip potential leading H1 to avoid duplication
  const body = raw.replace(/^#\s.*\n/, '');
  content += body.trim() + '\n\n---\n\n';
}

fs.writeFileSync(outFile, content, 'utf8');
console.log('Aggregated', files.length, 'entries into', outFile);
