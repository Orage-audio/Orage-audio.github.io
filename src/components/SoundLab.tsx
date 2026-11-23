import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import type { Lang, Translations } from '../i18n/translations';

interface SoundLabProps {
  lang: Lang;
  t: Translations['soundLab'];
}

interface VideoDemo {
  id: string;
  src: string;
  label: Record<Lang, string>;
  headline: Record<Lang, string>;
  description: Record<Lang, string>;
  details: Record<Lang, { k: string; v: string }[]>;
}

const videoDemos: VideoDemo[] = [
  {
    id: 'electronic-bass',
    src: './video/electronic-bass.mp4',
    label: { it: 'electronic bass', en: 'electronic bass' },
    headline: {
      it: 'Basso elettronico: spessore e presenza in tempo reale.',
      en: 'Electronic bass: real-time weight and presence.',
    },
    description: {
      it: 'Guarda i pomelli ruotare mentre il basso passa attraverso lo stadio Drive, i filtri 3 dB/oct e la miscelazione parallela MIX dell’Evolver. Audio registrato direttamente dall’hardware, senza plugin.',
      en: 'Watch the knobs move in real time as an electronic bass runs through Evolver’s Drive stage, 3 dB/oct filters, and parallel MIX control. Captured straight from the hardware, zero plugins.',
    },
    details: {
      it: [
        { k: 'Sorgente', v: 'Electronic Bass (Stereo / Mono)' },
        { k: 'Elaborazione', v: 'Drive · Filtri 3 dB/oct · MIX' },
        { k: 'Registrazione', v: '100% Hardware reale · 48 kHz' },
      ],
      en: [
        { k: 'Source', v: 'Electronic Bass (Stereo / Mono)' },
        { k: 'Processing', v: 'Drive · 3 dB/oct Filters · MIX' },
        { k: 'Capture', v: '100% Real Hardware · 48 kHz' },
      ],
    },
  },
  {
    id: 'solo-synth',
    src: './video/solo-synth.mp4',
    label: { it: 'solo synth', en: 'solo synth' },
    headline: {
      it: 'Synth analogico: armoniche vive senza perdere aria.',
      en: 'Analog synth: rich harmonics without losing air.',
    },
    description: {
      it: 'Ascolta come Evolver apre le medie e arrotonda le alte del sintetizzatore man mano che salgono Drive e filtraggio, lasciando intatta la definizione del suono originale.',
      en: 'Hear how Evolver opens up the midrange and rounds off the top end of a synth as Drive and tone shaping sweep in, keeping the core definition intact.',
    },
    details: {
      it: [
        { k: 'Sorgente', v: 'Poly / Lead Synth' },
        { k: 'Elaborazione', v: 'Drive · EVOLVE · Low / Hi Cut' },
        { k: 'Registrazione', v: '100% Hardware reale · 48 kHz' },
      ],
      en: [
        { k: 'Source', v: 'Poly / Lead Synth' },
        { k: 'Processing', v: 'Drive · EVOLVE · Low / Hi Cut' },
        { k: 'Capture', v: '100% Real Hardware · 48 kHz' },
      ],
    },
  },
  {
    id: 'solo-vox',
    src: './video/solo-vox.mp4',
    label: { it: 'solo vox', en: 'solo vox' },
    headline: {
      it: 'Voce solista: presenza davanti al mix senza asprezza.',
      en: 'Lead vocal: front-and-center presence without harshness.',
    },
    description: {
      it: 'Senti come Evolver ispessisce la voce e la porta in primo piano con armoniche calde, mentre l’Hi Cut a 3 dB/oct tiene sotto controllo le sibilanti e il controllo MIX preserva la naturalezza del respiro.',
      en: 'Hear how Evolver thickens a lead vocal and pulls it forward with warm harmonics, while the 3 dB/oct Hi Cut tames sibilance and MIX keeps the natural breath intact.',
    },
    details: {
      it: [
        { k: 'Sorgente', v: 'Solo Lead Vocal' },
        { k: 'Elaborazione', v: 'Drive · Hi Cut 3 dB/oct · MIX' },
        { k: 'Registrazione', v: '100% Hardware reale · 48 kHz' },
      ],
      en: [
        { k: 'Source', v: 'Solo Lead Vocal' },
        { k: 'Processing', v: 'Drive · 3 dB/oct Hi Cut · MIX' },
        { k: 'Capture', v: '100% Real Hardware · 48 kHz' },
      ],
    },
  },
  {
    id: 'rock-n-roll-vox',
    src: './video/rock-n-roll-vox.mp4',
    label: { it: 'rock ’n’ roll vox', en: 'rock ’n’ roll vox' },
    headline: {
      it: 'Voce rock: grinta analogica che taglia il muro di chitarre.',
      en: 'Rock vocal: analog grit that cuts through dense guitars.',
    },
    description: {
      it: 'Quando serve carattere deciso senza usare distorsori artificiali: Drive spinto ed EVOLVE tirano fuori una saturazione nervosa e musicale, perfetta per far bucare la voce nei ritornelli più densi.',
      en: 'When you need raw attitude without brittle digital distortion: hard Drive and EVOLVE deliver musical analog grit that helps vocals cut straight through dense choruses.',
    },
    details: {
      it: [
        { k: 'Sorgente', v: 'Rock ’n’ Roll Vocal' },
        { k: 'Elaborazione', v: 'Drive spinto · EVOLVE · Parallelo' },
        { k: 'Registrazione', v: '100% Hardware reale · 48 kHz' },
      ],
      en: [
        { k: 'Source', v: 'Rock ’n’ Roll Vocal' },
        { k: 'Processing', v: 'Hard Drive · EVOLVE · Parallel' },
        { k: 'Capture', v: '100% Real Hardware · 48 kHz' },
      ],
    },
  },
];

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function SoundLab({ lang, t }: SoundLabProps) {
  const [selectedId, setSelectedId] = useState(videoDemos[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const active = videoDemos.find((d) => d.id === selectedId) ?? videoDemos[0];

  // Reset player cleanly when switching clips
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }
  }, [selectedId]);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      try {
        await v.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const handleRestart = async () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    try {
      await v.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    v.currentTime = ratio * duration;
    setCurrentTime(v.currentTime);
  };

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

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

        {/* Minimalist horizontal source bar matching #hardware */}
        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-white/12 pb-3">
          {videoDemos.map((demo) => {
            const isActive = demo.id === selectedId;
            return (
              <button
                key={demo.id}
                type="button"
                onClick={() => setSelectedId(demo.id)}
                className={`relative -mb-[13px] pb-3 text-sm font-semibold lowercase tracking-wide transition-colors ${
                  isActive ? 'text-white' : 'text-[#7D828E] hover:text-white'
                }`}
              >
                {demo.label[lang]}
                {isActive && (
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

        {/* Full-width 1U Hardware Motion Video Stage */}
        <div className="mt-10 overflow-hidden rounded-[8px] border border-white/12 bg-black">
          <div
            onClick={togglePlay}
            className="group relative cursor-pointer bg-black"
          >
            <video
              ref={videoRef}
              src={active.src}
              playsInline
              preload="metadata"
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onEnded={() => setIsPlaying(false)}
              className="block w-full bg-black"
            />

            {/* Clean centered play prompt when paused */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/20">
                <div className="flex h-16 w-16 items-center justify-center rounded-[4px] bg-[#C88318] text-black shadow-2xl transition-transform duration-200 group-hover:scale-105 group-hover:bg-[#D99B32]">
                  <Play className="ml-0.5 h-6 w-6 fill-current" />
                </div>
              </div>
            )}
          </div>

          {/* Custom Minimalist Studio Transport Bar */}
          <div className="flex flex-wrap items-center gap-4 border-t border-white/10 bg-[#0A0A0C] px-4 py-3.5 sm:px-6">
            <button
              type="button"
              onClick={togglePlay}
              className="inline-flex h-9 w-9 items-center justify-center rounded-[4px] bg-[#C88318] text-black transition-colors hover:bg-[#D99B32]"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 fill-current" />
              ) : (
                <Play className="ml-0.5 h-4 w-4 fill-current" />
              )}
            </button>

            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex h-9 w-9 items-center justify-center rounded-[4px] border border-white/15 text-[#B8BDC7] transition-colors hover:border-white/40 hover:text-white"
              aria-label="Restart"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            {/* Interactive Scrub Bar */}
            <div
              onClick={handleSeek}
              role="slider"
              aria-label="Timeline"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              aria-valuenow={Math.round(currentTime)}
              tabIndex={0}
              className="relative flex h-6 flex-1 cursor-pointer items-center"
            >
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/15">
                <div
                  style={{ width: `${progressPct}%` }}
                  className="h-full bg-[#D99B32] transition-[width] duration-75"
                />
              </div>
            </div>

            <div className="tabular text-xs font-medium text-[#9A9FA9]">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            <button
              type="button"
              onClick={toggleMute}
              className="inline-flex h-9 w-9 items-center justify-center rounded-[4px] border border-white/15 text-[#B8BDC7] transition-colors hover:border-white/40 hover:text-white"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-[#D99B32]" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Open 2-column architectural description matching #hardware */}
        <motion.div
          key={active.id}
          initial={{ opacity: 0.4, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 grid gap-10 border-t border-white/12 pt-10 lg:grid-cols-12 lg:items-start"
        >
          <div className="lg:col-span-7">
            <h3 className="text-3xl font-bold leading-[1.08] tracking-[-0.025em] text-white sm:text-4xl">
              {active.headline[lang]}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#9A9FA9] sm:text-[15px]">
              {active.description[lang]}
            </p>
          </div>

          <dl className="divide-y divide-white/12 border-y border-white/12 lg:col-span-5">
            {active.details[lang].map((row) => (
              <div
                key={row.k}
                className="flex items-baseline justify-between gap-6 py-4 text-sm"
              >
                <dt className="font-medium text-[#9A9FA9]">{row.k}</dt>
                <dd className="tabular text-right font-semibold text-white">
                  {row.v}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
