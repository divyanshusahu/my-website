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
    tags: ["Python", "Web Scraping", "Beautiful Soup"],
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
    subtitle:
      "A simple todo list made on ethereum blockchain.",
    tags: ["Ethereum", "Solidity", "Smart Contract"],
    source: "https://github.com/divyanshusahu/ethereum-todo-list",
  },
];

function MyProjects() {
  return (
    <div className="px-4 py-16">
      <h1 className="py-16 text-2xl font-bold text-center text-slate-800">
        My Projects
      </h1>
      {projectsData.map((projectData, index) => (
        <div className="mb-4 lg:mb-8" key={index}>
          <ProjectCard
            title={projectData.title}
            subtitle={projectData.subtitle}
            tags={projectData.tags}
            source={projectData.source}
          />
        </div>
      ))}
    </div>
  );
}

export default MyProjects;
