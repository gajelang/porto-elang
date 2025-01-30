"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  coverImage: string; // Gambar khusus untuk cover
  images: string[]; // Array of images for the project (tidak termasuk cover)
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
    description: `
      - Created high-quality visuals for a shoe brand's promotional campaign.
      - Highlighted product features with realistic and eye-catching imagery.
      - Boosted sales and engagement through social media and e-commerce platforms.
    `,
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
    description: `
      - Designed monthly campaign posters to promote events and increase participation.
      - Used bold typography and vibrant colors to create impactful visuals.
      - Successfully reached over 10,000 people and enhanced event awareness.
    `,
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
    description: `
      - Designed a modern and intuitive mobile interface for a fitness tracking app.
      - Focused on seamless navigation and clear visual hierarchy.

    `,
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
    description: `
      - Developed a responsive and interactive front-end for a corporate website.
      - Utilized HTML, CSS, Tailwind CSS, and Next.js for optimal performance.
      - Increased user engagement by 40% and reduced bounce rate by 25%.
    `,
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
    description: `
      - Created engaging Instagram content to boost brand awareness and follower growth.
      - Produced high-quality graphics and animations using Canva and Adobe Photoshop.
      - Achieved over 100,000 followers and significantly increased post interactions.
    `,
    technologies: ["Canva", "Adobe Photoshop"],
    demoUrl: "#",
    sourceUrl: "#",
  },
];

export function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // State untuk card aktif

  // Fungsi untuk navigasi ke card sebelumnya
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Fungsi untuk navigasi ke card berikutnya
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">My Portfolio</h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </motion.div>

        {/* Mobile: Tampilkan 1 Card */}
        <div className="md:hidden relative">
          <motion.div
            key={projects[currentIndex].id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer group"
            onClick={() => setSelectedProject(projects[currentIndex])}
          >
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src={projects[currentIndex].coverImage} // Gunakan gambar cover
                alt={projects[currentIndex].title}
                width={400}
                height={300}
                className="w-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium">View Project</span>
              </div>
            </div>
          </motion.div>

          {/* Pagination Buttons for Mobile */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Prev.</span>
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop: Tampilkan 3 Card */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.5 }}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer group"
            >
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={project.coverImage} // Gunakan gambar cover
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium">View Project</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for Project Details */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-card p-6 rounded-lg max-w-4xl w-full mx-4 relative outline outline-2 outline-primary max-h-[90vh] overflow-y-auto"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()} // Explicitly type the event
          >
            <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
            <p className="mb-4 whitespace-pre-line">{selectedProject.description}</p>
          
            {/* Scrollable Images Section */}
            <div className="overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedProject.images.map((image, index) => (
                  <div key={index} className="mb-4">
                    <Image
                      src={image}
                      alt={`${selectedProject.title} - Image ${index + 1}`}
                      width={600}
                      height={400}
                      className="w-full rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          
            {/* Technologies */}
            <div className="flex flex-wrap gap-2 my-4">
              {selectedProject.technologies.map((tech) => (
                <span key={tech} className="px-3 bg-gray-900 py-1 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}