"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import { ShinyButton } from "./ui/shiny-button";

export function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative bg-black px-4 group overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Dots */}
      <div className="absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800 pointer-events-none" />
      <motion.div
        className="pointer-events-none bg-dot-thick-indigo-500 dark:bg-dot-thick-indigo-500 absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="container mx-auto text-center z-20 relative"
        style={{ perspective: 1000 }}
      >
        {/* Profile Section */}
        <div className="h-40 md:h-52 flex flex-col justify-center items-center gap-4 md:gap-7">
          <Image
            className="w-20 h-20 md:w-24 md:h-24 rounded-full"
            src="/img/heads.png"
            alt="Profile"
            width={96}
            height={96}
          />
          <div className="space-x-1">
            <span className="text-white text-lg md:text-2xl font-normal">
              Hey, I&apos;m{" "}
            </span>
            <span className="text-white text-xl md:text-3xl font-bold">
              Elang
            </span>
            <span className="text-white text-lg md:text-2xl font-normal">
              , I&apos;m a
            </span>
          </div>
        </div>

        {/* Title with Text Animation */}
        <h1 className="text-3xl md:text-8xl font-bold mb-4 md:mb-6 leading-snug">
          <TypeAnimation
            sequence={[
              "Graphic Designer",
              2000,
              "UI/UX Designer",
              2000,
              "Content Creator",
              2000,
              "Front-End Developer",
              2000,
              "Social Media Manager",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h1>

        {/* Description */}
        <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-xs md:max-w-2xl mx-auto">
          Let me help you solve your digital problems!
        </p>

        {/* "Let's Connect" Button with Motion Wrapper */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <ShinyButton
            onClick={scrollToContact}
            className="rounded-full px-6 py-2 md:px-14 md:py-3 md:text-1xl"
          >
            Let&apos;s Connect
          </ShinyButton>
        </motion.div>
      </motion.div>
    </section>
  );
}