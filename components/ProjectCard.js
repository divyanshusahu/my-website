import Image from "next/image";

import githubIcon24 from "../public/githubx24.png";

function ProjectCard(props) {
  return (
    <div className="border px-4 py-4 rounded-xl">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4 lg:col-span-3">
          <h1 className="text-lg py-2 text-slate-800 font-bold">
            {props.title}
          </h1>
          <h2 className="text-sm text-slate-600">{props.subtitle}</h2>
          <div className="pt-4 flex flex-wrap gap-1">
            {props.tags.map((tag, index) => (
              <span
                className="rounded-full bg-slate-100 px-4 py-2 text-xs text-slate-500"
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
              <button className="px-4 py-2 rounded-md text-slate-800 bg-slate-100 flex items-center gap-2">
                <Image src={githubIcon24} alt="Github" width={24} height={24} />
                <span className="text-slate-600 text-sm">Source</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
