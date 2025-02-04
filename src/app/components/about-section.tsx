"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface SocialMediaButtonProps {
  imageUrl: string;
  alt: string;
  label: string;
}

const SocialMediaButton: React.FC<SocialMediaButtonProps> = ({ imageUrl, alt, label }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="group flex items-center px-3 py-2 border border-white rounded-full cursor-pointer transition-all duration-300 hover:bg-white/10"
    >
      <div className="w-6 h-6 relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={alt}
          width={24}
          height={24}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <span className="ml-2 text-white text-sm hidden group-hover:inline-block transition-opacity duration-200">
        {label}
      </span>
    </motion.div>
  );
};

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
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  // Teks singkat
  const shortText = (
    <>
      <p className="text-white text-lg md:text-xl leading-relaxed">
        I design, develop, and drive digital experiences that{" "}
        <span className="font-bold">connect brands</span> with{" "}
        <span className="font-bold">people</span>. With over 4 years of hands-on experience, I specialize in three key areas: social media management, UI/UX design, and front-end development. My approach blends creativity with analytical thinking, ensuring every project isn’t just visually appealing, but also{" "}
        <span className="font-bold">impactful and results-driven</span>.
      </p>
    </>
  );

  // Teks lengkap
  const fullText = (
    <div className="space-y-4">
      {shortText}
      <p className="text-white text-lg md:text-xl leading-relaxed">
        As a Social Media Manager, I don’t just grow numbers—I build communities. I’ve led content strategies that generated consistent follower growth (5,000+ per month) and sustained high engagement rates. From crafting compelling posts to analyzing performance metrics, I ensure every piece of content serves a purpose.
      </p>
      <p className="text-white text-lg md:text-xl leading-relaxed">
        In UI/UX design, I focus on clarity and usability. Whether wireframing, prototyping, or designing user interfaces, I create experiences that feel intuitive and effortless. My background in front-end development allows me to bridge the gap between design and code, turning ideas into interactive, responsive websites.
      </p>
      <p className="text-white text-lg md:text-xl leading-relaxed">
        I thrive in dynamic environments—whether collaborating with cross-functional teams, leading creative projects, or solving complex problems. My goal is simple: to create digital experiences that not only look good but also work seamlessly and leave a lasting impact.
      </p>
      <p className="text-white text-lg md:text-xl leading-relaxed">
        <span className="font-bold">Let’s build something meaningful</span>.
      </p>
    </div>
  );

  return (
    <section id="about" className="py-8 md:py-16 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="w-full px-4 md:px-8 py-6 md:py-12 bg-stone-950 flex flex-col gap-6 rounded-xl">
            {/* Profile Row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Image
                    src="/img/profile.png"
                    alt="Profile"
                    width={80}
                    height={80}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white"
                  />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-medium text-white">
                  Elang Samudra
                </h2>
              </div>
              {/* After – replace each SocialMediaButton with your SVG */}
              <div className="flex gap-2 transition-all ease-in-out">
  <a
    href="https://www.linkedin.com/in/elangsamudra" // Ganti dengan URL LinkedIn Anda
    target="_blank"
    rel="noopener noreferrer"
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="group flex items-center px-3 py-2 border border-white rounded-full cursor-pointer transition-all duration-300 hover:bg-white/10"
    >
      <div className="w-6 h-6">
        {/* Tempelkan SVG LinkedIn di sini */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="#fff" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"/>
        </svg>
      </div>
      <span className="ml-2 text-white text-sm hidden group-hover:inline-block transition-opacity duration-200">
        LinkedIn
      </span>
    </motion.div>
  </a>

  <a
    href="mailto:elangsamudra.work@gmail.com" // Ganti dengan email atau link Gmail Anda
    target="_blank"
    rel="noopener noreferrer"
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="group flex items-center px-3 py-2 border border-white rounded-full cursor-pointer transition-all duration-300 hover:bg-white/10"
    >
      <div className="w-6 h-6">
        {/* Tempelkan SVG Gmail di sini */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="#fff" d="M20 18h-2V9.25L12 13L6 9.25V18H4V6h1.2l6.8 4.25L18.8 6H20m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"/>
        </svg>
      </div>
      <span className="ml-2 text-white text-sm hidden group-hover:inline-block transition-opacity duration-200">
        Gmail
      </span>
    </motion.div>
  </a>

  <a
    href="https://www.upwork.com/elangsamudra" // Ganti dengan URL Upwork Anda
    target="_blank"
    rel="noopener noreferrer"
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="group flex items-center px-3 py-2 border border-white rounded-full cursor-pointer transition-all duration-300 hover:bg-white/10"
    >
      <div className="w-6 h-6">
        {/* Tempelkan SVG Upwork di sini */}
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 448 512">
          <path fill="#fff" d="M56 32h336c30.9 0 56 25.1 56 56v336c0 30.9-25.1 56-56 56H56c-30.9 0-56-25.1-56-56V88c0-30.9 25.1-56 56-56m214.9 242.2c6.6-52.9 25.9-69.5 51.4-69.5c25.3 0 44.9 20.2 44.9 49.7s-19.7 49.7-44.9 49.7c-27.9 0-46.3-21.5-51.4-29.9m-26.7-41.8c-8.2-15.5-14.3-36.3-19.2-55.6h-62.9v78.1c0 28.4-12.9 49.4-38.2 49.4S84.1 283.4 84.1 255l.3-78.1H48.2V255c0 22.8 7.4 43.5 20.9 58.2c13.9 15.2 32.8 23.2 54.8 23.2c43.7 0 74.2-33.5 74.2-81.5v-52.5c4.6 17.3 15.4 50.5 36.2 79.7L215 392.6h36.8l12.8-78.4c4.2 3.5 8.7 6.6 13.4 9.4c12.3 7.8 26.4 12.2 40.9 12.6h3.4c45.1 0 80.9-34.9 80.9-81.9s-35.9-82.2-80.9-82.2c-45.4 0-70.9 29.7-78.1 60.1z"/>
        </svg>
      </div>
      <span className="ml-2 text-white text-sm hidden group-hover:inline-block transition-opacity duration-200">
        Upwork
      </span>
    </motion.div>
  </a>
</div>
            </div>

            {/* Deskripsi */}
            <div className="w-full space-y-4">
              {isExpanded ? fullText : shortText}
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={toggleExpanded}
                className="cursor-pointer px-4 py-2 rounded-full border border-white w-max transition-colors duration-300 hover:bg-white/10"
              >
                <span className="text-white text-base">
                  {isExpanded ? "See Less" : "See More"}
                </span>
              </motion.div>
            </div>

            {/* Tools Section */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Tools I Use
              </h3>
              {/* Mobile Grid */}
              <div className="md:hidden grid grid-cols-4 gap-4">
                {tools.map((tool, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center p-2 bg-white/5 rounded-lg"
                  >
                    <Image
                      src={tool.icon}
                      alt={tool.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                    />
                  </motion.div>
                ))}
              </div>
              
              {/* Desktop Marquee */}
              <div className="hidden md:block overflow-hidden py-4">
                <motion.div
                  className="flex gap-8"
                  animate={{ x: ["0%", "-100%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 40,
                    ease: "linear",
                  }}
                >
                  {[...tools, ...tools].map((tool, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-2 shrink-0 pr-8 border-r border-muted"
                    >
                      <Image
                        src={tool.icon}
                        alt={tool.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain transition-transform duration-300"
                      />
                      <span className="text-sm font-medium whitespace-nowrap text-white">
                        {tool.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}