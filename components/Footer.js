import Image from "next/image";

import emailIcon32 from "../public/emailx32.png";
import twitterIcon32 from "../public/twitterx32.png";
import linkedinIcon32 from "../public/linkedinx32.png";
import githubIcon32 from "../public/githubx32.png";

function Footer() {
  return (
    <div className="px-4 py-16 bg-slate-100">
      <h1 className="text-3xl text-slate-800 font-serif text-center">
        Get in touch 👋
      </h1>
      <h2 className="mt-2 text-center text-slate-500">
        Feel free to email me about anything. Do you have some feedback or
        suggestions?
      </h2>
      <div className="mt-8 flex justify-center">
        <a className="mr-6" href="mailto:dsahu1997@gmail.com">
          <Image src={emailIcon32} alt="dsahu1997@gmail.com" />
        </a>
        <a
          className="mr-6"
          href="https://twitter.com/divyan5hu"
          target="_blank"
        >
          <Image src={twitterIcon32} alt="divyan5hu" />
        </a>
        <a
          className="mr-6"
          href="https://www.linkedin.com/in/divyanshu-sahu/"
          target="_blank"
        >
          <Image src={linkedinIcon32} alt="divyanshu-sahu" />
        </a>
        <a href="https://github.com/divyanshusahu" target="_blank">
          <Image src={githubIcon32} alt="dsahu1997@gmail.com" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
