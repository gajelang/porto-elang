"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useTransform,
  useScroll,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ----------------------------------------
   CUSTOM COMPONENT: AnimatedTitle
---------------------------------------- */
function AnimatedTitle({
  text = "My Portfolio",
  animateBy = "words",
  direction = "top",
  delayStep = 1,
  threshold = 1,
  rootMargin = "0px",
}: {
  text: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  delayStep?: number;
  threshold?: number;
  rootMargin?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const elements = animateBy === "words" ? text.split(" ") : text.split("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const variants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: direction === "top" ? -40 : 40,
    },
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        delay: i * delayStep,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div ref={containerRef} className="inline-block">
      {elements.map((item, i) => (
        <motion.span
          key={`word-${i}`}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={i}
          variants={variants}
          className="inline-block text-white"
          style={{ whiteSpace: "pre" }}
        >
          {item}
          {animateBy === "words" && i < elements.length - 1 && " "}
        </motion.span>
      ))}
    </div>
  );
}

/* ----------------------------------------
   TYPES & DATA
---------------------------------------- */
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
Used bold typography and vibrant colors to create impactful visuals.`,
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
Utilized HTML, CSS, Tailwind CSS, and Next.js for optimal performance.`,
    technologies: ["HTML", "CSS", "Tailwind CSS", "Next.js"],
    demoUrl: "#",
    sourceUrl: "#",
  },
  {
    id: 5,
    title: "Instagram Content Creation",
    category: "Social Media",
    coverImage: "/porto/ICO.png",
    images: [
      "/porto/o1.jpg",
      "/porto/o2.jpg",
      "/porto/o3.jpg",
      "/porto/o4.jpg",
      "/porto/o5.jpg",
      "/porto/o6.jpg",
    ],
    description: `Created engaging Instagram content to boost brand awareness and follower growth.
Produced high-quality graphics and animations using Canva and Adobe Photoshop.`,
    technologies: ["Canva", "Adobe Photoshop"],
    demoUrl: "#",
    sourceUrl: "#",
  },
];

/* ----------------------------------------
   MAIN COMPONENT: PortfolioSection
---------------------------------------- */
export function PortfolioSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedFullImage, setSelectedFullImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Deteksi viewport mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Nonaktifkan scroll pada body ketika modal full preview terbuka
  useEffect(() => {
    if (selectedFullImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedFullImage]);

  // Untuk animasi scroll (desktop)
  const containerRef = useRef<HTMLDivElement>(null);
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
        {/* TITLE WITH BLUR ANIMATION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="text-5xl md:text-9xl font-bold mb-4">
            <AnimatedTitle
              text="My Portfolio"
              animateBy="words"
              direction="top"
              delayStep={0.15}
            />
          </div>
          <div className="w-20 bg-primary mx-auto" />
        </motion.div>

        {/* Mobile View Cards */}
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
                  onClick={() => setSelectedProject(project)}
                >
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-end p-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {project.title}
                      </h3>
                      <p className="text-sm text-white">{project.category}</p>
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
                onClick={() => setSelectedProject(project)}
              />
            );
          })}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSelectedProject(null)}
        >
          {isMobile ? (
            // Mobile: Modal ditampilkan di tengah
            <div
              className="fixed inset-0 flex items-center justify-center px-4 py-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-black w-full mx-auto rounded-xl p-4 relative overflow-y-auto"
                style={{ maxWidth: "720px", maxHeight: "90vh", margin: "1rem" }}
              >
                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(null);
                  }}
                  className="absolute top-2 right-2 text-white z-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                {/* Modal Content (Mobile) */}
                <div className="flex flex-col gap-4 overflow-y-auto pt-8">
                  <h3 className="text-2xl font-bold text-white">
                    {selectedProject.title}
                  </h3>
                  <p className="text-lg text-white">
                    {selectedProject.category}
                  </p>
                  <p className="text-white whitespace-pre-line">
                    {selectedProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-gray-800 rounded-full text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {/* Thumbnail Grid with overlay label */}
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProject.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="w-full h-32 relative cursor-pointer"
                        onClick={() => setSelectedFullImage(img)}
                      >
                        <Image
                          src={img}
                          alt={`${selectedProject.title} image ${idx + 1}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                        <span className="absolute bottom-1 right-1 text-xs text-white bg-black/50 px-1 rounded">
                          click for full preview
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            // Desktop: Modal ditampilkan di tengah
            <div
              className="fixed inset-0 flex items-center justify-center px-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-black w-full mx-auto rounded-xl p-4 relative overflow-y-auto"
                // Tidak menetapkan properti height agar container menyesuaikan konten dan bisa discroll jika perlu
                style={{ maxWidth: "720px", maxHeight: "90vh", margin: "1rem" }}
                onClick={(e: { stopPropagation: () => any; }) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(null);
                  }}
                  className="absolute top-2 right-2 text-white z-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                {/* Modal Content (Desktop) */}
                <div className="flex flex-col gap-4 overflow-y-auto">
                  <h3 className="text-2xl font-bold text-white">
                    {selectedProject.title}
                  </h3>
                  <p className="text-lg text-white">
                    {selectedProject.category}
                  </p>
                  <p className="text-white whitespace-pre-line">
                    {selectedProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-gray-800 rounded-full text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {/* Thumbnail Grid with overlay label */}
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProject.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="w-full h-32 relative cursor-pointer"
                        onClick={() => setSelectedFullImage(img)}
                      >
                        <Image
                          src={img}
                          alt={`${selectedProject.title} image ${idx + 1}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                        <span className="absolute bottom-1 right-1 text-xs text-white bg-black/50 px-1 rounded">
                          click for full preview
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}

      {/* Full Image Modal */}
      {selectedFullImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setSelectedFullImage(null)}
        >
          {isMobile ? (
            // Mobile: Full Preview Modal dengan scroll aktif pada container gambar
            <div
              className="fixed inset-0 flex items-center justify-center px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-black w-full mx-auto rounded-xl p-4 relative overflow-y-auto"
                style={{ maxWidth: "720px", maxHeight: "90vh", margin: "1rem" }}
              >
                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFullImage(null);
                  }}
                  className="absolute top-2 right-2 text-white z-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                {/* Full Image Container dengan scrollbar */}
                <div
                  className="relative w-full overflow-y-scroll"
                  style={{ height: "calc(90vh - 4rem)" }}
                >
                  <Image
                    src={selectedFullImage}
                    alt="Full preview"
                    width={720}
                    height={1080}
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>
              </motion.div>
            </div>
          ) : (
            // Desktop: Full Preview Modal dengan scroll aktif pada container gambar
            <div
              className="fixed inset-0 flex items-center justify-center px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-black w-full mx-auto rounded-xl p-4 relative overflow-y-auto"
                style={{ maxWidth: "720px", maxHeight: "90vh", margin: "1rem" }}
              >
                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFullImage(null);
                  }}
                  className="absolute top-2 right-2 text-white z-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                {/* Full Image Container dengan scrollbar */}
                <div
                  className="relative w-full overflow-y-scroll"
                  style={{ height: "calc(90vh - 4rem)" }}
                >
                  <Image
                    src={selectedFullImage}
                    alt="Full preview"
                    width={720}
                    height={1080}
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </section>
  );
}

/* ----------------------------------------
   DESKTOP CARD COMPONENT
---------------------------------------- */
interface CardProps {
  i: number;
  project: Project;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  onClick: () => void;
}

function Card({ i, project, progress, range, targetScale, onClick }: CardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="relative -top-[25%] h-[500px] w-[80%] rounded-lg bg-black shadow-white origin-top p-8 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={onClick}
      >
        <div className="flex h-full gap-8">
          {/* Left side: Text & Title */}
          <div className="w-3/4 flex flex-col justify-between">
            <div>
              <h3 className="text-6xl font-bold text-white mb-4">
                {project.title}
              </h3>
              <p className="text-xl mb-4 text-white">{project.category}</p>
              <ul className="text-md list-disc pl-4 mt-8 text-white">
                {project.description.split("\n").map((line, idx) => (
                  <li key={idx} className="mb-2">
                    {line.trim()}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1 text-xs rounded-full text-white">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right side: Static image */}
          <div className="w-1/2 relative rounded-lg overflow-hidden">
            <div className="w-full h-full">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Shiny Effect on the Card */}
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
            className="absolute inset-0 block rounded-[inherit] bg-[linear-gradient(-75deg,hsla(var(--primary)/10%)_calc(var(--x)+20%),hsla(var(--primary)/50%)_calc(var(--x)+25%),hsla(var(--primary)/10%)_calc(var(--x)+100%))] p-px"
            style={{
              mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box, linear-gradient(rgb(0,0,0), rgb(0,0,0))",
              maskComposite: "exclude",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
