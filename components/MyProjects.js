import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";

const projectsData = [
  {
    title: "miniCTF",
    subtitle:
      "A Django based platform for hosting Capture the Flag(CTF) events. The platform supports the live-time scoreboard along with tie-breakers.",
    tags: ["Python", "Django", "MySQL"],
    source: "https://github.com/divyanshusahu/miniCTF",
  },
  {
    title: "EBook Downloader",
    subtitle:
      "A python-based web scraping tool using Beautiful Soup library, which downloads ebooks from gen.lib.rus.ec",
    tags: ["Python", "Web Scraping"],
    source: "https://github.com/divyanshusahu/EBook-Downloader",
  },
  {
    title: "HackThisSite",
    subtitle: "My writeup for the HackThisSite missions.",
    tags: ["CTF", "Forensics", "Steganography"],
    source: "https://github.com/divyanshusahu/HackThisSite",
  },
  {
    title: "Ethereum Todo List",
    subtitle: "A simple todo list made on ethereum blockchain.",
    tags: ["Ethereum", "Solidity", "Smart Contract"],
    source: "https://github.com/divyanshusahu/ethereum-todo-list",
  },
];

function MyProjects() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <div className="px-4 py-16 relative">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
      
      <div className={`opacity-0 ${isLoaded ? 'animate-fade-in' : ''}`}>
        <h1 className="mb-12 text-3xl font-bold text-center">
          <span className="relative inline-block">
            <span className="text-slate-800 dark:text-slate-100 font-mono">
              <span className="text-emerald-500">[</span> My Projects <span className="text-emerald-500">]</span>
            </span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transform origin-left"></span>
          </span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((projectData, index) => (
            <div 
              key={index} 
              className="opacity-0 animate-slide-up" 
              style={{ animationDelay: `${0.2 * index}s`, animationFillMode: 'forwards' }}
            >
              <ProjectCard
                title={projectData.title}
                subtitle={projectData.subtitle}
                tags={projectData.tags}
                source={projectData.source}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyProjects;
