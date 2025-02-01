"use client";

import { useState, useRef } from "react";
import {
  motion,
  useTransform,
  useScroll,
  MotionValue, // Import MotionValue for type
} from "framer-motion";
import Image from "next/image";
// Remove X since it's not used
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ------------ Types & Data ------------ */
export interface Project {
  id: number;
  title: string;
  category: string;
  coverImage: string;
  images: string[];
  description: string;
  technologies: string[];
  demoUrl: string;
  sourceUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Shoes Digital Imaging",
    category: "Graphic Design",
    coverImage: "/porto/scov.png",
    images: ["/porto/s1.jpg", "/porto/s2.jpg", "/porto/s3.jpg", "/porto/s4.jpg"],
    description: `Created high-quality visuals for a shoe brand's promotional campaign.
      Highlighted product features with realistic and eye-catching imagery.
      Boosted sales and engagement through social media and e-commerce platforms.`,
    technologies: ["Adobe Photoshop", "Adobe Illustrator"],
    demoUrl: "#",
    sourceUrl: "#",
  },
  {
    id: 2,
    title: "Campaign Poster",
    category: "Graphic Design",
    coverImage: "/porto/CCOV.png",
    images: ["/porto/c1.jpg", "/porto/c3.jpg", "/porto/c4.jpg", "/porto/camp1.jpg"],
    description: `Designed monthly campaign posters to promote events and increase participation.
    Used bold typography and vibrant colors to create impactful visuals.
    Successfully reached over 10,000 people and enhanced event awareness.`,
    technologies: ["Adobe Photoshop", "Adobe Illustrator"],
    demoUrl: "#",
    sourceUrl: "#",
  },
  {
    id: 3,
    title: "Mobile User Interface",
    category: "UI/UX Design",
    coverImage: "/porto/MOCOV.png",
    images: ["/img/mo1.png", "/img/mo2.png"],
    description: `Designed a modern and intuitive mobile interface for a fitness tracking app.
    Focused on seamless navigation and clear visual hierarchy.`,
    technologies: ["Figma"],
    demoUrl: "#",
    sourceUrl: "#",
  },
  {
    id: 4,
    title: "Front-End Web Development",
    category: "Web Development",
    coverImage: "/porto/fe--cov.png",
    images: ["/porto/we1.png", "/porto/wfe.png"],
    description: `Developed a responsive and interactive front-end for a corporate website.
    Utilized HTML, CSS, Tailwind CSS, and Next.js for optimal performance.
    Increased user engagement by 40% and reduced bounce rate by 25%.`,
    technologies: ["HTML", "CSS", "Tailwind CSS", "Next.js"],
    demoUrl: "#",
    sourceUrl: "#",
  },
  {
    id: 5,
    title: "Instagram Content Creation",
    category: "Social Media",
    coverImage: "/porto/ICO.png",
    images: ["/porto/o1.jpg", "/porto/o2.jpg", "/porto/o3.jpg", "/porto/o4.jpg", "/porto/o5.jpg", "/porto/o6.jpg"],
    description: `Created engaging Instagram content to boost brand awareness and follower growth.
    Produced high-quality graphics and animations using Canva and Adobe Photoshop.
    Achieved over 100,000 followers and significantly increased post interactions.`,
    technologies: ["Canva", "Adobe Photoshop"],
    demoUrl: "#",
    sourceUrl: "#",
  },
];

/* ------------ Main Component ------------ */
export function PortfolioSection() {
  // Remove `selectedProject` if not needed:
  // const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1) Define your ref as usual
const containerRef = useRef<HTMLDivElement>(null);

// 2) Pass it to useScroll with a type assertion
const { scrollYProgress } = useScroll({
  target: containerRef as React.RefObject<HTMLElement>,
  offset: ["start start", "end end"],
});

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  return (
    <section id="portfolio" className="py-20" ref={containerRef}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-6xl mx-auto md:text-9xl font-bold mb-4 text-white">
            My Portfolio
          </h2>
          <div className="w-20 bg-primary mx-auto" />
        </motion.div>

        {/* Mobile View */}
        <div className="md:hidden">
          <div className="relative h-[400px]">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="absolute inset-0"
                style={{
                  zIndex: currentIndex === index ? 1 : 0,
                  scale: currentIndex === index ? 1 : 0.9,
                  opacity: currentIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="relative h-full w-full rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => {
                    /* 
                      If you want to open a modal:
                      setSelectedProject(project);
                    */
                  }}
                >
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-end p-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <p className="text-gray-300 text-sm">{project.category}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center gap-4 mt-6">
            <button onClick={handlePrev} className="p-2 rounded-full flex">
              <ChevronLeft className="w-6 h-6 text-white" /> PREV.
            </button>
            <button onClick={handleNext} className="p-2 rounded-full flex">
              NEXT <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Desktop Card Stack */}
        <div className="hidden md:block">
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={project.id}
                i={i}
                project={project}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
                onClick={() => {
                  // setSelectedProject(project);
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------ Card Component (Desktop) ------------ */
interface CardProps {
  i: number;
  project: Project;
  progress: MotionValue<number>; // replaced 'any' with 'MotionValue<number>'
  range: [number, number];
  targetScale: number;
  onClick: () => void;
}

const Card = ({ i, project, progress, range, targetScale, onClick }: CardProps) => {
  // 1) Define your ref as usual
const containerRef = useRef<HTMLDivElement>(null);

// 2) Pass it to useScroll with a type assertion
const { scrollYProgress } = useScroll({
  target: containerRef as React.RefObject<HTMLElement>,
  offset: ["start start", "end end"],
});

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="relative -top-[25%] h-[500px] w-[80%] rounded-lg bg-black shadow-white origin-top p-8 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={onClick}
      >
        <div className="flex h-full gap-8">
          <div className="w-3/4 flex flex-col justify-between">
            <div>
              <h3 className="text-6xl font-bold text-white mb-4">{project.title}</h3>
              <p className="text-gray-300 text-xl mb-4">{project.category}</p>
              <ul className="text-gray-400 text-md list-disc pl-4 mt-8">
                {project.description.split("\n").map((line, idx) => (
                  <li key={idx} className="mb-2">
                    {line.trim()}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1 text-xs rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="w-1/2 relative rounded-lg overflow-hidden">
            <motion.div className="w-full h-full" style={{ scale: imageScale }}>
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* Efek Shiny pada Card */}
        <motion.div
          initial={{ "--x": "100%", scale: 0.8 } as React.CSSProperties}
          animate={{ "--x": "-100%", scale: 1 } as React.CSSProperties}
          whileTap={{ scale: 0.95 }}
          transition={{
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
          }}
          className="absolute inset-0 z-10 rounded-[inherit]"
        >
          <span
            className="absolute inset-0 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--primary)/10%)_calc(var(--x)+20%),hsl(var(--primary)/50%)_calc(var(--x)+25%),hsl(var(--primary)/10%)_calc(var(--x)+100%))] p-px"
            style={{
              mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box, linear-gradient(rgb(0,0,0), rgb(0,0,0))",
              maskComposite: "exclude",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
