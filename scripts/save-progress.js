#!/usr/bin/env node

import { execSync } from 'child_process';

const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[36m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function exec(command, options = {}) {
  try {
    return execSync(command, { 
      encoding: 'utf8', 
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options 
    });
  } catch (error) {
    if (!options.ignoreError) {
      throw error;
    }
    return null;
  }
}

function main() {
  log('\n🔄 Starting Save Progress...\n', 'blue');

  // Check if git repo exists
  try {
    exec('git rev-parse --git-dir', { silent: true });
  } catch {
    log('❌ Error: Not a git repository!', 'red');
    log('Run: git init', 'yellow');
    process.exit(1);
  }

  // Check if there are any changes
  const status = exec('git status --porcelain', { silent: true });
  if (!status || status.trim() === '') {
    log('✅ No changes to commit. Everything is up to date!', 'green');
    return;
  }

  // Add all changes
  log('📦 Adding all changes...', 'blue');
  exec('git add -A');

  // Create commit with timestamp
  const now = new Date();
  const dateStr = now.toLocaleDateString('hr-HR', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  });
  const timeStr = now.toLocaleTimeString('hr-HR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  const commitMessage = `chore: save progress [${dateStr} ${timeStr}]`;

  log(`💾 Creating commit: "${commitMessage}"`, 'blue');
  exec(`git commit -m "${commitMessage}"`);

  // Check if remote exists
  const remotes = exec('git remote', { silent: true });
  if (!remotes || remotes.trim() === '') {
    log('\n⚠️  Warning: No remote repository configured!', 'yellow');
    log('To add a remote, run:', 'yellow');
    log('  git remote add origin <your-repo-url>', 'yellow');
    log('  git push -u origin main\n', 'yellow');
    process.exit(0);
  }

  // Check if current branch has upstream
  let currentBranch;
  try {
    currentBranch = exec('git branch --show-current', { silent: true }).trim();
  } catch {
    currentBranch = 'main';
  }

  const upstream = exec(`git rev-parse --abbrev-ref ${currentBranch}@{upstream}`, { 
    silent: true, 
    ignoreError: true 
  });

  if (!upstream) {
    log(`\n⚠️  Warning: Branch "${currentBranch}" has no upstream configured!`, 'yellow');
    log('Setting upstream and pushing...', 'blue');
    try {
      exec(`git push -u origin ${currentBranch}`);
      log('\n✅ Successfully saved and pushed!', 'green');
    } catch (error) {
      log('\n❌ Push failed! You may need to set up the remote manually:', 'red');
      log(`  git remote add origin <your-repo-url>`, 'yellow');
      log(`  git push -u origin ${currentBranch}\n`, 'yellow');
      process.exit(1);
    }
    return;
  }

  // Push to remote
  log('🚀 Pushing to remote...', 'blue');
  try {
    exec('git push');
    log('\n✅ Successfully saved and pushed!', 'green');
  } catch (error) {
    log('\n❌ Push failed!', 'red');
    log('This might be because:', 'yellow');
    log('  - Remote branch is ahead of local', 'yellow');
    log('  - No internet connection', 'yellow');
    log('  - Authentication issue', 'yellow');
    log('\nTry running: git pull --rebase && git push\n', 'yellow');
    process.exit(1);
  }
}

main();

