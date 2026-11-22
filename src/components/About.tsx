import { motion } from 'framer-motion';
import type { Translations } from '../i18n/translations';

interface AboutProps {
  t: Translations['about'];
}

export function About({ t }: AboutProps) {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-white/8 bg-black py-28 sm:py-40"
    >
      {/* Full-bleed authentic Orage workshop photograph */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <img
          src="./images/workshop-about.webp"
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/82 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <div className="font-brand text-5xl text-[#C88318] sm:text-6xl">
            Orage
          </div>

          <h2 className="mt-5 text-4xl font-bold leading-[1.06] tracking-[-0.03em] text-white sm:text-5xl">
            {t.title}
          </h2>

          <div className="mt-7 space-y-5 text-base leading-relaxed text-[#D1D5DB] sm:text-lg">
            {t.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <blockquote className="mt-10 border-t border-white/15 pt-7 text-xl font-semibold text-white sm:text-2xl">
            “{t.manifesto}”
          </blockquote>
          <p className="mt-3 text-xs uppercase tracking-[0.22em] text-[#D99B32]">
            {t.location}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
