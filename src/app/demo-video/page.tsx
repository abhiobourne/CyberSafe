"use client";

import MaxWidthWrapper from "../components/ui/MaxWidthWrapper";
import { useEffect } from "react";

const DemoVideoPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className=" flex flex-col min-h-screen bg-gradient-to-b from-teal-400 via-blue-600 to-indigo-800 py-20 text-white w-full">
      <MaxWidthWrapper  className="flex-grow flex flex-col px-20">
        <div className="flex flex-col items-center text-center w-full mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Watch Our Demo Video
          </h1>
          <p className="mt-6 text-2xl text-gray-100 w-full">
            Explore how our platform empowers individuals with practical online safety and digital wellbeing strategies.
          </p>

          <div className="mt-10 w-full max-w-4xl aspect-video shadow-2xl rounded-xl overflow-hidden border-4 border-white">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/JpfEBQn2CjM?si=4BgfUjfP540Rv2vI"
              title="Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default DemoVideoPage;
