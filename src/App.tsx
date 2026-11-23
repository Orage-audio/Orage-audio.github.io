import { useEffect, useState } from 'react';
import { translations, type Lang } from './i18n/translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Highlights } from './components/Highlights';
import { InteractiveHardware } from './components/InteractiveHardware';
import { Gallery } from './components/Gallery';
import { SoundLab } from './components/SoundLab';
import { Specs } from './components/Specs';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export function App() {
  const [lang, setLang] = useState<Lang>('it');
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#F5F5F7]">
      <Navbar lang={lang} onToggleLang={setLang} t={t.nav} />
      <main>
        <Hero t={t.hero} />
        <Highlights lang={lang} t={t.philosophy} />
        <InteractiveHardware lang={lang} t={t.hardware} />
        <Gallery t={t.gallery} />
        <SoundLab lang={lang} t={t.soundLab} />
        <Specs t={t.specs} />
        <About t={t.about} />
        <Contact t={t.contact} />
      </main>
      <Footer t={t.footer} />
    </div>
  );
}

export default App;
