import Image from "next/image";

import githubIcon24 from "../public/githubx24.png";

function ProjectCard(props) {
  return (
    <div className="border px-4 py-4 rounded-xl dark:border-slate-700 transition-colors duration-200 dark:bg-slate-800">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4 lg:col-span-3">
          <h1 className="text-lg py-2 text-slate-800 dark:text-slate-100 font-bold transition-colors duration-200">
            {props.title}
          </h1>
          <h2 className="text-sm text-slate-600 dark:text-slate-300 transition-colors duration-200">{props.subtitle}</h2>
          <div className="pt-4 flex flex-wrap gap-1">
            {props.tags.map((tag, index) => (
              <span
                className="rounded-full bg-slate-100 dark:bg-slate-700 px-4 py-2 text-xs text-slate-500 dark:text-slate-300 transition-colors duration-200"
                key={index}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="hidden col-span-1 lg:block">
          <div className="h-full flex items-center justify-center">
            <a href={props.source} target="_blank" rel="noreferrer">
              <button className="px-4 py-2 rounded-md text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-700 flex items-center gap-2 transition-colors duration-200 hover:bg-slate-200 dark:hover:bg-slate-600">
                <Image src={githubIcon24} alt="Github" width={24} height={24} className="dark:invert" />
                <span className="text-slate-600 dark:text-slate-300 text-sm">Source</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
