import { motion } from 'framer-motion';
import type { Lang, Translations } from '../i18n/translations';

interface HighlightsProps {
  lang: Lang;
  t: Translations['philosophy'];
}

export function Highlights({ t }: HighlightsProps) {
  return (
    <section
      id="highlights"
      className="surface-cardstock border-t border-white/10 py-24 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <h2 className="text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
            {t.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#9A9FA9] sm:text-lg">
            {t.lead}
          </p>
        </motion.div>

        {/* Expressive E-style open 1px hairline 3-column grid (no heavy cards, no synthetic diagrams) */}
        <div className="mt-16 grid border-y border-white/12 md:grid-cols-3 md:divide-x md:divide-white/12">
          {t.pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col justify-between border-b border-white/12 py-10 last:border-b-0 md:border-b-0 md:px-9 md:first:pl-0 md:last:pr-0"
            >
              <div>
                <div className="tabular text-xs font-semibold uppercase tracking-[0.2em] text-[#D99B32]">
                  {pillar.metric}
                </div>
                <h3 className="mt-4 text-2xl font-bold leading-tight tracking-[-0.02em] text-white">
                  {pillar.title}
                </h3>
                <p className="mt-3.5 text-sm leading-relaxed text-[#9A9FA9] sm:text-[15px]">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
