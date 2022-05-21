import Image from "next/image";
import profilePic from "../public/profile.jpeg";

function Home() {
  return (
    <div className="px-4 pt-16">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 lg:col-span-1 lg:order-last mx-auto">
          <Image src={profilePic} alt="Divyanshu Sahu" />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <div className="h-full flex items-center">
            <h1 className="text-3xl text-slate-800 font-serif">
              Hi, I&apos;m Divyanshu. I&apos;m an experienced full stack developer with
              deep interest in application security.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
