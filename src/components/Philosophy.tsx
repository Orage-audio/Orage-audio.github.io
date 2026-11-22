import { motion } from 'framer-motion';
import type { Translations } from '../i18n/translations';

interface PhilosophyProps {
  t: Translations['philosophy'];
}

export function Philosophy({ t }: PhilosophyProps) {
  return (
    <section
      id="philosophy"
      className="border-t border-white/8 bg-[#09090B] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.025em] text-white sm:text-4xl">
              {t.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#A1A6B2]">
              {t.lead}
            </p>
          </motion.div>

          <div className="divide-y divide-white/10 lg:col-span-7">
            {t.pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="grid gap-4 py-8 first:pt-0 last:pb-0 sm:grid-cols-12 sm:items-baseline"
              >
                <div className="sm:col-span-8">
                  <h3 className="text-xl font-semibold tracking-[-0.015em] text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#A1A6B2] sm:text-[15px]">
                    {pillar.description}
                  </p>
                </div>
                <div className="sm:col-span-4 sm:text-right">
                  <span className="tabular inline-block rounded-full border border-[#C88318]/30 bg-[#C88318]/10 px-3 py-1 text-xs font-medium text-[#D99B32]">
                    {pillar.metric}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
