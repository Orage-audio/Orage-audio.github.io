import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';
import type { Translations } from '../i18n/translations';

interface ContactProps {
  t: Translations['contact'];
}

const TARGET_EMAIL = 'orageaudioinfo@gmail.com';
const INSTAGRAM_URL = 'https://www.instagram.com/orageaudio';

export function Contact({ t }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studio, setStudio] = useState('');
  const [interest, setInterest] = useState<'info' | 'demo' | 'order'>('info');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const subject = `[Orage EVOLVER] ${t.interests[interest]} — ${name}`;
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: subject,
          _template: 'table',
          _captcha: 'false',
          name,
          email,
          studio: studio || '-',
          interest: t.interests[interest],
          message,
        }),
      });

      if (!res.ok) throw new Error('FormSubmit unavailable');
      setSubmitted(true);
      setName('');
      setEmail('');
      setStudio('');
      setMessage('');
    } catch {
      // Graceful fallback to direct email client if offline/blocked
      const body = [
        `Nome: ${name}`,
        `Email: ${email}`,
        studio ? `Studio/Progetto: ${studio}` : '',
        `Richiesta: ${t.interests[interest]}`,
        '',
        message,
      ]
        .filter(Boolean)
        .join('\n');
      window.location.href = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="border-t border-white/8 bg-black py-24 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-white sm:text-5xl">
              {t.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#A1A6B2]">
              {t.subtitle}
            </p>

            <div className="mt-10 border-t border-white/10 pt-8">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7E8492]">
                {t.directLabel}
              </div>
              <div className="mt-4 flex flex-col gap-3.5">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 text-sm font-medium text-[#E4E6EA] transition-colors hover:text-[#D99B32]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-[#D99B32]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span>@orageaudio</span>
                </a>
                <a
                  href={`mailto:${TARGET_EMAIL}`}
                  className="inline-flex items-center gap-3 text-sm font-medium text-[#E4E6EA] transition-colors hover:text-[#D99B32]"
                >
                  <Mail className="h-4 w-4 text-[#D99B32]" />
                  <span>{TARGET_EMAIL}</span>
                </a>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[10px] border border-white/10 bg-[#0F0F12] p-6 sm:p-10 lg:col-span-7"
          >
            {submitted ? (
              <div className="flex flex-col items-start gap-4 py-8">
                <CheckCircle2 className="h-9 w-9 text-[#22C55E]" />
                <h3 className="text-2xl font-bold text-white">{t.sentTitle}</h3>
                <p className="max-w-md text-sm leading-relaxed text-[#A1A6B2]">
                  {t.sentBody}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 rounded-[4px] border border-white/25 px-5 py-2 text-xs font-medium text-white hover:border-white"
                >
                  ← New message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#989DA8]">
                    {t.interestLabel}
                  </span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(['info', 'demo', 'order'] as const).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setInterest(key)}
                        className={`rounded-[4px] border px-4 py-2 text-xs font-medium transition-colors ${
                          interest === key
                            ? 'border-[#C88318] bg-[#C88318] font-semibold text-black'
                            : 'border-white/15 bg-transparent text-[#A1A6B2] hover:border-white/40 hover:text-white'
                        }`}
                      >
                        {t.interests[key]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8C919C]"
                    >
                      {t.nameLabel}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.namePlaceholder}
                      className="mt-2 w-full border-b border-white/20 bg-transparent pb-2.5 text-sm text-white placeholder-[#525662] transition-colors focus:border-[#D99B32] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8C919C]"
                    >
                      {t.emailLabel}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className="mt-2 w-full border-b border-white/20 bg-transparent pb-2.5 text-sm text-white placeholder-[#525662] transition-colors focus:border-[#D99B32] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-studio"
                    className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8C919C]"
                  >
                    {t.studioLabel}
                  </label>
                  <input
                    id="contact-studio"
                    type="text"
                    value={studio}
                    onChange={(e) => setStudio(e.target.value)}
                    placeholder={t.studioPlaceholder}
                    className="mt-2 w-full border-b border-white/20 bg-transparent pb-2.5 text-sm text-white placeholder-[#525662] transition-colors focus:border-[#D99B32] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8C919C]"
                  >
                    {t.messageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.messagePlaceholder}
                    className="mt-2 w-full resize-none border-b border-white/20 bg-transparent pb-2.5 text-sm text-white placeholder-[#525662] transition-colors focus:border-[#D99B32] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[4px] bg-[#C88318] px-9 text-sm font-semibold tracking-wide text-black transition-colors hover:bg-[#D99B32] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C88318]"
                >
                  {sending && <Loader2 className="h-4 w-4 animate-spin" />}
                  {t.submit}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
