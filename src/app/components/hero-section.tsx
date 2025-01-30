"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown } from "lucide-react";
import CountUp from "react-countup";
import { cn } from "@/lib/utils";
import { ShinyButton } from "./ui/shiny-button";

export function HeroSection() {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const achievements = [
    { value: 2880, suffix: "+", label: "Instagram Posts" },
    { value: 144, suffix: "M+", label: "Accounts Reached" },
    { value: 4, suffix: "+", label: "Years of Experience" },
    { value: 100, suffix: "K+", label: "Followers Gained" },
    { value: 200, suffix: "M+", label: "Impressions" },
    { value: 5, suffix: "+", label: "Front End Project" },
    { value: 10, suffix: "+", label: "UI/UX Project" },
  ];

  const achievementStyles = [
    // Main achievements
    { top: "1%", left: "5%", z: 20, scale: 1.3 }, // Instagram Posts
    { top: "15%", right: "5%", z: 20, scale: 1.2 }, // Accounts Reached
    { top: "70%", left: "9%", z: 22, scale: 1.1 }, // Years of Experience
    { top: "83%", right: "20%", z: 22, scale: 1.4 }, // Followers Gained
    { top: "35%", left: "2%", z: 18, scale: 0.9 }, // Impressions
    { top: "45%", right: "3%", z: 18, scale: 1.1 }, // Front End Project (most prominent)
    { top: "80%", left: "29%", z: 18, scale: 1.4 }, // UI/UX Project

    // Duplicates for depth
    { top: "22%", left: "20%", z: 5, scale: 0.7 }, // Instagram Posts duplicate
    { top: "30%", right: "25%", z: 8, scale: 0.6 }, // Accounts Reached duplicate
    { top: "50%", left: "30%", z: 7, scale: 0.8 }, // Impressions duplicate
  ];

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

      {/* Achievements Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute inset-0 z-10 h-full"
      >
        {achievementStyles.map((style, index) => {
          const achievement = achievements[index % achievements.length];
          const x = useMotionValue(0);
          const y = useMotionValue(0);

          const handleParallax = (e: React.MouseEvent) => {
            const speed = style.z * 0.15; // Reduced parallax speed
            const offsetX = (e.clientX - window.innerWidth / 2) * speed / 100;
            const offsetY = (e.clientY - window.innerHeight / 2) * speed / 100;
            x.set(offsetX);
            y.set(offsetY);
          };

          return (
            <motion.div
              key={index}
              className="absolute text-center min-w-[160px]"
              style={{
                ...style,
                x,
                y,
                zIndex: style.z,
                filter: `blur(${Math.max(0, 25 - style.z)}px)`,
              }}
              whileHover={{
                scale: style.scale * 1.15,
                zIndex: 50,
                filter: "blur(0px)",
              }}
              onMouseMove={handleParallax}
            >
              <motion.div
                className="bg-black/50 backdrop-blur-lg rounded-2xl p-4 shadow-xl"
                style={{
                  transform: `scale(${style.scale})`,
                  transformStyle: "preserve-3d",
                }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-primary">
                  <CountUp end={achievement.value} duration={5} />
                  {achievement.suffix}
                </h2>
                <p className="text-sm md:text-base text-muted-foreground">
                  {achievement.label}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

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
          <img
            className="w-20 h-20 md:w-24 md:h-24 rounded-full"
            src="/img/heads.png"
            alt="Profile"
          />
          <div className="space-x-1">
            <span className="text-white text-lg md:text-2xl font-normal">
              Hey, I'm{" "}
            </span>
            <span className="text-white text-xl md:text-3xl font-bold">
              Elang
            </span>
            <span className="text-white text-lg md:text-2xl font-normal">
              , I'm a
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

        {/* "Let's Connect" Button */}
        <ShinyButton
          onClick={scrollToContact}
          className="rounded-full px-6 py-2 md:px-14 md:py-3 md:text-1xl"
          whileHover={{ scale: 1.05 }}
        >
          Let's Connect
        </ShinyButton>
      </motion.div>
    </section>
  );
}