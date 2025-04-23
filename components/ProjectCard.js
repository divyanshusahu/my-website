import Image from "next/image";
import { useState } from "react";
import githubIcon24 from "../public/githubx24.png";

function ProjectCard(props) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="terminal-card group hover:scale-[1.01] transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="terminal-card-header">
        <div className="terminal-dot terminal-dot-red"></div>
        <div className="terminal-dot terminal-dot-yellow"></div>
        <div className="terminal-dot terminal-dot-green"></div>
        <div className="ml-2 text-xs text-slate-400 font-mono">{props.title}.project</div>
      </div>
      
      <div className="px-5 py-4 dark:bg-slate-800 bg-slate-100">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-4 lg:col-span-3">
            <h1 className="text-lg py-2 text-slate-800 dark:text-slate-100 font-bold font-mono transition-colors duration-200 flex items-center">
              <span className="text-emerald-500 mr-2">&gt;</span> {props.title}
              {isHovered && <span className="inline-block w-2 h-5 bg-emerald-500 ml-2 animate-pulse"></span>}
            </h1>
            <h2 className="text-sm text-slate-600 dark:text-slate-300 transition-colors duration-200 font-mono pl-6">
              # {props.subtitle}
            </h2>
            <div className="pt-4 flex flex-wrap gap-1 pl-6">
              {props.tags.map((tag, index) => (
                <span
                  className="rounded-full bg-slate-200 dark:bg-slate-700 px-3 py-1 text-xs text-slate-600 dark:text-slate-300 transition-colors duration-200 border border-slate-300 dark:border-slate-600"
                  key={index}
                >
                  <span className="text-emerald-500">&lt;</span>
                  {tag}
                  <span className="text-emerald-500">/&gt;</span>
                </span>
              ))}
            </div>
          </div>
          <div className="hidden col-span-1 lg:block">
            <div className="h-full flex items-center justify-center">
              <a href={props.source} target="_blank" rel="noreferrer" className="group">
                <button className="px-4 py-2 rounded-md text-slate-100 bg-slate-700 dark:bg-slate-700 flex items-center gap-2 transition-all duration-300 hover:bg-emerald-600 dark:hover:bg-emerald-600 shadow-md">
                  <Image 
                    src={githubIcon24} 
                    alt="Github" 
                    width={20} 
                    height={20} 
                    className="dark:invert transition-all duration-200 group-hover:scale-110" 
                  />
                  <span className="text-slate-200 dark:text-slate-200 text-sm font-mono">Source</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
