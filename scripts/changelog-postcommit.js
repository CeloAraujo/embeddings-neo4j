const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function safe(cmd) {
  try { return execSync(cmd, { encoding: 'utf8' }).toString().trim(); }
  catch (e) { return ''; }
}

const repoRoot = safe('git rev-parse --show-toplevel') || process.cwd();
const sha = safe('git rev-parse --short HEAD');
const message = safe('git log -1 --pretty=format:%B');
const author = safe('git log -1 --pretty=format:%an <%ae>');
const date = safe('git log -1 --pretty=format:%ad --date=iso');
const files = safe('git diff-tree --no-commit-id --name-only -r HEAD');
const stat = safe('git show --stat -1 HEAD');

const changelogsDir = path.join(repoRoot, 'changelogs');
if (!fs.existsSync(changelogsDir)) fs.mkdirSync(changelogsDir, { recursive: true });

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const fileName = `${timestamp}_${sha || 'unknown'}.md`;
const filePath = path.join(changelogsDir, fileName);

const content = [
  `# Commit ${sha}`,
  '',
  `**Date:** ${date}`,
  '',
  `**Author:** ${author}`,
  '',
  `**Message:**`,
  '',
  message || '(sem mensagem)',
  '',
  `**Files changed:**`,
  '',
  (files || '(nenhum arquivo listado)').split('\n').map(f => f ? `- ${f}` : '').join('\n'),
  '',
  '**Stat:**',
  '',
  '```',
  stat || '(sem stat)',
  '```',
  ''
].join('\n');

try {
  fs.writeFileSync(filePath, content, 'utf8');
} catch (err) {
  // Fail silently to avoid blocking commits
}
