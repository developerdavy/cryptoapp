#!/usr/bin/env node
import { build } from 'vite';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

async function buildProduction() {
  try {
    console.log('Building client...');
    
    // Build client to server/public for production
    await build({
      root: 'client',
      build: {
        outDir: '../server/public',
        emptyOutDir: true,
      },
      resolve: {
        alias: {
          '@': path.resolve(process.cwd(), 'client/src'),
          '@shared': path.resolve(process.cwd(), 'shared'),
          '@assets': path.resolve(process.cwd(), 'attached_assets'),
        },
      },
    });
    
    console.log('Building server...');
    
    // Build server
    exec('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', 
      (error, stdout, stderr) => {
        if (error) {
          console.error('Server build failed:', error);
          return;
        }
        console.log('Production build complete!');
        console.log('Client built to: server/public');
        console.log('Server built to: dist/index.js');
      }
    );
    
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildProduction();