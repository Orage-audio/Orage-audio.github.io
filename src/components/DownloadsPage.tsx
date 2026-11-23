import { useRef, useState } from 'react';
import {
  ArrowLeft,
  Check,
  Copy,
  Download,
  FileArchive,
  FileText,
  Printer,
  RotateCcw,
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import type { Lang } from '../i18n/translations';

interface DownloadsPageProps {
  lang: Lang;
  onBack: () => void;
}

interface KnobDef {
  id: string;
  label: string;
  /** Exact percentage coordinates derived from the 1280px original layout */
  leftPct: number;
  topPct: number;
  widthPct: number;
  defaultVal: number;
}

// Original layout: container 1280px wide, outboard height ~125px (aspect ~10.22:1)
// knob1..6 lefts: 102, 315, 455, 572, 691, 928 -> /1280 = exact %
// knob width: 100/1280 = 7.8125%
const KNOBS: KnobDef[] = [
  { id: 'gain', label: 'Gain', leftPct: 7.97, topPct: 16.5, widthPct: 7.81, defaultVal: 5.0 },
  { id: 'drive', label: 'Drive', leftPct: 24.61, topPct: 16.5, widthPct: 7.81, defaultVal: 5.0 },
  { id: 'lowCut', label: 'Low Cut', leftPct: 35.55, topPct: 16.5, widthPct: 7.81, defaultVal: 0.0 },
  { id: 'hiCut', label: 'Hi Cut', leftPct: 44.69, topPct: 16.5, widthPct: 7.81, defaultVal: 10.0 },
  { id: 'volume', label: 'Volume', leftPct: 53.98, topPct: 16.5, widthPct: 7.81, defaultVal: 5.0 },
  { id: 'mix', label: 'Mix (Dry/Wet)', leftPct: 72.5, topPct: 16.5, widthPct: 7.81, defaultVal: 5.0 },
];

const MIN_DEG = -135;
const MAX_DEG = 135;

function valueToDeg(val: number) {
  return MIN_DEG + (val / 10) * (MAX_DEG - MIN_DEG);
}

function clampStep(val: number) {
  return Math.max(0, Math.min(10, Math.round(val * 2) / 2));
}

const copy = {
  it: {
    back: 'Torna a EVOLVER',
    pageTitle: 'Download & Recall Sheet',
    pageSub:
      'Documentazione ufficiale dell’Evolver Overdrive e applicazione web interattiva per salvare e richiamare i tuoi settaggi analogici in studio.',
    downloadsTitle: 'Risorse Ufficiali',
    files: [
      {
        title: 'Manuale d’istruzioni EVOLVER',
        meta: 'PDF · 404 KB · Italiano',
        desc: 'Guida completa a connessioni bilanciate, gain staging, controlli, filtri 3 dB/oct e specifiche tecniche.',
        href: './downloads/Manuale-Evolver.pdf',
        filename: 'Manuale-Evolver.pdf',
        cta: 'Scarica PDF',
        icon: 'pdf',
      },
      {
        title: 'Web App Recall Sheet (Offline)',
        meta: 'Archivio RAR · 1,2 MB',
        desc: 'Versione offline scaricabile della web app per creare recall sheet anche su workstation scollegate da internet.',
        href: './downloads/RECALL-EVOLVER.rar',
        filename: 'RECALL-EVOLVER.rar',
        cta: 'Scarica RAR',
        icon: 'rar',
      },
      {
        title: 'Guida Recall Sheet Offline',
        meta: 'PDF · 654 KB · Italiano',
        desc: 'Istruzioni rapide per decomprimere e utilizzare la versione offline della web app sul tuo computer.',
        href: './downloads/Istruzioni-Recall-Sheet.pdf',
        filename: 'Istruzioni-Recall-Sheet.pdf',
        cta: 'Scarica PDF',
        icon: 'pdf',
      },
    ],
    recallTitle: 'EVOLVER Recall Sheet Online',
    recallSub:
      'Trascina su/giù sui pomelli (o usa la rotella del mouse) per registrare la posizione esatta dell’hardware, attiva gli switch ed esporta un PDF A4 pronto per l’archivio di sessione.',
    hint: 'Trascina su/giù o usa la rotella del mouse sui pomelli · Doppio click per resettare',
    songLabel: 'Brano / Progetto',
    songPh: 'Es. Album Track 03',
    trackLabel: 'Traccia / Stem',
    trackPh: 'Es. Drum Bus, Lead Vocal, Mix Bus...',
    dateLabel: 'Data',
    notesLabel: 'Note di sessione (patchbay, headroom, automazioni)',
    notesPh: 'Es. +4 dBu da convertitore 3-4, spingere Drive a 7 sul ritornello...',
    switchesTitle: 'Stato Switch',
    tableTitle: 'Valori Potenziometri',
    exportPdf: 'Esporta PDF A4',
    exporting: 'Generazione PDF...',
    copyText: 'Copia per note DAW',
    copied: 'Copiato!',
    reset: 'Reset',
  },
  en: {
    back: 'Back to EVOLVER',
    pageTitle: 'Downloads & Recall Sheet',
    pageSub:
      'Official EVOLVER Overdrive documentation and interactive web app to document and recall your exact analog settings in the studio.',
    downloadsTitle: 'Official Resources',
    files: [
      {
        title: 'EVOLVER User Manual',
        meta: 'PDF · 404 KB · Italian',
        desc: 'Complete guide covering balanced I/O, gain staging, controls, 3 dB/oct filters, and technical specifications.',
        href: './downloads/Manuale-Evolver.pdf',
        filename: 'Manuale-Evolver.pdf',
        cta: 'Download PDF',
        icon: 'pdf',
      },
      {
        title: 'Recall Sheet Web App (Offline)',
        meta: 'RAR Archive · 1.2 MB',
        desc: 'Downloadable offline package for studio workstations without internet access.',
        href: './downloads/RECALL-EVOLVER.rar',
        filename: 'RECALL-EVOLVER.rar',
        cta: 'Download RAR',
        icon: 'rar',
      },
      {
        title: 'Offline Recall Sheet Guide',
        meta: 'PDF · 654 KB · Italian',
        desc: 'Quick instructions to unpack and run the offline recall web app locally.',
        href: './downloads/Istruzioni-Recall-Sheet.pdf',
        filename: 'Istruzioni-Recall-Sheet.pdf',
        cta: 'Download PDF',
        icon: 'pdf',
      },
    ],
    recallTitle: 'EVOLVER Online Recall Sheet',
    recallSub:
      'Drag up/down on any knob (or scroll your mouse wheel) to mirror your physical hardware, toggle switches, and export a clean A4 studio PDF in one click.',
    hint: 'Drag up/down or scroll wheel on knobs · Double-click a knob to reset',
    songLabel: 'Song / Project',
    songPh: 'e.g. Album Track 03',
    trackLabel: 'Track / Stem',
    trackPh: 'e.g. Drum Bus, Lead Vocal, Mix Bus...',
    dateLabel: 'Date',
    notesLabel: 'Session Notes (patchbay, headroom, recalls)',
    notesPh: 'e.g. +4 dBu from converter 3-4, push Drive to 7.0 on chorus...',
    switchesTitle: 'Switches',
    tableTitle: 'Knob Positions',
    exportPdf: 'Export A4 PDF',
    exporting: 'Generating PDF...',
    copyText: 'Copy for DAW notes',
    copied: 'Copied!',
    reset: 'Reset',
  },
};

export function DownloadsPage({ lang, onBack }: DownloadsPageProps) {
  const t = copy[lang];

  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(KNOBS.map((k) => [k.id, k.defaultVal]))
  );
  const [switches, setSwitches] = useState({
    pad: false,
    evolve: false,
    blendOff: false,
    bypass: false,
  });
  const [song, setSong] = useState('');
  const [track, setTrack] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState('');
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  const dragRef = useRef<{ id: string; startY: number; startVal: number } | null>(null);

  const setKnob = (id: string, next: number) => {
    setValues((prev) => ({ ...prev, [id]: clampStep(next) }));
  };

  const handlePointerDown = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { id, startY: e.clientY, startVal: values[id] ?? 5 };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const deltaY = dragRef.current.startY - e.clientY;
    const nextVal = dragRef.current.startVal + deltaY / 16;
    setKnob(dragRef.current.id, nextVal);
  };

  const handlePointerUp = () => {
    dragRef.current = null;
  };

  const handleWheel = (id: string, e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const step = e.deltaY > 0 ? -0.5 : 0.5;
    setKnob(id, (values[id] ?? 5) + step);
  };

  const handleReset = () => {
    setValues(Object.fromEntries(KNOBS.map((k) => [k.id, k.defaultVal])));
    setSwitches({ pad: false, evolve: false, blendOff: false, bypass: false });
  };

  const handleCopyText = async () => {
    const lines = [
      `ORAGE AUDIO — EVOLVER RECALL SHEET`,
      song ? `Project: ${song}` : '',
      track ? `Track: ${track}` : '',
      `Date: ${date}`,
      `---`,
      ...KNOBS.map((k) => `${k.label}: ${(values[k.id] ?? 0).toFixed(1)} / 10`),
      `PAD: ${switches.pad ? 'ON' : 'OFF'} | EVOLVE: ${switches.evolve ? 'ON' : 'OFF'} | BLEND OFF: ${switches.blendOff ? 'ON' : 'OFF'} | BYPASS: ${switches.bypass ? 'ON' : 'OFF'}`,
      notes ? `---\nNotes: ${notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    try {
      await navigator.clipboard.writeText(lines);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard failure
    }
  };

  /**
   * Generates a crisp, print-ready A4 Landscape PDF with the actual hardware
   * faceplate composited with every knob rotated to its exact position.
   */
  const handleExportPdf = async () => {
    setExporting(true);
    try {
      const loadImg = (src: string) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });

      const [bgImg, knobImg] = await Promise.all([
        loadImg('./images/recall-outboard.png'),
        loadImg('./images/recall-knob.png'),
      ]);

      // Render high-res composite faceplate onto offscreen canvas
      const canvas = document.createElement('canvas');
      canvas.width = bgImg.naturalWidth;
      canvas.height = bgImg.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas unavailable');

      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

      for (const k of KNOBS) {
        const kw = (k.widthPct / 100) * canvas.width;
        const kh = kw * (knobImg.naturalHeight / knobImg.naturalWidth);
        const kx = (k.leftPct / 100) * canvas.width;
        const ky = (k.topPct / 100) * canvas.height;
        const cx = kx + kw / 2;
        const cy = ky + kh / 2;
        const rad = (valueToDeg(values[k.id] ?? 5) * Math.PI) / 180;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rad);
        ctx.drawImage(knobImg, -kw / 2, -kh / 2, kw, kh);
        ctx.restore();
      }

      // Draw switch LEDs directly on composite
      const drawLed = (xPct: number, yPct: number, on: boolean, color: string) => {
        const x = (xPct / 100) * canvas.width;
        const y = (yPct / 100) * canvas.height;
        const r = canvas.height * 0.048;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = on ? color : 'rgba(20,20,24,0.65)';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = on ? '#ffffff' : 'rgba(255,255,255,0.35)';
        ctx.stroke();
      };
      drawLed(16.6, 39, switches.pad, '#D99B32');
      drawLed(34.1, 56, switches.evolve, '#3B82F6');
      drawLed(82.0, 42, switches.bypass, '#EF4444');

      const compositeDataUrl = canvas.toDataURL('image/png');

      // Build clean A4 Landscape studio recall PDF
      const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      const pageW = doc.internal.pageSize.getWidth(); // 297mm

      // Header bar
      doc.setFillColor(12, 12, 14);
      doc.rect(0, 0, pageW, 24, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('ORAGE AUDIO', 14, 11.5);
      doc.setTextColor(217, 155, 50);
      doc.setFontSize(10);
      doc.text('EVOLVER OVERDRIVE — ANALOG RECALL SHEET', 14, 18);

      doc.setTextColor(210, 214, 220);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.text(
        `${song || 'Untitled Session'}  |  ${track || 'Stereo Bus'}  |  ${date}`,
        pageW - 14,
        14,
        { align: 'right' }
      );

      // Composite hardware faceplate image
      const imgW = pageW - 28;
      const imgH = imgW * (canvas.height / canvas.width);
      doc.addImage(compositeDataUrl, 'PNG', 14, 32, imgW, imgH);

      // Parameter grid
      const tableY = 32 + imgH + 12;
      doc.setTextColor(20, 20, 24);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('KNOB SETTINGS (0.0 – 10.0)', 14, tableY);
      doc.text('SWITCHES', 165, tableY);

      doc.setDrawColor(210, 212, 218);
      doc.line(14, tableY + 3, 150, tableY + 3);
      doc.line(165, tableY + 3, pageW - 14, tableY + 3);

      doc.setFontSize(10);
      KNOBS.forEach((k, idx) => {
        const y = tableY + 11 + idx * 9;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(75, 78, 86);
        doc.text(k.label, 14, y);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(15, 15, 18);
        doc.text(`${(values[k.id] ?? 0).toFixed(1)}`, 148, y, { align: 'right' });
        doc.setDrawColor(235, 236, 240);
        doc.line(14, y + 2.5, 150, y + 2.5);
      });

      const swList = [
        ['PAD', switches.pad],
        ['EVOLVE', switches.evolve],
        ['BLEND OFF', switches.blendOff],
        ['BYPASS', switches.bypass],
      ] as const;

      swList.forEach(([label, state], idx) => {
        const y = tableY + 11 + idx * 9;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(75, 78, 86);
        doc.text(label, 165, y);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(state ? 184 : 130, state ? 115 : 134, state ? 18 : 144);
        doc.text(state ? 'ON' : 'OFF', pageW - 14, y, { align: 'right' });
        doc.setDrawColor(235, 236, 240);
        doc.line(165, y + 2.5, pageW - 14, y + 2.5);
      });

      // Notes section
      const notesY = tableY + 72;
      doc.setTextColor(20, 20, 24);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.text('SESSION NOTES', 14, notesY);
      doc.setDrawColor(210, 212, 218);
      doc.line(14, notesY + 3, pageW - 14, notesY + 3);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(65, 68, 76);
      const wrappedNotes = doc.splitTextToSize(notes || '—', pageW - 28);
      doc.text(wrappedNotes, 14, notesY + 10);

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(140, 144, 152);
      doc.text('orage-audio.github.io  ·  Orage Audio EVOLVER Overdrive (1U Aluminum Edition)', 14, 202);

      const safeName = (song || track || 'evolver-recall')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      doc.save(`${safeName || 'evolver-recall'}-sheet.pdf`);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-24 text-[#F5F5F7]">
      {/* Top Header & Official Downloads */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#9A9FA9] transition-colors hover:text-[#D99B32]"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.back}
        </button>

        <div className="mt-8 max-w-3xl">
          <h1 className="text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
            {t.pageTitle}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[#9A9FA9] sm:text-lg">
            {t.pageSub}
          </p>
        </div>

        {/* Official Downloads Hairline Grid */}
        <div className="mt-14">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D99B32]">
            {t.downloadsTitle}
          </h2>
          <div className="mt-4 grid border-y border-white/12 md:grid-cols-3 md:divide-x md:divide-white/12">
            {t.files.map((file) => (
              <div
                key={file.filename}
                className="flex flex-col justify-between border-b border-white/12 py-8 last:border-b-0 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-medium text-[#8C919C]">
                    <span>{file.meta}</span>
                    {file.icon === 'rar' ? (
                      <FileArchive className="h-4 w-4 text-[#D99B32]" />
                    ) : (
                      <FileText className="h-4 w-4 text-[#D99B32]" />
                    )}
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-white">
                    {file.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#9A9FA9]">
                    {file.desc}
                  </p>
                </div>

                <a
                  href={file.href}
                  download={file.filename}
                  className="mt-7 inline-flex h-11 w-fit items-center gap-2 rounded-[4px] border border-white/25 px-6 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-[#D99B32] hover:bg-[#C88318] hover:text-black"
                >
                  <Download className="h-4 w-4" />
                  {file.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Online Recall Sheet Studio */}
      <section className="surface-cardstock border-t border-white/10 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold leading-[1.04] tracking-[-0.03em] text-white sm:text-5xl">
                {t.recallTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#9A9FA9]">
                {t.recallSub}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex h-11 items-center gap-2 rounded-[4px] border border-white/20 px-4 text-xs font-medium text-[#D1D5DB] transition-colors hover:border-white hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {t.reset}
              </button>
              <button
                type="button"
                onClick={handleCopyText}
                className="inline-flex h-11 items-center gap-2 rounded-[4px] border border-white/20 px-4 text-xs font-medium text-[#D1D5DB] transition-colors hover:border-white hover:text-white"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-[#22C55E]" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {copied ? t.copied : t.copyText}
              </button>
              <button
                type="button"
                onClick={handleExportPdf}
                disabled={exporting}
                className="inline-flex h-11 items-center gap-2 rounded-[4px] bg-[#C88318] px-6 text-xs font-semibold uppercase tracking-[0.12em] text-black transition-colors hover:bg-[#D99B32] disabled:opacity-60"
              >
                <Printer className="h-4 w-4" />
                {exporting ? t.exporting : t.exportPdf}
              </button>
            </div>
          </div>

          {/* Interactive Faceplate with True Rotatable Hardware Knobs */}
          <div className="mt-12">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#8C919C]">
              {t.hint}
            </p>

            <div className="overflow-x-auto pb-3">
              <div className="relative min-w-[820px] select-none overflow-hidden rounded-[4px] bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/15">
                <img
                  src="./images/recall-outboard.png"
                  alt="EVOLVER Recall Sheet Interactive Faceplate"
                  draggable={false}
                  className="block w-full"
                />

                {/* 6 Interactive Rotatable Knobs */}
                {KNOBS.map((k) => {
                  const val = values[k.id] ?? 5;
                  const deg = valueToDeg(val);
                  return (
                    <div
                      key={k.id}
                      role="slider"
                      tabIndex={0}
                      aria-label={k.label}
                      aria-valuemin={0}
                      aria-valuemax={10}
                      aria-valuenow={val}
                      title={`${k.label}: ${val.toFixed(1)}`}
                      onPointerDown={(e) => handlePointerDown(k.id, e)}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      onPointerCancel={handlePointerUp}
                      onWheel={(e) => handleWheel(k.id, e)}
                      onDoubleClick={() => setKnob(k.id, k.defaultVal)}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
                          e.preventDefault();
                          setKnob(k.id, val + 0.5);
                        } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
                          e.preventDefault();
                          setKnob(k.id, val - 0.5);
                        }
                      }}
                      style={{
                        left: `${k.leftPct}%`,
                        top: `${k.topPct}%`,
                        width: `${k.widthPct}%`,
                        touchAction: 'none',
                      }}
                      className="absolute cursor-ns-resize focus-visible:outline-2 focus-visible:outline-[#D99B32]"
                    >
                      <img
                        src="./images/recall-knob.png"
                        alt={k.label}
                        draggable={false}
                        style={{ transform: `rotate(${deg}deg)` }}
                        className="block w-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] transition-transform duration-75"
                      />
                    </div>
                  );
                })}

                {/* Direct On-Panel Switch Hotspots (PAD, EVOLVE, BYPASS) */}
                <button
                  type="button"
                  onClick={() => setSwitches((s) => ({ ...s, pad: !s.pad }))}
                  title="Toggle PAD"
                  style={{ left: '15.2%', top: '31%', width: '3.0%', height: '18%' }}
                  className={`absolute rounded-[2px] border transition-all ${
                    switches.pad
                      ? 'border-[#D99B32] bg-[#D99B32]/35 shadow-[0_0_12px_rgba(217,155,50,0.6)]'
                      : 'border-transparent hover:border-white/50'
                  }`}
                  aria-pressed={switches.pad}
                  aria-label="PAD"
                />
                <button
                  type="button"
                  onClick={() => setSwitches((s) => ({ ...s, evolve: !s.evolve }))}
                  title="Toggle EVOLVE"
                  style={{ left: '31.7%', top: '48%', width: '3.2%', height: '18%' }}
                  className={`absolute rounded-[2px] border transition-all ${
                    switches.evolve
                      ? 'border-[#3B82F6] bg-[#3B82F6]/35 shadow-[0_0_14px_rgba(59,130,246,0.75)]'
                      : 'border-transparent hover:border-white/50'
                  }`}
                  aria-pressed={switches.evolve}
                  aria-label="EVOLVE"
                />
                <button
                  type="button"
                  onClick={() => setSwitches((s) => ({ ...s, bypass: !s.bypass }))}
                  title="Toggle BYPASS"
                  style={{ left: '80.5%', top: '48%', width: '3.0%', height: '20%' }}
                  className={`absolute rounded-[2px] border transition-all ${
                    switches.bypass
                      ? 'border-[#EF4444] bg-[#EF4444]/35 shadow-[0_0_12px_rgba(239,68,68,0.7)]'
                      : 'border-transparent hover:border-white/50'
                  }`}
                  aria-pressed={switches.bypass}
                  aria-label="BYPASS"
                />
              </div>
            </div>
          </div>

          {/* Session Metadata + Live Parameter Table */}
          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            {/* Left: Session Info & Switches */}
            <div className="space-y-8 lg:col-span-5">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8C919C]">
                    {t.songLabel}
                  </label>
                  <input
                    type="text"
                    value={song}
                    onChange={(e) => setSong(e.target.value)}
                    placeholder={t.songPh}
                    className="mt-2 w-full border-b border-white/20 bg-transparent pb-2 text-sm text-white placeholder-[#525662] focus:border-[#D99B32] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8C919C]">
                    {t.trackLabel}
                  </label>
                  <input
                    type="text"
                    value={track}
                    onChange={(e) => setTrack(e.target.value)}
                    placeholder={t.trackPh}
                    className="mt-2 w-full border-b border-white/20 bg-transparent pb-2 text-sm text-white placeholder-[#525662] focus:border-[#D99B32] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8C919C]">
                  {t.dateLabel}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-2 w-full border-b border-white/20 bg-transparent pb-2 text-sm text-white focus:border-[#D99B32] focus:outline-none"
                />
              </div>

              <div>
                <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8C919C]">
                  {t.switchesTitle}
                </span>
                <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {(
                    [
                      ['pad', 'PAD'],
                      ['evolve', 'EVOLVE'],
                      ['blendOff', 'BLEND OFF'],
                      ['bypass', 'BYPASS'],
                    ] as const
                  ).map(([key, label]) => {
                    const active = switches[key];
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() =>
                          setSwitches((s) => ({ ...s, [key]: !s[key] }))
                        }
                        className={`rounded-[4px] border px-3 py-2.5 text-xs font-semibold tracking-wide transition-colors ${
                          active
                            ? 'border-[#C88318] bg-[#C88318] text-black'
                            : 'border-white/15 bg-black/40 text-[#9A9FA9] hover:border-white/40 hover:text-white'
                        }`}
                      >
                        {label} · {active ? 'ON' : 'OFF'}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8C919C]">
                  {t.notesLabel}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.notesPh}
                  className="mt-2 w-full resize-none border-b border-white/20 bg-transparent pb-2 text-sm text-white placeholder-[#525662] focus:border-[#D99B32] focus:outline-none"
                />
              </div>
            </div>

            {/* Right: Live Synchronized Parameter Table */}
            <div className="lg:col-span-7">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D99B32]">
                {t.tableTitle}
              </div>
              <div className="mt-4 divide-y divide-white/12 border-y border-white/12">
                {KNOBS.map((k) => {
                  const val = values[k.id] ?? 5;
                  return (
                    <div
                      key={k.id}
                      className="grid grid-cols-12 items-center gap-4 py-4"
                    >
                      <div className="col-span-4 text-sm font-semibold text-white">
                        {k.label}
                      </div>
                      <div className="col-span-6">
                        <input
                          type="range"
                          min={0}
                          max={10}
                          step={0.5}
                          value={val}
                          onChange={(e) => setKnob(k.id, parseFloat(e.target.value))}
                          aria-label={k.label}
                          className="h-1 w-full cursor-pointer accent-[#C88318]"
                        />
                      </div>
                      <div className="tabular col-span-2 text-right text-sm font-bold text-[#D99B32]">
                        {val.toFixed(1)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
