import type { Translations } from '../i18n/translations';

interface FooterProps {
  t: Translations['footer'];
}

export function Footer({ t }: FooterProps) {
  return (
    <footer className="border-t border-white/8 bg-black py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 sm:flex-row sm:items-center sm:px-8">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="font-brand text-2xl text-white">
              Orage
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-[#7E8492]">
              EVOLVER OVERDRIVE
            </span>
          </div>
          <p className="mt-2 text-xs text-[#7E8492]">{t.tagline}</p>
        </div>

        <p className="text-xs text-[#7E8492]">
          © {new Date().getFullYear()} Orage Audio · {t.rights}
        </p>
      </div>
    </footer>
  );
}
