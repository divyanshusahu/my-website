import Image from "next/image";

import emailIcon32 from "../public/emailx32.png";
import twitterIcon32 from "../public/twitterx32.png";
import linkedinIcon32 from "../public/linkedinx32.png";
import githubIcon32 from "../public/githubx32.png";

function Footer() {
  return (
    <div className="px-4 py-16 bg-slate-100 dark:bg-slate-800 transition-colors duration-200">
      <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-serif text-center transition-colors duration-200">
        Get in touch 👋
      </h1>
      <h2 className="mt-2 text-center text-slate-500 dark:text-slate-400 transition-colors duration-200">
        Feel free to email me about anything. Do you have some feedback or
        suggestions?
      </h2>
      <div className="mt-8 flex justify-center gap-6">
        <a href="mailto:dsahu1997@gmail.com">
          <Image src={emailIcon32} alt="dsahu1997@gmail.com" width={32} height={32} className="dark:invert transition-all duration-200 hover:opacity-80" />
        </a>
        <a
          href="https://twitter.com/divyan5hu"
          target="_blank"
          rel="noreferrer"
        >
          <Image src={twitterIcon32} alt="divyan5hu" width={32} height={32} className="dark:invert transition-all duration-200 hover:opacity-80" />
        </a>
        <a
          href="https://www.linkedin.com/in/divyanshu-sahu/"
          target="_blank"
          rel="noreferrer"
        >
          <Image src={linkedinIcon32} alt="divyanshu-sahu" width={32} height={32} className="dark:invert transition-all duration-200 hover:opacity-80" />
        </a>
        <a
          href="https://github.com/divyanshusahu"
          target="_blank"
          rel="noreferrer"
        >
          <Image src={githubIcon32} alt="dsahu1997@gmail.com" width={32} height={32} className="dark:invert transition-all duration-200 hover:opacity-80" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
