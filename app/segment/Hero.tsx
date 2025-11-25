"use client";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { BgParticles } from "../tsparticles";
import { GlobalStore } from "../GlobalStore";
const Hero = () => {

  const {is_dark} = GlobalStore();
  return (
    <div className="relative container flex flex-col sm:pl-28 pt-10 sm:pt-40 h-full max-w-full overflow-hidden" id="home">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      {/* Floating Background Shapes */}
      <BgParticles key={is_dark.toString()}  />
      <div className="absolute -bottom-20 -right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-around w-full overflow-x-hidden">
        {/* Text Section */}
        <div className="flex flex-col justify-between sm:w-2/3 sm:p-1 text-center sm:text-start items-center sm:items-start z-10 relative">
          <div className="flex flex-col gap-2">
            <h1
              className="font-extrabold text-3xl sm:text-6xl text-black dark:text-white tracking-tight"
              data-aos="fade-right"
              data-aos-delay="800"
              data-aos-duration="500"
            >
              Randy Jan P. Rongcales Jr.
            </h1>
            <h2
              className="text-xl text-gray-500 lg:text-4xl dark:text-white"
              data-aos="fade-right"
              data-aos-delay="900"
              data-aos-duration="500"
            >
              I&apos;m a{" "}
              <span className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
                Software Developer
              </span>
            </h2>

            <h5
              className="text-base text-gray-500 lg:text-2xl sm:max-w-[80%] dark:text-white mt-4"
              data-aos="fade-right"
              data-aos-delay="1000"
              data-aos-duration="500"
            >
              “Code is a conversation between the developer and the future.”
            </h5>
          </div>

          {/* Action Buttons & Socials */}
          <div
            className="mt-6 flex flex-row items-center gap-4 dark:text-white"
            data-aos="fade-right"
            data-aos-delay="1100"
            data-aos-duration="500"
          >
            <a href="mailto:rongcales14@gmail.com" className="transform transition-transform hover:scale-105">
              <Button className="flex gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-purple-500 hover:to-blue-500">
                Contact Me
                <FontAwesomeIcon icon={faEnvelope} />
              </Button>
            </a>
            <a
              href="https://github.com/RandyJan"
              target="_blank"
              rel="noreferrer"
              className="transform transition-transform hover:scale-110"
            >
              <FontAwesomeIcon icon={faGithub} size="2xl" className="text-gray-700 dark:text-white" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="transform transition-transform hover:scale-110"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2xl" className="text-blue-700 dark:text-blue-400" />
            </a>
          </div>
        </div>

        {/* Profile Image */}
        <div
          className="
            w-2/3 sm:w-1/5
            p-[4px]
            rounded-xl
            bg-gradient-to-br from-blue-500 to-purple-500
            transform transition-transform hover:scale-105 hover:rotate-3
          "
          data-aos="fade-left"
          data-aos-delay="1200"
          data-aos-duration="500"
        >
          <img
            src="/images/profile/randyjanrongcales.png"
            alt="randyjanrongcales"
            className="object-cover rounded-2xl w-full h-full shadow-lg"
          />
        </div>
      </div>

      {/* Tailwind Animation Styles */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Hero;
