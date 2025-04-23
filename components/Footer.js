import Image from "next/image";
import { useState } from "react";

import emailIcon32 from "../public/emailx32.png";
import twitterIcon32 from "../public/twitterx32.png";
import linkedinIcon32 from "../public/linkedinx32.png";
import githubIcon32 from "../public/githubx32.png";

function Footer() {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-4 py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 -z-10"></div>
      
      {/* Matrix-like vertical lines for background effect */}
      <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-5 -z-10">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute top-0 w-px bg-emerald-500" 
            style={{
              left: `${5 * i}%`, 
              height: `${Math.random() * 100 + 100}%`,
              opacity: Math.random() * 0.5 + 0.5
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl text-slate-800 dark:text-slate-100 font-mono mb-3">
            <span className="gradient-text">get_in_touch</span>
            <span className="text-slate-800 dark:text-slate-100">();</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Feel free to email me about anything. Do you have some feedback or
            suggestions? I&apos;d love to hear from you!
          </p>
        </div>

        <div className="flex justify-center gap-8 mb-12">
          <a 
            href="mailto:dsahu1997@gmail.com"
            className="transform transition-all duration-300 hover:scale-110"
            onMouseEnter={() => setHoveredIcon('email')}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <div className="relative">
              {hoveredIcon === 'email' && (
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full blur-lg opacity-70 -z-10"></div>
              )}
              <Image 
                src={emailIcon32} 
                alt="dsahu1997@gmail.com" 
                width={32} 
                height={32} 
                className="dark:invert transition-all duration-200" 
              />
            </div>
          </a>
          <a
            href="https://twitter.com/divyan5hu"
            target="_blank"
            rel="noreferrer"
            className="transform transition-all duration-300 hover:scale-110"
            onMouseEnter={() => setHoveredIcon('twitter')}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <div className="relative">
              {hoveredIcon === 'twitter' && (
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full blur-lg opacity-70 -z-10"></div>
              )}
              <Image 
                src={twitterIcon32} 
                alt="divyan5hu" 
                width={32} 
                height={32} 
                className="dark:invert transition-all duration-200" 
              />
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/divyanshu-sahu/"
            target="_blank"
            rel="noreferrer"
            className="transform transition-all duration-300 hover:scale-110"
            onMouseEnter={() => setHoveredIcon('linkedin')}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <div className="relative">
              {hoveredIcon === 'linkedin' && (
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full blur-lg opacity-70 -z-10"></div>
              )}
              <Image 
                src={linkedinIcon32} 
                alt="divyanshu-sahu" 
                width={32} 
                height={32} 
                className="dark:invert transition-all duration-200" 
              />
            </div>
          </a>
          <a
            href="https://github.com/divyanshusahu"
            target="_blank"
            rel="noreferrer"
            className="transform transition-all duration-300 hover:scale-110"
            onMouseEnter={() => setHoveredIcon('github')}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <div className="relative">
              {hoveredIcon === 'github' && (
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full blur-lg opacity-70 -z-10"></div>
              )}
              <Image 
                src={githubIcon32} 
                alt="divyanshusahu" 
                width={32} 
                height={32} 
                className="dark:invert transition-all duration-200" 
              />
            </div>
          </a>
        </div>
        
        <div className="text-center text-sm text-slate-500 dark:text-slate-400 font-mono">
          <p className="mb-2">
            <span className="text-emerald-500">const</span> website = 
            <span className="text-yellow-600 dark:text-yellow-500"> &apos;Built with Next.js & Tailwind&apos;</span>;
          </p>
          <p>
            <span className="text-emerald-500">console</span>.log(
            <span className="text-yellow-600 dark:text-yellow-500">&apos;© {currentYear} Divyanshu Sahu&apos;</span>);
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
