#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { glob } = require('glob');
const { execFile } = require('child_process');
const { promisify } = require('util');

const execFilePromise = promisify(execFile);

// Define directories
const MERMAID_DIR = path.join(__dirname, '..', 'mermaid');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'graphs');
const MMDC_PATH = path.join(__dirname, '..', 'node_modules', '.bin', 'mmdc');

// Ensure output directory exists
async function ensureOutputDir() {
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    console.log(`✅ Output directory created: ${OUTPUT_DIR}`);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.error(`❌ Error creating output directory: ${err.message}`);
      throw err;
    }
  }
}

// Process a single mermaid file
async function processMermaidFile(filePath) {
  try {
    const fileName = path.basename(filePath, path.extname(filePath));
    const outputPath = path.join(OUTPUT_DIR, `${fileName}.svg`);
    
    console.log(`🔄 Processing: ${filePath}`);
    
    // Use mmdc (mermaid-cli) to generate the SVG
    await execFilePromise(MMDC_PATH, [
      '-i', filePath,
      '-o', outputPath,
      '-b', 'transparent'
    ]);
    
    console.log(`✅ Generated: ${outputPath}`);
  } catch (err) {
    console.error(`❌ Error processing ${filePath}: ${err.message}`);
  }
}

// Main function
async function generateGraphs() {
  try {
    console.log('🔍 Starting mermaid graph generation...');
    
    // Ensure the output directory exists
    await ensureOutputDir();
    
    // Find all mermaid files (supporting .mmd, .md, and .mermaid extensions)
    const mermaidFiles = await glob('**/*.{mmd,md,mermaid}', { cwd: MERMAID_DIR });
    
    if (mermaidFiles.length === 0) {
      console.log('ℹ️ No mermaid files found. Add .mmd, .md, or .mermaid files to the mermaid directory.');
      return;
    }
    
    console.log(`🔍 Found ${mermaidFiles.length} mermaid files to process.`);
    
    // Process files sequentially to avoid overwhelming the system
    for (const file of mermaidFiles) {
      await processMermaidFile(path.join(MERMAID_DIR, file));
    }
    
    console.log('✨ All mermaid graphs generated successfully!');
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
    process.exit(1);
  }
}

// Run the script
generateGraphs();