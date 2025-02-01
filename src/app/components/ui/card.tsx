import { motion, MotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { Project } from "../portfolio-section";

interface CardProps {
  project: Project;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  onClick: () => void;
}

export const Card: React.FC<CardProps> = ({
  project,
  progress,
  range,
  targetScale,
  onClick,
}) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        onClick={onClick}
        style={{ scale }}
        className={`flex flex-col relative h-[450px] w-[70%] rounded-md p-10 bg-neutral-800 cursor-pointer`}
      >
        <h2 className="text-2xl text-center font-semibold">{project.title}</h2>
        <div className="flex h-full mt-5 gap-10">
          <div className="w-[40%]">
            <p className="text-sm">{project.description}</p>
            <span className="flex items-center gap-2 pt-2">
              <a href={project.demoUrl} target="_blank" className="underline cursor-pointer">
                See more
              </a>
            </span>
          </div>
          <div className="relative w-[60%] h-full rounded-lg overflow-hidden">
            <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};