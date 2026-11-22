import { motion } from 'framer-motion';
import type { Translations } from '../i18n/translations';

interface SpecsProps {
  t: Translations['specs'];
}

export function Specs({ t }: SpecsProps) {
  return (
    <section
      id="specs"
      className="surface-cardstock border-t border-white/8 py-24 sm:py-36"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 pb-12 sm:flex-row sm:items-end">
          <h2 className="text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
            {t.title}
          </h2>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D99B32]">
            {t.subtitle}
          </p>
        </div>

        {/* Expressive E-style 2-column technical specs list with 1px horizontal hairlines */}
        <div className="space-y-14">
          {t.groups.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#D99B32]">
                {group.category}
              </h3>
              <dl className="divide-y divide-white/12 border-y border-white/12">
                {group.items.map((item) => (
                  <div
                    key={item.label}
                    className="grid gap-2 py-5 sm:grid-cols-12 sm:items-baseline sm:gap-8"
                  >
                    <dt className="text-sm font-semibold text-white sm:col-span-5 sm:text-[15px]">
                      {item.label}
                    </dt>
                    <dd className="tabular text-sm text-[#B8BDC7] sm:col-span-7 sm:text-right sm:text-[15px]">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
