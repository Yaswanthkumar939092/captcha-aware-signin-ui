
#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

// Run vitest with all arguments passed to this script
const args = process.argv.slice(2);
const vitestBin = path.resolve(__dirname, '../../node_modules/.bin/vitest');

const testProcess = spawn(vitestBin, args, { 
  stdio: 'inherit',
  env: { ...process.env }
});

testProcess.on('error', (err) => {
  console.error('Failed to start test process:', err);
  process.exit(1);
});

testProcess.on('close', (code) => {
  process.exit(code || 0);
});
