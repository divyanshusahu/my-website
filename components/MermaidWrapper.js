import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const MermaidWrapper = ({ children }) => {
  const wrapperRef = useRef(null);
  
  useEffect(() => {
    if (!wrapperRef.current) return;
    
    // Initialize mermaid
    mermaid.initialize({
      startOnLoad: false,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
      securityLevel: 'loose',
      fontFamily: 'monospace',
    });
    
    // Find all mermaid code blocks in the rendered content
    const mermaidCodeBlocks = wrapperRef.current.querySelectorAll('pre > code.language-mermaid');
    
    if (mermaidCodeBlocks.length > 0) {
      mermaidCodeBlocks.forEach((codeBlock, index) => {
        const pre = codeBlock.parentElement;
        const chartDefinition = codeBlock.textContent;
        
        // Create a new div to render the diagram
        const diagramContainer = document.createElement('div');
        diagramContainer.className = 'mermaid-diagram my-6';
        const mermaidDiv = document.createElement('div');
        mermaidDiv.className = 'mermaid';
        mermaidDiv.id = `mermaid-diagram-${index}`;
        diagramContainer.appendChild(mermaidDiv);
        
        // Replace the pre element with the diagram container
        pre.parentNode.replaceChild(diagramContainer, pre);
        
        try {
          // Render the Mermaid diagram
          mermaid.render(`mermaid-diagram-${index}`, chartDefinition).then(({ svg }) => {
            mermaidDiv.innerHTML = svg;
          }).catch(err => {
            console.error('Failed to render mermaid diagram:', err);
            mermaidDiv.innerHTML = `
              <div class="p-3 border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800 text-red-700 dark:text-red-400 rounded">
                <p class="font-mono text-sm">Error rendering diagram</p>
                <pre class="mt-2 text-xs overflow-auto p-2 bg-white dark:bg-slate-800 rounded">${chartDefinition}</pre>
              </div>
            `;
          });
        } catch (err) {
          console.error('Error during mermaid initialization:', err);
        }
      });
    }
    
    // Set up observer for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class' && 
            mutation.target === document.documentElement) {
          // Re-initialize mermaid with new theme
          mermaid.initialize({
            startOnLoad: false,
            theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
            securityLevel: 'loose',
            fontFamily: 'monospace',
          });
          
          // Re-render all diagrams
          mermaidCodeBlocks.forEach((codeBlock, index) => {
            const chartDefinition = codeBlock.textContent;
            const diagramId = `mermaid-diagram-${index}`;
            const existingDiagram = document.getElementById(diagramId);
            
            if (existingDiagram) {
              mermaid.render(diagramId, chartDefinition).then(({ svg }) => {
                existingDiagram.innerHTML = svg;
              }).catch(console.error);
            }
          });
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, [children]);
  
  return <div ref={wrapperRef}>{children}</div>;
};

export default MermaidWrapper;