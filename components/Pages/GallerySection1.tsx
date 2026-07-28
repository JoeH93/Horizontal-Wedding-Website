"use client"
import { useEffect, useRef, useState } from "react";
import Countdown from "@/components/Countdown/Countdown";
import { motion, useScroll, useTransform, useSpring, Variants } from "framer-motion";

export default function GallerySection1() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  function scrollToRsvp() {
    document
      .getElementById("rsvp")
      ?.scrollIntoView({ behavior: "smooth", inline: "start" });
  }

  // Scroll progress animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  // Entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const containerVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      style={{
        opacity: smoothOpacity,
        scale: smoothScale,
        y: smoothY
      }}
      className="h-full w-full flex flex-col items-center justify-center text-center px-6 relative min-h-screen"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="max-w-4xl mx-auto mb-18"
      >
        <motion.p
          variants={itemVariants}
          className="uppercase tracking-[0.3em] text-xs text-[#608150] mb-3 border border-[#B08D57]/25 rounded-2xl p-3 bg-white/40 backdrop-blur-sm inline-block"
        >
          Save the Date &middot; October 24, 2026
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight text-[#2B2A28]"
        >
          Our next adventure begins&hellip;
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="font-serif italic text-xl md:text-2xl lg:text-3xl text-[#855e23] mt-2"
        >
          and you&apos;re invited!
        </motion.h2>

        <motion.div
          variants={itemVariants}
          className="mt-6 max-w-md mx-auto"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#B08D57]/5 to-[#608150]/5 rounded-lg blur-2xl" />
            <p className="relative text-sm md:text-base text-[#2B2A28]/80 leading-relaxed">
              We&apos;ve laughed, cried, danced in the kitchen, and dreamed of this
              moment for a long time. Now we can&apos;t wait to share it with you.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8"
        >
          <Countdown />
        </motion.div>

        <motion.button
          variants={itemVariants}
          onClick={scrollToRsvp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 inline-block bg-[#2B2A28] text-[#FBF7F0] px-8 py-3 uppercase tracking-[0.15em] text-sm hover:bg-[#B08D57] transition-colors relative overflow-hidden group"
        >
          <span className="relative z-10">Reserve Your Place</span>
          <motion.span
            className="absolute inset-0 bg-[#B08D57]"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.div>

      {/* Fixed Horizontal Scroll Indicator – always visible */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
        <span className="text-[13px] uppercase tracking-[0.1em] text-[#855e23] font-bold">
          Scroll
        </span>
        <motion.div
          animate={{
            x: [0, 12, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-[#855e23] font-bold"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.div>
      </div>

      {/* Subtle decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-[#B08D57]/10 rounded-full blur-sm" />
      <div className="absolute bottom-20 right-10 w-32 h-32 border border-[#608150]/10 rounded-full blur-sm" />
    </motion.div>
  );
}