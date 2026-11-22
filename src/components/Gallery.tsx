import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import type { Translations } from '../i18n/translations';

interface GalleryProps {
  t: Translations['gallery'];
}

export function Gallery({ t }: GalleryProps) {
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ['start end', 'end start'],
  });
  const bannerY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  const secondary = [
    {
      src: './images/dual-black.webp',
      caption: t.captions.dualOrange,
    },
    {
      src: './images/studio-orange-angle.webp',
      caption: t.captions.angularBlack,
    },
  ];

  return (
    <section className="border-t border-white/10 bg-black py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
            {t.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#9A9FA9] sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Full-bleed Orage Orange Statement Banner */}
        <div
          ref={bannerRef}
          className="group relative mt-14 overflow-hidden rounded-[8px] border border-white/10 bg-[#121216]"
        >
          <button
            type="button"
            onClick={() =>
              setLightbox({
                src: './images/angular-orange.webp',
                caption: t.captions.angularOrange,
              })
            }
            className="relative block aspect-[16/9] w-full overflow-hidden text-left sm:aspect-[21/10]"
          >
            <motion.img
              style={{ y: bannerY, scale: 1.12 }}
              src="./images/angular-orange.webp"
              alt={t.captions.angularOrange}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/15" />
            <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-[4px] border border-white/20 bg-black/55 text-white opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100">
              <ZoomIn className="h-4 w-4" />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex flex-col justify-between gap-2 p-6 sm:flex-row sm:items-end sm:p-10">
              <p className="max-w-xl text-xl font-semibold text-white sm:text-2xl">
                {t.captions.angularOrange}
              </p>
              <span
                style={{ fontFamily: "'Fugaz One', sans-serif" }}
                className="text-2xl text-white/85"
              >
                Orage
              </span>
            </div>
          </button>
        </div>

        {/* Two Completely Distinct Shots: Dual Editorial Render + Real Studio Live Photo */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {secondary.map((item, idx) => (
            <motion.figure
              key={item.src}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-[8px] border border-white/10 bg-[#0F0F12]"
            >
              <button
                type="button"
                onClick={() => setLightbox(item)}
                className="relative block aspect-[16/10] w-full overflow-hidden text-left"
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-[4px] border border-white/15 bg-black/55 text-white opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100">
                  <ZoomIn className="h-4 w-4" />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 p-6 text-sm font-medium text-[#E4E6EA]">
                  {item.caption}
                </figcaption>
              </button>
            </motion.figure>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-5 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close preview"
              className="absolute right-5 top-5 rounded-[4px] border border-white/20 bg-[#121216] p-2.5 text-white hover:border-[#D99B32] hover:text-[#D99B32]"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] max-w-6xl overflow-hidden rounded-[8px] border border-white/12 bg-[#0F0F12]"
            >
              <img
                src={lightbox.src}
                alt={lightbox.caption}
                className="max-h-[78vh] w-auto object-contain"
              />
              <p className="border-t border-white/8 px-6 py-4 text-sm text-[#E4E6EA]">
                {lightbox.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
