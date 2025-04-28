import { useEffect, useState } from "react";
import Image from "next/image";
import profilePic from "../public/me.png";

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const fullText = "Hi, I'm Divyanshu. I'm a senior software engineer with expertise in DevOps and Apache Lucene search technologies.";
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Typewriter effect
    let i = 0;
    const typeWriter = () => {
      if (i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1));
        i++;
        setTimeout(typeWriter, 40);
      }
    };
    
    setTimeout(typeWriter, 500);
  }, []);

  return (
    <div className="px-4 pt-16 md:pt-24 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div className={`lg:order-last mx-auto opacity-0 w-full flex justify-center ${isLoaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.3s' }}>
          <div className="relative w-full max-w-[350px] lg:max-w-[512px]">
            <div className="absolute -inset-1 bg-gradient-to-r from-slate-400 to-slate-600 dark:from-slate-600 dark:to-slate-800 rounded-lg blur-lg opacity-50 group-hover:opacity-70 transition duration-1000"></div>
            <Image 
              src={profilePic} 
              alt="Divyanshu Sahu" 
              priority 
              width={512}
              height={768}
              className="relative rounded-lg shadow-xl transition-all duration-300 dark:brightness-90 hover:scale-[1.01] cursor-pointer object-cover w-full h-auto"
              style={{ maxWidth: '100%', maxHeight: '768px' }}
            />
            <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-slate-500/20 dark:bg-slate-300/10 rounded-full blur-xl z-0"></div>
            <div className="absolute -top-3 -left-3 w-20 h-20 bg-slate-500/20 dark:bg-slate-300/10 rounded-full blur-xl z-0"></div>
          </div>
        </div>
        
        <div className="flex flex-col justify-center h-full">
          <div className="mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="inline-block px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-sm font-medium mb-2">
              Senior Software Engineer • DevOps • Search Technologies
            </div>
          </div>
          
          <h1 className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="gradient-text">console.log</span>
            <span className="text-slate-800 dark:text-slate-100">(</span>
            <span className="text-yellow-600 dark:text-yellow-400">&apos;Hello World&apos;</span>
            <span className="text-slate-800 dark:text-slate-100">);</span>
          </h1>
          
          <div className="typewriter-container relative bg-slate-100 dark:bg-slate-800 p-5 rounded-lg border-l-4 border-emerald-500 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 font-serif leading-relaxed">
              {displayText}
              <span className="inline-block w-2 h-5 bg-emerald-500 ml-1 animate-pulse"></span>
            </p>
          </div>
          
          <div className="mt-8 flex gap-4 items-center opacity-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400 font-mono">Available for projects</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
