"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type Experience = {
  position: string;
  duration: string;
  type: string;
  location: string;
  skills: string[];
  achievements: string[];
};

type Company = {
  name: string;
  logo: string;
  url?: string;
};

const companies: Company[] = [
  { 
    name: "Ncr Sport", 
    logo: "/img/ncrw.png",
    url: "https://ncrsport.com" 
  },
  { 
    name: "Hoops Point", 
    logo: "/img/hoops2.png",
    url: "https://ncrsport.com" 
  },
  { 
    name: "Rewind", 
    logo: "/img/rewind w.png" 
  },
  { 
    name: "Student Staff Informatika UII", 
    logo: "/img/uiiw.png" 
  },
  { 
    name: "Google Developer Student Club", 
    logo: "/img/gdsc.png" 
  },
  { 
    name: "Abankirenk Kreatif", 
    logo: "/img/abw.png" 
  },
];

const experienceData: Record<string, Experience> = {
  "Ncr Sport": {
    position: "Creative Director",
    duration: "Nov 2024 - Present",
    type: "Contract · Remote",
    location: "Bandung, Jawa Barat, Indonesia",
    skills: ["Adobe Photoshop", "Content Creation", "Strategy Development", "Team Leadership"],
    achievements: [
      "Led creative direction for sports apparel brand",
      "Increased social media engagement by 40% through innovative campaigns",
      "Managed cross-functional teams to deliver projects on tight deadlines",
      "Achieved average growth of 5,000+ followers/month",
      "Peaked at over 9,000 followers in February 2024"
    ]
  },
  "Hoops Point": {
    position: "Social Media Manager",
    duration: "Oct 2024 - Present",
    type: "Freelance · Remote",
    location: "Bandung, Jawa Barat, Indonesia",
    skills: ["Social Media Growth", "Content Strategy", "Audience Engagement"],
    achievements: [
      "Increased followers to 11,000+ in November 2024",
      "Maintained strong engagement with 1,500+ average likes per post",
      "Managed all social media platforms for Hoops Point",
      "Collaborated with the creative team to produce engaging content"
    ]
  },
  "Rewind": {
    position: "Social Media Manager",
    duration: "Nov 2024 - Present",
    type: "Freelance · Remote",
    location: "Bandung, Jawa Barat, Indonesia",
    skills: ["Social Media Strategy", "Audience Development", "Launch Campaigns", "Content Optimization"],
    achievements: [
      "Building target audience for upcoming app launch",
      "Developing pre-launch social media strategy",
      "Creating engagement-focused content series",
      "Establishing brand voice and visual identity",
      "Collaborating with product team for campaign alignment"
    ]
  },
  "Student Staff Informatika UII": {
    position: "Graphic Designer",
    duration: "Dec 2022 - Present",
    type: "Contract · On-site",
    location: "Sleman, Yogyakarta",
    skills: ["Event Design", "Brand Management", "Team Leadership"],
    achievements: [
      "Head Creative for Informatics Expo 2025 at Pakuwon Mall",
      "Designed 100+ social media assets with consistent brand identity",
    ]
  },
  "Google Developer Student Club": {
    position: "Creative Designer",
    duration: "Nov 2023 - Oct 2024",
    type: "Contract · On-site",
    location: "Yogyakarta, Indonesia",
    skills: ["Event Branding", "Workshop Materials", "Digital Marketing"],
    achievements: [
      "Created visual assets for 20+ tech workshops",
      "Increased event participation by 25% through improved designs",
      "Maintained brand consistency across all GDSC materials"
    ]
  },
  "Abankirenk Kreatif": {
    position: "Layouter",
    duration: "Feb 2023 - Aug 2023",
    type: "Freelance · Hybrid",
    location: "Yogyakarta, Indonesia",
    skills: ["Yearbook Design", "Layout Design", "Print Production"],
    achievements: [
      "Designed 200+ page school yearbook",
      "Coordinated with photography and editorial teams",
      "Implemented creative layouts that improved readability"
    ]
  }
};

export function CompanyLogo() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const companyData = selectedCompany ? experienceData[selectedCompany] : null;

  return (
    <div className="py-12 bg-background relative">
      <div className="container mx-auto px-2 md:px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Professional Journey
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
          {companies.map((company, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex justify-center items-center p-4 px-10 md:p-4 md:px-7 bg-white/5 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
              onClick={() => setSelectedCompany(company.name)}
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={120}
                height={60}
                className="object-contain h-8 md:h-14 w-auto max-w-[80%]"
              />
            </motion.div>
          ))}
        </div>

        {/* Pop-up Modal */}
        {selectedCompany && companyData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 md:p-4 z-50"
            onClick={() => setSelectedCompany(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-background w-full max-w-full md:max-w-2xl rounded-xl shadow-2xl p-4 md:p-6 relative mx-2 my-4 max-h-[90vh] overflow-y-auto"
              onClick={(e: { stopPropagation: () => any; }) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCompany(null)}
                className="absolute top-2 right-2 md:top-4 md:right-4 text-foreground/50 hover:text-foreground"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Modal Content */}
              <div className="flex flex-col items-start space-y-4 md:space-y-6">
                {/* Logo */}
                <div className="w-full flex justify-start">
                  <Image
                    src={companies.find(c => c.name === selectedCompany)?.logo || ""}
                    alt={selectedCompany}
                    width={200}
                    height={200}
                    className="w-16 md:w-24 object-contain"
                  />
                </div>

                {/* Position Info */}
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-lg md:text-2xl font-bold">
                    {companyData.position}
                  </h3>
                  <p className="text-primary font-medium text-sm md:text-base">
                    {selectedCompany}
                  </p>
                  <p className="text-xs md:text-sm text-foreground/80">
                    {companyData.duration}
                  </p>
                  <p className="text-xs md:text-sm text-foreground/70">
                    {companyData.type} · {companyData.location}
                  </p>
                </div>
                {/* Achievements */}
                <div className="space-y-2 md:space-y-3 w-full">
                  <h4 className="font-semibold text-base md:text-lg">
                    Key Achievements:
                  </h4>
                  <ul className="list-disc pl-4 md:pl-6 space-y-1 md:space-y-2 text-xs md:text-sm">
                    {companyData.achievements.map((achievement, i) => (
                      <li 
                        key={i} 
                        className="text-foreground/80 hyphens-auto overflow-wrap-break-word"
                      >
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}