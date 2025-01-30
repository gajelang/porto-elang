"use client"

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from "framer-motion"
import { Palette, Smartphone, Layout, PenTool, MonitorSmartphone, Check } from "lucide-react"
import { MagicCard } from "./ui/magic-card"
import { useTheme } from "next-themes"

type Service = {
  icon: React.ComponentType;
  title: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  deliveryTime: string;
};

const services: Service[] = [
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Professional design for your brand",
    features: [
      "4+ Years of Experiences",
      "Marketing Materials",
      "Social Media Graphics",
      "Print Design",
    ],
    isPopular: true,
    deliveryTime: "Delivery in 3-5 working days"
  },
  {
    icon: MonitorSmartphone,
    title: "Web Development",
    description: "Modern web development solutions",
    features: [
      "2+ Years of Experiences",
      "Responsive Design",
      "React/Next.js Development",
      "API Integration"
    ],
    deliveryTime: "Delivery in 7-10 working days"
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native & cross-platform mobile apps",
    features: [
      "1+ Year of Experiences",
      "iOS/Android Development",
      "Flutter Framework",
      "UI/UX Implementation",
    ],
    deliveryTime: "Delivery in 10-14 working days"
  },
  {
    icon: Layout,
    title: "UI/UX Design",
    description: "User-centered interface design",
    features: [
      "2+ Years of Experiences",
      "Wireframing & Prototyping",
      "User Testing",
      "Interactive Prototypes",
    ],
    deliveryTime: "Delivery in 5-7 working days"
  },
  {
    icon: PenTool,
    title: "Social Media Manager",
    description: "Engaging content production",
    features: [
      "4+ Years of Experiences",
      "Analytics & Reporting",
      "Copywriting",
      "Content Strategy",
    ],
    deliveryTime: "Delivery in 3-5 working days"
  },
]

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMounted || isMobile) return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const wrapper = wrapperRef.current;

    if (!container || !wrapper) return;

    const cards = Array.from(wrapper.children) as HTMLElement[];
    const totalWidth = cards.reduce((acc, card) => acc + card.offsetWidth + 32, 0);

    wrapper.style.width = `${totalWidth}px`;

    const animation = gsap.to(wrapper, {
      x: () => -Math.max(totalWidth - container.offsetWidth, 0),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top 10%',
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(instance => instance.kill());
    };
  }, [isMounted, isMobile]);

  const handleContact = (serviceTitle: string) => {
    window.location.href = `mailto:elangsamudra.work@gmail.com?subject=Inquiry for ${serviceTitle} Service`;
  };

  if (!isMounted) return null;

  return (
    <section id="services" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Services</h2>
          <p className="text-base md:text-lg">Premium solutions for your digital needs</p>
        </motion.div>

        {isMobile ? (
          <div className="flex flex-col gap-8 md:hidden">
            {services.map((service, index) => (
              <MobileServiceCard 
                key={service.title}
                service={service}
                index={index}
                handleContact={handleContact}
                theme={theme}
              />
            ))}
          </div>
        ) : (
          <div 
            ref={containerRef} 
            className="h-[500px] md:h-[600px] overflow-hidden relative"
          >
            <div ref={wrapperRef} className="flex flex-nowrap gap-4 md:gap-8 absolute left-0 top-24">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  index={index}
                  handleContact={handleContact}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: Service;
  index: number;
  handleContact: (serviceTitle: string) => void;
}

const ServiceCard = ({ service, index, handleContact }: ServiceCardProps) => (
  <MagicCard
    className="w-[300px] md:w-[380px] shrink-0 cursor-pointer shadow-xl md:shadow-2xl"
    gradientColor={useTheme().theme === 'dark' ? '#262626' : '#D9D9D955'}
    gradientFrom="#9E7AFF"
    gradientTo="#FE8BBB"
  >
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col gap-4 md:gap-6 h-full p-6 md:p-8"
    >
      <div className="rounded-xl w-fit">
        <service.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
      </div>

      <div className="space-y-2 md:space-y-4 flex-1">
        <h3 className="text-xl md:text-2xl font-bold">{service.title}</h3>
        <p className="text-muted-foreground text-sm md:text-lg">{service.description}</p>
      </div>

      <div className="flex-1 space-y-2 md:space-y-3 my-2 md:my-4">
        {service.features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <Check className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="text-sm md:text-base">{feature}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => handleContact(service.title)}
        className="text-primary font-semibold text-base md:text-lg flex items-center gap-2 mt-2 md:mt-4 hover:gap-3 transition-all group"
      >
        Start a Project
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </button>
    </motion.div>
  </MagicCard>
);

interface MobileServiceCardProps {
  service: Service;
  index: number;
  handleContact: (serviceTitle: string) => void;
  theme: string | undefined;
}

const MobileServiceCard = ({ service, index, handleContact, theme }: MobileServiceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="w-full"
  >
    <MagicCard
      className="w-full cursor-pointer shadow-xl"
      gradientColor={theme === 'dark' ? '#262626' : '#D9D9D955'}
      gradientFrom="#9E7AFF"
      gradientTo="#FE8BBB"
    >
      <div className="flex flex-col gap-4 h-full p-6">
        <div className="rounded-xl w-fit">
          <service.icon className="w-6 h-6 text-primary" />
        </div>

        <div className="space-y-2 flex-1">
          <h3 className="text-xl font-bold">{service.title}</h3>
          <p className="text-muted-foreground text-sm">{service.description}</p>
        </div>

        <div className="flex-1 space-y-2 my-2">
          {service.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => handleContact(service.title)}
          className="text-primary font-semibold text-base flex items-center gap-2 mt-2 hover:gap-3 transition-all group"
        >
          Start a Project
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
    </MagicCard>
  </motion.div>
);