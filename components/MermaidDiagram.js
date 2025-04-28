import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import mermaid to ensure it only loads on the client side
const mermaid = typeof window !== 'undefined' ? require('mermaid') : null;

const MermaidDiagram = ({ chart }) => {
  const mermaidRef = useRef(null);
  const [hasRendered, setHasRendered] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Skip server-side rendering
    if (typeof window === 'undefined' || !mermaid) return;
    
    try {
      // Initialize mermaid with optimal configuration
      mermaid.initialize({
        startOnLoad: false,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
        securityLevel: 'loose',
        fontFamily: 'monospace',
        fontSize: 14,
      });
      
      // Only attempt to render when component is mounted and has chart data
      if (mermaidRef.current && chart && !hasRendered) {
        // Clear any previous content
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        mermaidRef.current.id = id;
        
        // Render the diagram
        mermaid.render(id, chart).then(({ svg }) => {
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = svg;
            setHasRendered(true);
          }
        }).catch(err => {
          console.error('Error rendering mermaid diagram:', err);
          setError(err.message);
        });
      }
    } catch (err) {
      console.error('Mermaid initialization error:', err);
      setError(err.message);
    }
  }, [chart, hasRendered]);

  // Re-render on theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class' && 
            mutation.target === document.documentElement &&
            hasRendered) {
          setHasRendered(false);  // Trigger re-render
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, [hasRendered]);

  if (error) {
    return (
      <div className="mermaid-diagram my-6">
        <div className="p-4 border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800 text-red-700 dark:text-red-400 rounded-md">
          <p className="font-mono text-sm">Failed to render diagram: {error}</p>
          <pre className="mt-2 text-xs overflow-auto p-2 bg-slate-100 dark:bg-slate-800 rounded">{chart}</pre>
        </div>
      </div>
    );
  }

  return (
    <div className="mermaid-diagram my-6">
      <div className="mermaid" ref={mermaidRef}></div>
    </div>
  );
};

// Ensure MermaidDiagram is only rendered on the client-side
export default dynamic(() => Promise.resolve(MermaidDiagram), {
  ssr: false
});