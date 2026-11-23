import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { Lang, Translations } from '../i18n/translations';

interface NavbarProps {
  lang: Lang;
  onToggleLang: (lang: Lang) => void;
  t: Translations['nav'];
  activePage: 'home' | 'downloads';
  onOpenDownloads: () => void;
  onOpenHome: (sectionHash?: string) => void;
}

export function Navbar({
  lang,
  onToggleLang,
  t,
  activePage,
  onOpenDownloads,
  onOpenHome,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#highlights', label: t.overview },
    { href: '#hardware', label: t.hardware },
    { href: '#sound-lab', label: t.soundLab },
    { href: '#specs', label: t.specs },
    { href: '#about', label: t.about },
  ];

  const downloadsLabel = lang === 'it' ? 'Download & Recall' : 'Downloads & Recall';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || activePage === 'downloads'
          ? 'border-b border-white/10 bg-[#0A0A0C]/90 backdrop-blur-xl'
          : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <button
          type="button"
          onClick={() => onOpenHome()}
          className="group flex items-baseline gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C88318]"
        >
          <span
            style={{ fontFamily: "'Fugaz One', sans-serif" }}
            className="text-xl tracking-tight text-white transition-colors group-hover:text-[#D99B32]"
          >
            Orage
          </span>
          <span className="h-3.5 w-px bg-white/15" aria-hidden="true" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B8BDC7]">
            EVOLVER
          </span>
        </button>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {links.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => onOpenHome(link.href)}
              className="text-xs font-medium tracking-wide text-[#A1A6B2] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C88318]"
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={onOpenDownloads}
            className={`text-xs font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C88318] ${
              activePage === 'downloads'
                ? 'text-[#D99B32]'
                : 'text-[#E4E6EA] hover:text-[#D99B32]'
            }`}
          >
            {downloadsLabel}
          </button>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div
            className="flex items-center rounded-[4px] border border-white/15 bg-black/50 p-0.5 text-[11px] font-medium"
            role="group"
            aria-label="Language"
          >
            <button
              type="button"
              onClick={() => onToggleLang('it')}
              className={`rounded-[3px] px-2.5 py-1 transition-colors ${
                lang === 'it'
                  ? 'bg-white font-semibold text-black'
                  : 'text-[#989DA8] hover:text-white'
              }`}
            >
              IT
            </button>
            <button
              type="button"
              onClick={() => onToggleLang('en')}
              className={`rounded-[3px] px-2.5 py-1 transition-colors ${
                lang === 'en'
                  ? 'bg-white font-semibold text-black'
                  : 'text-[#989DA8] hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={() => onOpenHome('#contact')}
            className="rounded-[4px] bg-[#C88318] px-5 py-2 text-xs font-semibold tracking-wide text-black transition-colors hover:bg-[#D99B32] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C88318]"
          >
            {t.cta}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => onToggleLang(lang === 'it' ? 'en' : 'it')}
            className="rounded-[4px] border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-medium text-white"
          >
            {lang.toUpperCase()}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-[4px] p-2 text-white hover:bg-white/5"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-b border-white/10 bg-[#0A0A0C]/98 px-6 pb-6 pt-3 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenHome(link.href);
                }}
                className="py-1.5 text-left text-base font-medium text-[#E4E6EA] hover:text-[#D99B32]"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenDownloads();
              }}
              className="py-1.5 text-left text-base font-semibold text-[#D99B32]"
            >
              {downloadsLabel}
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenHome('#contact');
              }}
              className="mt-2 inline-flex justify-center rounded-[4px] bg-[#C88318] px-5 py-3 text-sm font-semibold text-black"
            >
              {t.cta}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
