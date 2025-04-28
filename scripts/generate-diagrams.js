const fs = require('fs');
const path = require('path');
const mermaid = require('mermaid');
const cheerio = require('cheerio');
const glob = require('glob');
const matter = require('gray-matter');

// Initialize mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'default', // We'll generate both light and dark themes
  securityLevel: 'loose',
  fontFamily: 'monospace',
});

// Create directories if they don't exist
const DIAGRAMS_DIR = path.join(process.cwd(), 'public', 'diagrams');
if (!fs.existsSync(DIAGRAMS_DIR)) {
  fs.mkdirSync(DIAGRAMS_DIR, { recursive: true });
}

// Function to extract Mermaid diagrams from a markdown file
async function extractAndGenerateDiagrams(filePath) {
  console.log(`Processing ${filePath}`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { content } = matter(fileContent);
  
  // Find all Mermaid code blocks
  const mermaidRegex = /```mermaid\n([\s\S]*?)\n```/g;
  let match;
  let diagramCount = 0;
  const replacements = [];
  
  while ((match = mermaidRegex.exec(content)) !== null) {
    const diagramCode = match[1].trim();
    const fullMatch = match[0];
    
    try {
      // Generate unique ID for this diagram
      const fileSlug = path.basename(filePath, '.md');
      const diagramId = `${fileSlug}-diagram-${diagramCount}`;
      
      // Generate SVG for light theme
      console.log(`Generating diagram ${diagramId}`);
      const lightSvgPath = path.join(DIAGRAMS_DIR, `${diagramId}-light.svg`);
      
      const { svg: lightSvg } = await mermaid.render(`mermaid-${diagramId}-light`, diagramCode);
      fs.writeFileSync(lightSvgPath, lightSvg);
      
      // Generate SVG for dark theme
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'loose',
        fontFamily: 'monospace',
      });
      
      const darkSvgPath = path.join(DIAGRAMS_DIR, `${diagramId}-dark.svg`);
      const { svg: darkSvg } = await mermaid.render(`mermaid-${diagramId}-dark`, diagramCode);
      fs.writeFileSync(darkSvgPath, darkSvg);
      
      // Reset to light theme for next diagram
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
        fontFamily: 'monospace',
      });
      
      // Store replacement info
      replacements.push({
        original: fullMatch,
        replacement: `<div class="mermaid-diagram">
  <img src="/diagrams/${diagramId}-light.svg" alt="Diagram" class="block dark:hidden w-full" />
  <img src="/diagrams/${diagramId}-dark.svg" alt="Diagram" class="hidden dark:block w-full" />
</div>`
      });
      
      diagramCount++;
    } catch (err) {
      console.error(`Error rendering diagram in ${filePath}:`, err);
    }
  }
  
  return { filePath, replacements };
}

// Process all markdown files in the content directory
async function processAllMarkdownFiles() {
  const files = glob.sync('content/**/*.md');
  
  for (const file of files) {
    try {
      const { filePath, replacements } = await extractAndGenerateDiagrams(file);
      
      if (replacements.length > 0) {
        // Update the markdown file with image references
        let fileContent = fs.readFileSync(filePath, 'utf8');
        
        replacements.forEach(({ original, replacement }) => {
          fileContent = fileContent.replace(original, replacement);
        });
        
        fs.writeFileSync(filePath, fileContent);
        console.log(`Updated ${filePath} with ${replacements.length} diagram images`);
      }
    } catch (error) {
      console.error(`Error processing file ${file}:`, error);
    }
  }
}

// Run the script
processAllMarkdownFiles()
  .then(() => console.log('All diagrams generated successfully!'))
  .catch(err => console.error('Error generating diagrams:', err));