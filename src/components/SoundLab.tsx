import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { AUDIO_LAB_ENABLED, audioDemoTracks } from '../data/audioDemos';
import type { Translations } from '../i18n/translations';

interface SoundLabProps {
  t: Translations['soundLab'];
}

const VU_STEPS = [-10, -5, -3, 0, 3];

export function SoundLab({ t }: SoundLabProps) {
  const [selectedId, setSelectedId] = useState(t.sources[0]?.id ?? 'drums');
  const [engaged, setEngaged] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [vuLevel, setVuLevel] = useState(0);

  const dryAudioRef = useRef<HTMLAudioElement | null>(null);
  const wetAudioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const trackMeta =
    audioDemoTracks.find((tr) => tr.id === selectedId) ?? audioDemoTracks[0];
  const activeSource =
    t.sources.find((s) => s.id === selectedId) ?? t.sources[0];

  useEffect(() => {
    if (!AUDIO_LAB_ENABLED) return;
    setIsPlaying(false);
    setVuLevel(0);
    if (dryAudioRef.current) {
      dryAudioRef.current.pause();
      dryAudioRef.current.currentTime = 0;
    }
    if (wetAudioRef.current) {
      wetAudioRef.current.pause();
      wetAudioRef.current.currentTime = 0;
    }
  }, [selectedId]);

  useEffect(() => {
    if (!AUDIO_LAB_ENABLED) return;
    if (dryAudioRef.current) dryAudioRef.current.muted = engaged;
    if (wetAudioRef.current) wetAudioRef.current.muted = !engaged;
  }, [engaged]);

  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setVuLevel(0);
      return;
    }
    let frame = 0;
    const tick = () => {
      frame += 1;
      const base = engaged ? 0.72 : 0.48;
      const wave =
        Math.sin(frame * 0.17) * 0.16 +
        Math.sin(frame * 0.43) * 0.12 +
        Math.random() * 0.08;
      setVuLevel(Math.max(0.1, Math.min(1, base + wave)));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, engaged]);

  const togglePlay = async () => {
    if (!AUDIO_LAB_ENABLED) return;
    const dry = dryAudioRef.current;
    const wet = wetAudioRef.current;
    if (!dry || !wet) return;

    if (isPlaying) {
      dry.pause();
      wet.pause();
      setIsPlaying(false);
    } else {
      wet.currentTime = dry.currentTime;
      dry.muted = engaged;
      wet.muted = !engaged;
      try {
        await Promise.all([dry.play(), wet.play()]);
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  return (
    <section
      id="sound-lab"
      className="surface-cardstock border-t border-white/10 py-24 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
            {t.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#9A9FA9] sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Unified minimalist horizontal tab bar matching #hardware */}
        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-white/12 pb-3">
          {t.sources.map((src) => {
            const active = src.id === selectedId;
            return (
              <button
                key={src.id}
                type="button"
                onClick={() => setSelectedId(src.id)}
                className={`relative -mb-[13px] pb-3 text-sm font-semibold lowercase tracking-wide transition-colors ${
                  active ? 'text-white' : 'text-[#7D828E] hover:text-white'
                }`}
              >
                {src.name}
                {active && (
                  <motion.span
                    layoutId="soundlab-active-bar"
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-[#D99B32]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Open 2-column architectural layout matching #hardware */}
        <motion.div
          key={selectedId}
          initial={{ opacity: 0.4, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start"
        >
          {AUDIO_LAB_ENABLED ? (
            <>
              <audio ref={dryAudioRef} src={trackMeta.dryUrl} loop preload="auto" />
              <audio ref={wetAudioRef} src={trackMeta.wetUrl} loop preload="auto" />

              <div className="lg:col-span-7">
                <h3 className="text-3xl font-bold tracking-[-0.025em] text-white">
                  {activeSource?.name}
                </h3>
                <p className="mt-2 text-base text-[#9A9FA9]">{activeSource?.note}</p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-[4px] bg-[#C88318] text-black transition-colors hover:bg-[#D99B32]"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5 fill-current" />
                    ) : (
                      <Play className="ml-0.5 h-5 w-5 fill-current" />
                    )}
                  </button>

                  <div className="inline-flex rounded-[4px] border border-white/15 bg-black p-1 text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => setEngaged(false)}
                      className={`rounded-[3px] px-4 py-2 transition-colors ${
                        !engaged
                          ? 'bg-white font-semibold text-black'
                          : 'text-[#9A9FA9] hover:text-white'
                      }`}
                    >
                      {t.bypassLabel}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEngaged(true)}
                      className={`rounded-[3px] px-4 py-2 transition-colors ${
                        engaged
                          ? 'bg-[#C88318] font-semibold text-black'
                          : 'text-[#9A9FA9] hover:text-white'
                      }`}
                    >
                      {t.engagedLabel}
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="border-y border-white/12 py-5">
                  <div className="mb-4 flex items-center justify-between text-xs font-medium text-[#9A9FA9]">
                    <span>Output Meter L/R</span>
                    <span className="tabular font-semibold text-white">
                      Drive {trackMeta.driveSetting} · {trackMeta.mixSetting}
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {['L', 'R'].map((ch, chIdx) => (
                      <div key={ch} className="flex items-center gap-3">
                        <span className="w-3 text-xs text-[#7D828E]">{ch}</span>
                        <div className="grid flex-1 grid-cols-5 gap-2">
                          {VU_STEPS.map((db, idx) => {
                            const threshold = (idx + 1) / 5;
                            const lit =
                              isPlaying &&
                              vuLevel - chIdx * 0.04 >= threshold * 0.85;
                            const color =
                              db >= 3
                                ? 'bg-[#EF4444]'
                                : db === 0
                                  ? 'bg-[#D99B32]'
                                  : 'bg-[#22C55E]';
                            return (
                              <div
                                key={db}
                                className={`h-2 rounded-[2px] transition-opacity duration-75 ${
                                  lit ? color : 'bg-white/10'
                                }`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="lg:col-span-7">
                <h3 className="text-3xl font-bold leading-[1.08] tracking-[-0.025em] text-white sm:text-4xl">
                  {t.comingSoonTitle}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#9A9FA9] sm:text-[15px]">
                  {t.comingSoonBody}
                </p>
                <a
                  href="#contact"
                  className="mt-8 inline-flex h-12 items-center justify-center rounded-[4px] bg-[#C88318] px-8 text-sm font-semibold tracking-wide text-black transition-colors hover:bg-[#D99B32]"
                >
                  {t.comingSoonCta}
                </a>
              </div>

              <dl className="divide-y divide-white/12 border-y border-white/12 lg:col-span-5">
                <div className="flex items-baseline justify-between gap-6 py-4 text-sm">
                  <dt className="font-medium text-[#9A9FA9]">Sorgente</dt>
                  <dd className="text-right font-semibold text-white">
                    {activeSource?.name} — {activeSource?.note}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 py-4 text-sm">
                  <dt className="font-medium text-[#9A9FA9]">Drive / EVOLVE</dt>
                  <dd className="tabular text-right font-semibold text-white">
                    {trackMeta.driveSetting} / 10 ·{' '}
                    {trackMeta.evolveActive ? 'EVOLVE ON' : 'EVOLVE OFF'}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 py-4 text-sm">
                  <dt className="font-medium text-[#9A9FA9]">Mix Parallelo</dt>
                  <dd className="tabular text-right font-semibold text-[#D99B32]">
                    {trackMeta.mixSetting}
                  </dd>
                </div>
              </dl>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
