import { motion, type HTMLMotionProps, type Variants } from "motion/react";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export const staggerFast: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

/** Fades + slides up when scrolled into view */
export function ScrollFadeUp({
  children,
  delay = 0,
  className,
  ...props
}: { children: React.ReactNode; delay?: number; className?: string } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px" }}
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay } },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Stagger wrapper — children should use fadeUp / fadeIn variants */
export function StaggerContainer({
  children,
  className,
  fast,
}: {
  children: React.ReactNode;
  className?: string;
  fast?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px" }}
      variants={fast ? staggerFast : stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Card with hover lift */
export function HoverCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 28px -4px rgba(0,0,0,0.12)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Button with subtle scale on hover/tap */
export function AnimatedButton({
  children,
  className,
  onClick,
  type,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={className}
      onClick={onClick}
      type={type}
    >
      {children}
    </motion.button>
  );
}
