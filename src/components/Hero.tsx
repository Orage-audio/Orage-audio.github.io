import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Translations } from '../i18n/translations';

interface HeroProps {
  t: Translations['hero'];
}

export function Hero({ t }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.85], [0.34, 0.05]);
  const unitScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.05]);
  const unitY = useTransform(scrollYProgress, [0, 1], [0, -28]);

  return (
    <section
      ref={containerRef}
      id="overview"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-black pt-24 pb-10"
    >
      {/* Background Evolver render blended seamlessly into pure #000000 black */}
      <motion.div
        style={{ scale: bgScale, opacity: bgOpacity }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <img
          src="./images/angular-black.webp"
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_66%_48%_at_50%_38%,transparent_5%,#000000_82%)]" />
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-5 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'Fugaz One', sans-serif" }}
          className="text-6xl tracking-tight text-white sm:text-8xl lg:text-[7rem] lg:leading-[0.94]"
        >
          EVOLVER
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-3xl text-2xl font-bold leading-[1.12] tracking-[-0.025em] text-[#F2F2F4] sm:text-4xl"
        >
          {t.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-xl text-sm leading-relaxed text-[#9A9FA9] sm:text-base"
        >
          {t.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#hardware"
            className="inline-flex h-12 items-center justify-center rounded-[4px] bg-[#C88318] px-9 text-sm font-semibold tracking-wide text-black transition-colors hover:bg-[#D99B32] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C88318]"
          >
            {t.primaryCta}
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-[4px] border border-white/30 bg-transparent px-9 text-sm font-medium tracking-wide text-white transition-colors hover:border-white hover:bg-white/[0.04]"
          >
            {t.secondaryCta}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ scale: unitScale, y: unitY }}
          className="relative mt-16 w-full max-w-6xl sm:mt-20"
        >
          <div className="relative overflow-hidden rounded-[2px] shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] ring-1 ring-white/15">
            <img
              src="./images/faceplate-1u.webp"
              alt="Orage Audio EVOLVER Overdrive 1U Aluminum Edition"
              className="block w-full select-none"
              loading="eager"
              decoding="async"
            />
            <div
              aria-hidden="true"
              className="animate-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/16 to-transparent"
            />
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto mt-10 flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#787D8A] sm:px-8">
        <span>{t.rackLabel}</span>
        <a
          href="#highlights"
          className="border-b border-white/30 pb-0.5 text-[#D1D5DB] transition-colors hover:border-[#D99B32] hover:text-[#D99B32]"
        >
          {t.scrollHint}
        </a>
        <span className="text-[#D1D5DB]">{t.editionLabel}</span>
      </div>
    </section>
  );
}
