"use client";

import { useRef, useEffect, useState, ReactNode, MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  Palette,
  Smartphone,
  Layout,
  PenTool,
  MonitorSmartphone,
  Check,
} from "lucide-react";

/* -------------------------------------------------------------------------------------
   CUSTOM COMPONENT: TiltedCard
------------------------------------------------------------------------------------- */
interface TiltedCardProps {
  containerHeight?: string;
  containerWidth?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  displayOverlayContent?: boolean;
  overlayContent?: ReactNode;
}

function TiltedCard({
  containerHeight = "300px",
  containerWidth = "300px",
  rotateAmplitude = 12,
  scaleOnHover = 1.05,
  showMobileWarning = false,
  showTooltip = true,
  displayOverlayContent = false,
  overlayContent,
}: TiltedCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cardWidth = rect.width;
    const cardHeight = rect.height;
    const centerX = rect.left + cardWidth / 2;
    const centerY = rect.top + cardHeight / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    const rotateX = (mouseY / cardHeight) * -rotateAmplitude;
    const rotateY = (mouseX / cardWidth) * rotateAmplitude;
    setRotationX(rotateX);
    setRotationY(rotateY);
  };

  const handleMouseEnter = () => {
    setScale(scaleOnHover);
  };
  const handleMouseLeave = () => {
    setScale(1);
    setRotationX(0);
    setRotationY(0);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: containerWidth,
        height: containerHeight,
        perspective: "1000px",
      }}
      className="relative flex items-center justify-center"
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseEnter={!isMobile ? handleMouseEnter : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
    >
      {showMobileWarning && isMobile && (
        <div className="absolute z-10 bg-yellow-300 p-2 rounded text-white top-2 text-sm">
          Tilt effect disabled on mobile
        </div>
      )}

      <div
        style={{
          transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${scale})`,
          transformStyle: "preserve-3d",
          transition: "transform 0.2s ease-out",
        }}
        className="relative w-full h-full rounded-lg shadow-md border hover:bg-neutral-900 transition-colors duration-300 ease-in-out overflow-hidden"
      >
        {displayOverlayContent && overlayContent && (
          <div className="absolute inset-0">{overlayContent}</div>
        )}

        {showTooltip && !isMobile && (
          <div className="absolute top-1 left-1 bg-black text-white text-xs px-2 py-1 rounded">
            Hover to tilt
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------
   SERVICE DATA
------------------------------------------------------------------------------------- */
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
    deliveryTime: "Delivery in 3-5 working days",
  },
  {
    icon: MonitorSmartphone,
    title: "Web Development",
    description: "Modern web development solutions",
    features: [
      "2+ Years of Experiences",
      "Responsive Design",
      "React/Next.js Development",
      "API Integration",
    ],
    deliveryTime: "Delivery in 7-10 working days",
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
    deliveryTime: "Delivery in 10-14 working days",
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
    deliveryTime: "Delivery in 5-7 working days",
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
    deliveryTime: "Delivery in 3-5 working days",
  },
];

/* -------------------------------------------------------------------------------------
   SERVICES SECTION
------------------------------------------------------------------------------------- */
export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top 10%",
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      },
    });
    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
    };
  }, [isMounted, isMobile]);

  const handleContact = (serviceTitle: string) => {
    window.location.href = `mailto:elangsamudra.work@gmail.com?subject=Inquiry for ${serviceTitle} Service`;
  };

  if (!isMounted) return null;

  return (
    <section id="services" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-8xl font-bold mb-4 text-white">
            Professional Services
          </h2>
          <p className="text-base md:text-lg text-white">
            Premium solutions for your digital needs
          </p>
        </motion.div>

        {isMobile ? (
          <div className="flex flex-col gap-8 md:hidden">
            {services.map((service, index) => (
              <MobileServiceCard
                key={service.title}
                service={service}
                index={index}
                handleContact={handleContact}
              />
            ))}
          </div>
        ) : (
          <div
            ref={containerRef}
            className="h-[500px] md:h-[600px] overflow-hidden relative"
          >
            <div
              ref={wrapperRef}
              className="flex flex-nowrap gap-4 md:gap-8 absolute left-0 top-24"
            >
              {services.map((service, index) => (
                <DesktopServiceCard
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

function DesktopServiceCard({ service, index, handleContact }: ServiceCardProps) {
  return (
    <TiltedCard
      containerWidth="380px"
      containerHeight="450px"
      rotateAmplitude={12}
      scaleOnHover={1.15}
      showMobileWarning={false}
      showTooltip={false}
      displayOverlayContent={true}
      overlayContent={
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex flex-col h-full p-6 md:p-8"
        >
          <div className="text-white">
            <service.icon />
            <h3 className="text-xl md:text-2xl font-bold mt-5">
              {service.title}
            </h3>
          </div>
          <p className="mt-2 text-sm md:text-base text-white">
            {service.description}
          </p>
          <div className="mt-5 flex-1">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 text-white">
                <Check className="w-4 h-4 md:w-5 md:h-5 text-white" />
                <span className="text-sm md:text-base">{feature}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 w-full">
            <button
              onClick={() => handleContact(service.title)}
              className="relative inline-flex h-12 w-full overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Start a Project
              </span>
            </button>
          </div>
        </motion.div>
      }
    />
  );
}

function MobileServiceCard({ service, index, handleContact }: ServiceCardProps) {
  return (
    <TiltedCard
      containerWidth="100%"
      containerHeight="400px"
      rotateAmplitude={12}
      scaleOnHover={1.15}
      showMobileWarning={false}
      showTooltip={false}
      displayOverlayContent={true}
      overlayContent={
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex flex-col h-full p-6"
        >
          <div className="text-white">
            <service.icon />
            <h3 className="text-xl font-bold mt-5">{service.title}</h3>
          </div>
          <p className="mt-2 text-sm text-white">{service.description}</p>
          <div className="flex-1 flex items-center justify-between">
            <div className="space-y-4 mr-2">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-white" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => handleContact(service.title)}
            className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Start a Project
            </span>
          </button>
        </motion.div>
      }
    />
  );
}
