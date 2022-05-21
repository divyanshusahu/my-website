import Image from "next/image";

import githubIcon16 from "../public/githubx16.png";
import githubIcon32 from "../public/githubx32.png";

function ProjectCard(props) {
  return (
    <div className="border px-4 py-4 rounded-xl">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4">
          <h1 className="text-lg py-2 text-slate-800 font-bold">
            {props.title}
          </h1>
          <h2 className="text-sm text-slate-600">{props.subtitle}</h2>
        </div>
        <div className="hidden col-span-1">
          <div className="h-full flex items-center justify-center">
            <a href={props.source} target="_blank">
              <button className="h-8 w-20 rounded-md text-slate-800 bg-slate-100 flex items-center justify-evenly">
                <Image src={githubIcon16} alt="Github" />
                <span className="hidden">Source</span>
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="pt-4 flex justify-start flex-wrap">
        {props.tags.map((tag, index) => (
          <button
            className="rounded-full bg-slate-100 px-4 py-2 text-xs text-slate-500 mr-1"
            key={index}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProjectCard;
