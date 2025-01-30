"use client";
import {
  motion,
} from "framer-motion";
import Link from "next/link";
import { useRef, ElementType, MouseEvent, useState } from "react";
import { Home, User, Briefcase, Settings, Mail, Linkedin } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Portfolio", href: "#portfolio", icon: Briefcase },
  { name: "Services", href: "#services", icon: Settings },
  { name: "Contact", href: "#contact", icon: Mail },
];

const contactItems = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/elangsamudra/",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:elangsamudra.work@gmail.com",
    icon: Mail,
  },
];

export function Header() {
  return (
    <>
      <FloatingDockDesktop 
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50" 
      />
    </>
  );
}

const FloatingDockDesktop = ({
  className = "",
}: {
  className?: string;
}) => {
  const [mouseX, setMouseX] = useState<number | null>(null);

  return (
    <div
      onMouseMove={(e) => setMouseX(e.pageX)}
      onMouseLeave={() => setMouseX(null)}
      className={cn(
        "hidden md:flex h-16 items-center rounded-2xl bg-gray-50/80 dark:bg-neutral-900/80 backdrop-blur-sm px-6 shadow-lg gap-6",
        className
      )}
    >
      <div className="flex gap-4">
        {navItems.map((item) => (
          <IconContainer 
            mouseX={mouseX} 
            key={item.name} 
            href={item.href} 
            icon={item.icon} 
          />
        ))}
      </div>
      
      <div className="border-l h-6 border-gray-300 dark:border-neutral-700" />
      
      <div className="flex gap-4">
        {contactItems.map((item) => (
          <ContactIcon
            key={item.name}
            href={item.href}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

function IconContainer({ mouseX, href, icon: Icon }: {
  mouseX: number | null;
  href: string;
  icon: ElementType;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(44);

  const updateSize = (e: MouseEvent) => {
    if (!ref.current) return;
    
    const bounds = ref.current.getBoundingClientRect();
    const distance = Math.abs((mouseX || 0) - (bounds.x + bounds.width / 2));
    
    let newSize = 44;
    if (distance < 150) newSize = 64 - (distance / 5);
    
    setSize(newSize);
  };

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        onMouseMove={updateSize}
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded-full bg-gray-200/80 dark:bg-neutral-800/80 backdrop-blur-sm relative"
        aria-label={href.replace("#", "")}
      >
        <Icon className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
      </motion.div>
    </Link>
  );
}

const ContactIcon = ({ href, icon: Icon }: {
  href: string;
  icon: ElementType;
}) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-200/80 dark:bg-neutral-800/80 backdrop-blur-sm"
      aria-label={href}
    >
      <Icon className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
    </motion.a>
  );
};

function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
