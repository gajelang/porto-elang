"use client";

import {
  motion,
  motionValue,
  useMotionValue,
  useMotionTemplate,
  type MotionProps,
} from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import CountUp from "react-countup";
import Image from "next/image";
import React from "react";

/* --------------------------------- */
/* ShinyButton.tsx (inline or imported) */
/* --------------------------------- */
// If you have this in a separate file, leave it imported; otherwise, define here.
interface ShinyButtonProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>,
    MotionProps {
  children: React.ReactNode;
  className?: string;
}

export const ShinyButton = React.forwardRef<
  HTMLButtonElement,
  ShinyButtonProps
>(({ children, className, ...props }, ref) => {
  const animationProps = {
    initial: { "--x": "100%", scale: 0.8 } as React.CSSProperties,
    animate: { "--x": "-100%", scale: 1 } as React.CSSProperties,
    whileTap: { scale: 0.95 },
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 1,
      type: "spring",
      stiffness: 20,
      damping: 15,
      mass: 2,
      scale: {
        type: "spring",
        stiffness: 200,
        damping: 5,
        mass: 0.5,
      },
    },
  };

  return (
    <motion.button
      ref={ref}
      className={`relative rounded-full px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow-md hover:shadow-white dark:hover:shadow-white ${className}`}
      {...animationProps}
      {...props}
    >
      <span
        className="relative block size-full text-sm uppercase tracking-wide text-[rgb(0,0,0,65%)] dark:font-light dark:text-[rgb(255,255,255,90%)]"
        style={{
          maskImage:
            "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          maskComposite: "exclude",
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--primary)/10%)_calc(var(--x)+20%),hsl(var(--primary)/50%)_calc(var(--x)+25%),hsl(var(--primary)/10%)_calc(var(--x)+100%))] p-px"
      ></span>
    </motion.button>
  );
});

ShinyButton.displayName = "ShinyButton";

/* --------------------------------- */
/* HeroSection.tsx */
/* --------------------------------- */
export function HeroSection() {
  // These are fine at the top level
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

  // The achievements and styles
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
    { top: "45%", right: "3%", z: 18, scale: 1.1 }, // Front End Project
    { top: "80%", left: "29%", z: 18, scale: 1.4 }, // UI/UX Project
    // Duplicates for depth
    { top: "22%", left: "20%", z: 5, scale: 0.7 }, // Instagram Posts duplicate
    { top: "30%", right: "25%", z: 8, scale: 0.6 }, // Accounts Reached duplicate
    { top: "50%", left: "30%", z: 7, scale: 0.8 }, // Impressions duplicate
  ];

  /* 
    Instead of using the useMotionValue Hook inside the map, 
    we use motionValue() which is not a Hook. 
  */
  const xValues = achievementStyles.map(() => motionValue(0));
  const yValues = achievementStyles.map(() => motionValue(0));

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
        className="absolute inset-0 z-10 h-full hidden md:flex"
      >
        {achievementStyles.map((style, index) => {
          const achievement = achievements[index % achievements.length];
          const x = xValues[index];
          const y = yValues[index];

          // Parallax effect callback
          const handleParallax = (e: React.MouseEvent) => {
            const speed = style.z * 0.15; // Reduced parallax speed
            const offsetX =
              ((e.clientX - window.innerWidth / 2) * speed) / 100;
            const offsetY =
              ((e.clientY - window.innerHeight / 2) * speed) / 100;
            x.set(offsetX);
            y.set(offsetY);
          };

          return (
            <motion.div
              key={index}
              className="absolute text-center min-w-[160px]"
              style={{
                top: style.top,
                left: style.left,
                right: style.right,
                // Here we pass x, y as motion values:
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
                className="backdrop-blur-lg rounded-2xl p-4 shadow-xl"
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
        <h1 className="text-6xl md:text-8xl font-bold mb-4 md:mb-6">
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
          className="rounded-full px-6 py-2 md:px-14 md:py-3 md:text-1xl hover:shadow-sm hover:shadow-white transition-all ease-in-out"
          whileHover={{ scale: 1.05 }}
        >
          Let&apos;s Connect
        </ShinyButton>
      </motion.div>
    </section>
  );
}
