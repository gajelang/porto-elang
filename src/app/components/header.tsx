"use client";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import { useRef, ElementType, MouseEvent } from "react";
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
    name: "Upwork",
    href: "https://www.upwork.com/freelancers/~010519a636312464f9",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076l.008-.042c.207-1.143.849-3.06 2.839-3.06a2.705 2.705 0 0 1 2.703 2.703a2.707 2.707 0 0 1-2.704 2.702m0-8.14c-2.539 0-4.51 1.649-5.31 4.366c-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112a2.55 2.55 0 0 1-2.547 2.548a2.55 2.55 0 0 1-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303c2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109c3 0 5.439-2.452 5.439-5.45c0-3-2.439-5.439-5.439-5.439" />
      </svg>
    ),
  },
  {
    name: "Behance",
    href: "https://www.behance.net/elangsamudra",
    icon: () => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1024 1024"
        className="w-5 h-5"
      >
        <path fill="currentColor" d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32M598.5 350.9h138.4v33.7H598.5zM512 628.8a89.5 89.5 0 0 1-27 31c-11.8 8.2-24.9 14.2-38.8 17.7a167.4 167.4 0 0 1-44.6 5.7H236V342.1h161c16.3 0 31.1 1.5 44.6 4.3c13.4 2.8 24.8 7.6 34.4 14.1c9.5 6.5 17 15.2 22.3 26c5.2 10.7 7.9 24.1 7.9 40c0 17.2-3.9 31.4-11.7 42.9c-7.9 11.5-19.3 20.8-34.8 28.1c21.1 6 36.6 16.7 46.8 31.7c10.4 15.2 15.5 33.4 15.5 54.8c0 17.4-3.3 32.3-10 44.8M790.8 576H612.4c0 19.4 6.7 38 16.8 48c10.2 9.9 24.8 14.9 43.9 14.9c13.8 0 25.5-3.5 35.5-10.4c9.9-6.9 15.9-14.2 18.1-21.8h59.8c-9.6 29.7-24.2 50.9-44 63.7c-19.6 12.8-43.6 19.2-71.5 19.2c-19.5 0-37-3.2-52.7-9.3c-15.1-5.9-28.7-14.9-39.9-26.5a121.2 121.2 0 0 1-25.1-41.2c-6.1-16.9-9.1-34.7-8.9-52.6c0-18.5 3.1-35.7 9.1-51.7c11.5-31.1 35.4-56 65.9-68.9c16.3-6.8 33.8-10.2 51.5-10c21 0 39.2 4 55 12.2a111.6 111.6 0 0 1 38.6 32.8c10.1 13.7 17.2 29.3 21.7 46.9c4.3 17.3 5.8 35.5 4.6 54.7m-122-95.6c-10.8 0-19.9 1.9-26.9 5.6s-12.8 8.3-17.2 13.6a48.4 48.4 0 0 0-9.1 17.4c-1.6 5.3-2.7 10.7-3.1 16.2H723c-1.6-17.3-7.6-30.1-15.6-39.1c-8.4-8.9-21.9-13.7-38.6-13.7m-248.5-10.1c8.7-6.3 12.9-16.7 12.9-31c.3-6.8-1.1-13.5-4.1-19.6c-2.7-4.9-6.7-9-11.6-11.9a44.8 44.8 0 0 0-16.6-6c-6.4-1.2-12.9-1.8-19.3-1.7h-70.3v79.7h76.1c13.1.1 24.2-3.1 32.9-9.5m11.8 72c-9.8-7.5-22.9-11.2-39.2-11.2h-81.8v94h80.2c7.5 0 14.4-.7 21.1-2.1s12.7-3.8 17.8-7.2c5.1-3.3 9.2-7.8 12.3-13.6c3-5.8 4.5-13.2 4.5-22.1c0-17.7-5-30.2-14.9-37.8"/>
      </svg>
    ),
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
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e: MouseEvent) => mouseX.set(e.pageX)} // Use MouseEvent type
      onMouseLeave={() => mouseX.set(Infinity)}
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
    </motion.div>
  );
};

function IconContainer({ mouseX, href, icon: Icon }: {
  mouseX: MotionValue<number>;
  href: string;
  icon: ElementType;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  const widthTransform = useTransform(distance, [-150, 0, 150], [44, 64, 44]);
  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width }}
        className="flex items-center justify-center h-12 rounded-full bg-gray-200/80 dark:bg-neutral-800/80 backdrop-blur-sm relative"
        aria-label={href.replace("#", "")} // Add aria-label for accessibility
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
      aria-label={href} // Add aria-label for accessibility
    >
      <Icon className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
    </motion.a>
  );
};

function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}