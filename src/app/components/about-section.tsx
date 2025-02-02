"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Code, Layout, Palette, PenTool } from "lucide-react";
import { CardStack } from "./CardStack"; // Adjust import path if needed

// Skill data for the CardStack
const skillCards = [
  {
    id: 1,
    title: "Social Media",
    subtitle: "Brand Building",
    description:
      "Developing strategies and creative content to increase reach and engagement on social media platforms.",
    icon: <Palette className="w-8 h-8 text-white" />, // changed from text-primary
  },
  {
    id: 2,
    title: "Web Development",
    subtitle: "Frontend & Backend",
    description:
      "Building modern, responsive, and high-performance websites using technologies like Next.js, Tailwind CSS, etc.",
    icon: <Code className="w-8 h-8 text-white" />, // changed from text-primary
  },
  {
    id: 3,
    title: "UI/UX Design",
    subtitle: "User-Centered Approach",
    description:
      "Designing intuitive interfaces that prioritize user experience across various platforms.",
    icon: <Layout className="w-8 h-8 text-white" />, // changed from text-primary
  },
  {
    id: 4,
    title: "Content Creation",
    subtitle: "Engaging Content",
    description:
      "Producing visually appealing and narrative-driven content for multiple digital purposes.",
    icon: <PenTool className="w-8 h-8 text-white" />, // changed from text-primary
  },
];

// Tools data
const tools = [
  {
    name: "Adobe Photoshop",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
  },
  {
    name: "Adobe Illustrator",
    icon: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg",
  },
  {
    name: "VS Code",
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg",
  },
  {
    name: "Next.Js",
    icon: "https://assets.vercel.com/image/upload/v1662134459/nextjs/Icon_dark_background.png",
  },
  {
    name: "HTML",
    icon: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
  },
  {
    name: "CSS Tailwind",
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
  },
  {
    name: "Figma",
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
  },
  {
    name: "Premiere Pro",
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg",
  },
  {
    name: "Notion",
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-20 px-8">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-white">
            About Me
          </h2>
          <div className="w-16 md:w-20 h-0.5 md:h-1 bg-primary mx-auto" />
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-12">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden">
                <Image
                  src="/img/profile.png"
                  alt="Profile"
                  width={120}
                  height={120}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-3xl md:text-6xl font-bold text-white">
                Hi, I&apos;m Elang
              </h3>
            </div>

            <p className="text-center md:text-left text-sm md:text-base mb-6 text-white">
              I&apos;m a passionate developer and designer with over 5 years of experience creating engaging and functional digital experiences.
            </p>
          </motion.div>

          {/* Skills CardStack */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center md:justify-start"
          >
            <CardStack items={skillCards} />
          </motion.div>
        </div>

        {/* Tools Section */}
        <div className="mt-8 md:mt-12">
          <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-center md:text-left text-white">
            Tools I Use
          </h3>

          {/* Mobile Grid Layout */}
          <div className="md:hidden grid grid-cols-3 sm:grid-cols-4 gap-4">
            {tools.map((tool, index) => (
              <div key={index} className="flex flex-col items-center p-2">
                <Image
                  src={tool.icon}
                  alt={tool.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
                <span className="text-xs text-center mt-2 text-white">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>

          {/* Desktop: Marquee Layout */}
          <div className="hidden md:block overflow-hidden py-4">
            <motion.div
              className="flex gap-x-8"
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                repeat: Infinity,
                duration: 40,
                ease: "linear",
              }}
            >
              {[...tools, ...tools].map((tool, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 shrink-0 pr-8 border-r border-muted"
                >
                  <Image
                    src={tool.icon}
                    alt={tool.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                  <span className="text-base font-medium whitespace-nowrap text-white">
                    {tool.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
