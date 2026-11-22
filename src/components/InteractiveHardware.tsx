import { useState } from 'react';
import { motion } from 'framer-motion';
import { hardwareSections } from '../data/hardwareSections';
import type { Lang, Translations } from '../i18n/translations';

interface InteractiveHardwareProps {
  lang: Lang;
  t: Translations['hardware'];
}

/**
 * Pixel-aligned SVG paths for the tightly cropped, shadow-free faceplate-1u.webp (3200x293)
 * on normalized viewBox="0 0 1000 100":
 * - Top line: y = 15.1
 * - Step line (Input / Output): y = 23.9
 * - Bottom line: y = 95.3
 */
const sectionContours: Record<
  string,
  { fill: string; stroke: string; cropX: number; cropW: number }
> = {
  gain: {
    fill:
      'M 87.5 15.1 L 182.8 15.1 Q 187.2 15.1 187.2 19.5 L 187.2 20.3 Q 187.2 23.9 190.8 23.9 L 237.5 23.9 Q 241.3 23.9 241.3 27.7 L 241.3 90.9 Q 241.3 95.3 236.9 95.3 L 87.5 95.3 Q 83.1 95.3 83.1 90.9 L 83.1 19.5 Q 83.1 15.1 87.5 15.1 Z',
    stroke:
      'M 106.5 15.1 L 87.5 15.1 Q 83.1 15.1 83.1 19.5 L 83.1 90.9 Q 83.1 95.3 87.5 95.3 L 236.9 95.3 Q 241.3 95.3 241.3 90.9 L 241.3 27.7 Q 241.3 23.9 237.5 23.9 L 231.5 23.9 M 141.5 15.1 L 182.8 15.1 Q 187.2 15.1 187.2 19.5 L 187.2 20.3 Q 187.2 23.9 190.8 23.9 L 198.0 23.9',
    cropX: 74,
    cropW: 176,
  },
  drive: {
    fill:
      'M 245.7 15.1 L 344.4 15.1 Q 348.8 15.1 348.8 19.5 L 348.8 90.9 Q 348.8 95.3 344.4 95.3 L 245.7 95.3 Q 241.3 95.3 241.3 90.9 L 241.3 19.5 Q 241.3 15.1 245.7 15.1 Z',
    stroke:
      'M 267.5 15.1 L 245.7 15.1 Q 241.3 15.1 241.3 19.5 L 241.3 90.9 Q 241.3 95.3 245.7 95.3 L 344.4 95.3 Q 348.8 95.3 348.8 90.9 L 348.8 19.5 Q 348.8 15.1 344.4 15.1 L 308.0 15.1',
    cropX: 230,
    cropW: 132,
  },
  filters: {
    fill:
      'M 353.2 15.1 L 520.6 15.1 Q 525.0 15.1 525.0 19.5 L 525.0 90.9 Q 525.0 95.3 520.6 95.3 L 353.2 95.3 Q 348.8 95.3 348.8 90.9 L 348.8 19.5 Q 348.8 15.1 353.2 15.1 Z',
    stroke:
      'M 372.5 15.1 L 353.2 15.1 Q 348.8 15.1 348.8 19.5 L 348.8 90.9 Q 348.8 95.3 353.2 95.3 L 520.6 95.3 Q 525.0 95.3 525.0 90.9 L 525.0 19.5 Q 525.0 15.1 520.6 15.1 L 496.0 15.1 M 412.5 15.1 L 465.0 15.1',
    cropX: 342,
    cropW: 190,
  },
  output: {
    fill:
      'M 529.4 15.1 L 613.1 15.1 Q 617.5 15.1 617.5 19.5 L 617.5 20.3 Q 617.5 23.9 621.1 23.9 L 700.6 23.9 Q 704.4 23.9 704.4 27.7 L 704.4 90.9 Q 704.4 95.3 700.0 95.3 L 529.4 95.3 Q 525.0 95.3 525.0 90.9 L 525.0 19.5 Q 525.0 15.1 529.4 15.1 Z',
    stroke:
      'M 544.5 15.1 L 529.4 15.1 Q 525.0 15.1 525.0 19.5 L 525.0 90.9 Q 525.0 95.3 529.4 95.3 L 700.0 95.3 Q 704.4 95.3 704.4 90.9 L 704.4 27.7 Q 704.4 23.9 700.6 23.9 L 683.5 23.9 M 595.5 15.1 L 613.1 15.1 Q 617.5 15.1 617.5 19.5 L 617.5 20.3 Q 617.5 23.9 621.1 23.9 L 641.5 23.9',
    cropX: 518,
    cropW: 194,
  },
  mix: {
    fill:
      'M 708.8 15.1 L 825.9 15.1 Q 830.3 15.1 830.3 19.5 L 830.3 90.9 Q 830.3 95.3 825.9 95.3 L 708.8 95.3 Q 704.4 95.3 704.4 90.9 L 704.4 19.5 Q 704.4 15.1 708.8 15.1 Z',
    stroke:
      'M 738.0 15.1 L 708.8 15.1 Q 704.4 15.1 704.4 19.5 L 704.4 90.9 Q 704.4 95.3 708.8 95.3 L 825.9 95.3 Q 830.3 95.3 830.3 90.9 L 830.3 19.5 Q 830.3 15.1 825.9 15.1 L 765.0 15.1',
    cropX: 698,
    cropW: 140,
  },
  power: {
    fill:
      'M 845.0 15.1 L 874.0 15.1 Q 878.0 15.1 878.0 19.5 L 878.0 90.9 Q 878.0 95.3 874.0 95.3 L 845.0 95.3 Q 841.0 95.3 841.0 90.9 L 841.0 19.5 Q 841.0 15.1 845.0 15.1 Z',
    stroke:
      'M 845.0 15.1 L 874.0 15.1 Q 878.0 15.1 878.0 19.5 L 878.0 90.9 Q 878.0 95.3 874.0 95.3 L 845.0 95.3 Q 841.0 95.3 841.0 90.9 L 841.0 19.5 Q 841.0 15.1 845.0 15.1 Z',
    cropX: 830,
    cropW: 145,
  },
};

const sectionMetrics: Record<string, Record<Lang, { k: string; v: string }[]>> = {
  gain: {
    it: [
      { k: 'Escursione Gain', v: 'Fino a +9 dB' },
      { k: 'Attenuatore', v: 'Switch PAD On / Off' },
      { k: 'Metering Ingresso', v: 'L/R (Sig · 0 · Peak)' },
    ],
    en: [
      { k: 'Gain Range', v: 'Up to +9 dB' },
      { k: 'Attenuator', v: 'PAD Switch On / Off' },
      { k: 'Input Metering', v: 'L/R (Sig · 0 · Peak)' },
    ],
  },
  drive: {
    it: [
      { k: 'Distorsione Armonica', v: '0,003% → 25% THD' },
      { k: 'Stadi di Saturazione', v: 'Base + Switch EVOLVE' },
      { k: 'Feedback Visivo', v: 'Dual Clipping LED' },
    ],
    en: [
      { k: 'Harmonic Distortion', v: '0.003% → 25% THD' },
      { k: 'Saturation Voices', v: 'Base + EVOLVE Switch' },
      { k: 'Visual Feedback', v: 'Dual Clipping LEDs' },
    ],
  },
  filters: {
    it: [
      { k: 'Low Cut', v: '0 – 1 kHz' },
      { k: 'Hi Cut', v: '600 Hz – 22 kHz' },
      { k: 'Pendenza', v: '3 dB / ottava' },
    ],
    en: [
      { k: 'Low Cut', v: '0 – 1 kHz' },
      { k: 'Hi Cut', v: '600 Hz – 22 kHz' },
      { k: 'Filter Slope', v: '3 dB / octave' },
    ],
  },
  output: {
    it: [
      { k: 'Livello Ottimale', v: '0 dBVu (+4 dBu Pro)' },
      { k: 'Barra LED Uscita', v: '5 segmenti L/R (-10 a +3 dB)' },
      { k: 'Controllo', v: 'Volume continuo 0–10' },
    ],
    en: [
      { k: 'Optimal Operating Level', v: '0 dBVu (+4 dBu Pro)' },
      { k: 'Output LED Bar', v: '5-segment L/R (-10 to +3 dB)' },
      { k: 'Control', v: 'Continuous Volume 0–10' },
    ],
  },
  mix: {
    it: [
      { k: 'Miscelazione', v: 'Parallela continua Dry → Wet' },
      { k: 'Esclusione Blend', v: 'Switch BLEND OFF (100% Wet)' },
      { k: 'Bypass', v: 'Hardware Bypass dedicato' },
    ],
    en: [
      { k: 'Parallel Blend', v: 'Continuous Dry → Wet' },
      { k: 'Direct Wet Mode', v: 'BLEND OFF Switch (100% Wet)' },
      { k: 'Bypass', v: 'Dedicated Hardware Bypass' },
    ],
  },
  power: {
    it: [
      { k: 'Alimentazione', v: 'DC 14V · 400 mA esterna' },
      { k: 'Interruttore', v: 'Toggle metallico + LED stato' },
      { k: 'Formato', v: 'Rack 19" · 1U in alluminio' },
    ],
    en: [
      { k: 'Power Supply', v: 'External DC 14V · 400 mA' },
      { k: 'Switch', v: 'Chrome toggle + status LED' },
      { k: 'Format', v: '19" 1U Aluminum Rack' },
    ],
  },
};

export function InteractiveHardware({ lang, t }: InteractiveHardwareProps) {
  const [view, setView] = useState<'front' | 'rear'>('front');
  const [activeId, setActiveId] = useState<string>('drive');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const active = hardwareSections.find((s) => s.id === activeId) ?? hardwareSections[1];
  const metrics = sectionMetrics[active.id]?.[lang] ?? sectionMetrics.drive[lang];

  return (
    /* Unified Dark Studio Theme with Expressive E minimalist architectural layout */
    <section
      id="hardware"
      className="border-t border-white/10 bg-black py-24 text-[#F5F5F7] sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
              {t.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#9A9FA9] sm:text-lg">
              {t.subtitle}
            </p>
          </div>

          <div
            className="inline-flex self-start rounded-[4px] border border-white/15 bg-black/50 p-1 text-xs font-medium lg:self-auto"
            role="group"
          >
            <button
              type="button"
              onClick={() => setView('front')}
              className={`rounded-[3px] px-5 py-2 transition-colors ${
                view === 'front'
                  ? 'bg-white font-semibold text-black'
                  : 'text-[#9A9FA9] hover:text-white'
              }`}
            >
              {lang === 'it' ? 'pannello frontale' : 'front panel'}
            </button>
            <button
              type="button"
              onClick={() => setView('rear')}
              className={`rounded-[3px] px-5 py-2 transition-colors ${
                view === 'rear'
                  ? 'bg-white font-semibold text-black'
                  : 'text-[#9A9FA9] hover:text-white'
              }`}
            >
              {lang === 'it' ? 'connessioni retro' : 'rear i/o'}
            </button>
          </div>
        </div>

        {view === 'front' ? (
          <div className="mt-14">
            {/* Minimalist horizontal chapter bar with sliding 2px Orage amber bar */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-white/12 pb-3">
              {hardwareSections.map((sec) => {
                const isActive = sec.id === activeId;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setActiveId(sec.id)}
                    className={`relative -mb-[13px] pb-3 text-sm font-semibold lowercase tracking-wide transition-colors ${
                      isActive
                        ? 'text-white'
                        : 'text-[#7D828E] hover:text-white'
                    }`}
                  >
                    {sec.id}
                    {isActive && (
                      <motion.span
                        layoutId="hw-active-bar"
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-x-0 bottom-0 h-[2px] bg-[#D99B32]"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tightly cropped, shadow-free 3200px 1U aluminum faceplate */}
            <div className="mt-10 overflow-x-auto pb-4">
              <div className="relative min-w-[780px] overflow-hidden rounded-[2px] shadow-[0_32px_90px_-20px_rgba(0,0,0,0.95)] ring-1 ring-white/12">
                <img
                  src="./images/faceplate-1u.webp"
                  alt="EVOLVER Overdrive 1U Aluminum Front Panel"
                  className="block w-full select-none brightness-[0.86] transition-all duration-300"
                  loading="lazy"
                />

                {/* Soft feathered spotlight covering the full section including labels */}
                <svg
                  viewBox="0 0 1000 100"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  <defs>
                    <filter id="zone-feather" x="-15%" y="-35%" width="130%" height="170%">
                      <feGaussianBlur stdDeviation="6" />
                    </filter>
                    <mask id="active-hardware-mask">
                      <rect x="0" y="0" width="1000" height="100" fill="black" />
                      <rect
                        x={(sectionContours[activeId]?.cropX ?? 230) + 4}
                        y="1"
                        width={(sectionContours[activeId]?.cropW ?? 132) - 8}
                        height="98"
                        rx="12"
                        fill="white"
                        filter="url(#zone-feather)"
                      />
                    </mask>
                  </defs>
                  <image
                    href="./images/faceplate-1u.webp"
                    x="0"
                    y="0"
                    width="1000"
                    height="100"
                    preserveAspectRatio="none"
                    mask="url(#active-hardware-mask)"
                    style={{ filter: 'brightness(1.10) contrast(1.04)' }}
                  />
                </svg>

                {/* Pixel-accurate contour lines breaking around silkscreened labels */}
                <svg
                  viewBox="0 0 1000 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                  aria-label="Interactive hardware zones"
                >
                  {hardwareSections.map((sec) => {
                    const isActive = sec.id === activeId;
                    const isHover = sec.id === hoveredId;
                    const contour = sectionContours[sec.id];
                    if (!contour) return null;

                    return (
                      <g key={sec.id}>
                        <path
                          d={contour.fill}
                          role="button"
                          tabIndex={0}
                          aria-label={sec.title[lang]}
                          aria-pressed={isActive}
                          onClick={() => setActiveId(sec.id)}
                          onMouseEnter={() => {
                            setHoveredId(sec.id);
                            setActiveId(sec.id);
                          }}
                          onMouseLeave={() => setHoveredId(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setActiveId(sec.id);
                            }
                          }}
                          fill="transparent"
                          stroke="none"
                          className="cursor-pointer focus:outline-none"
                        />
                        <path
                          d={contour.stroke}
                          fill="none"
                          stroke={
                            isActive
                              ? '#D99B32'
                              : isHover
                                ? 'rgba(217, 155, 50, 0.45)'
                                : 'transparent'
                          }
                          strokeWidth={isActive ? 1.45 : 1.0}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="pointer-events-none transition-all duration-200"
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Clean open 2-column editorial spec block — zero nested cards, zero badges */}
            <motion.div
              key={active.id}
              initial={{ opacity: 0.4, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 grid gap-10 border-t border-white/12 pt-10 lg:grid-cols-12 lg:items-start"
            >
              <div className="lg:col-span-7">
                <h3 className="text-3xl font-bold leading-[1.08] tracking-[-0.025em] text-white sm:text-4xl">
                  {active.title[lang]}
                </h3>
                <p className="mt-3 text-base font-medium text-[#E4E6EA]">
                  {active.summary[lang]}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#9A9FA9] sm:text-[15px]">
                  {active.detail[lang]}
                </p>
              </div>

              <dl className="divide-y divide-white/12 border-y border-white/12 lg:col-span-5">
                {metrics.map((m) => (
                  <div
                    key={m.k}
                    className="flex items-baseline justify-between gap-6 py-4 text-sm"
                  >
                    <dt className="font-medium text-[#9A9FA9]">{m.k}</dt>
                    <dd className="tabular text-right font-semibold text-white">
                      {m.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 border-t border-white/12 pt-10"
          >
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h3 className="text-3xl font-bold tracking-[-0.025em] text-white">
                  {t.rearTitle}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#9A9FA9] sm:text-base">
                  {t.rearSubtitle}
                </p>
              </div>

              <dl className="divide-y divide-white/12 border-y border-white/12 lg:col-span-7">
                {t.rearSpecs.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col justify-between gap-1 py-5 sm:flex-row sm:items-baseline"
                  >
                    <dt className="text-sm font-semibold text-white">
                      {item.label}
                    </dt>
                    <dd className="tabular text-sm text-[#B8BDC7] sm:text-right sm:text-[15px]">
                      {item.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
