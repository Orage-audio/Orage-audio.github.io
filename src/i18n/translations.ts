export type Lang = 'it' | 'en';

export interface Translations {
  nav: {
    overview: string;
    hardware: string;
    soundLab: string;
    specs: string;
    about: string;
    contact: string;
    cta: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    scrollHint: string;
    rackLabel: string;
    editionLabel: string;
  };
  philosophy: {
    title: string;
    lead: string;
    pillars: {
      title: string;
      description: string;
      metric: string;
    }[];
  };
  hardware: {
    title: string;
    subtitle: string;
    hint: string;
    rearTitle: string;
    rearSubtitle: string;
    rearSpecs: {
      label: string;
      detail: string;
    }[];
    interactiveLabel: string;
    signalPath: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    captions: {
      angularBlack: string;
      angularOrange: string;
      dualOrange: string;
      rackFront: string;
    };
  };
  soundLab: {
    title: string;
    subtitle: string;
    bypassLabel: string;
    engagedLabel: string;
    comingSoonTitle: string;
    comingSoonBody: string;
    comingSoonCta: string;
    sources: {
      id: string;
      name: string;
      note: string;
    }[];
  };
  specs: {
    title: string;
    subtitle: string;
    groups: {
      category: string;
      items: {
        label: string;
        value: string;
      }[];
    }[];
  };
  about: {
    title: string;
    paragraphs: string[];
    manifesto: string;
    location: string;
  };
  contact: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    studioLabel: string;
    studioPlaceholder: string;
    interestLabel: string;
    interests: {
      info: string;
      demo: string;
      order: string;
    };
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    sentTitle: string;
    sentBody: string;
    directLabel: string;
  };
  footer: {
    tagline: string;
    rights: string;
  };
}

export const translations: Record<Lang, Translations> = {
  it: {
    nav: {
      overview: 'Panoramica',
      hardware: 'Controlli',
      soundLab: 'Sound Lab',
      specs: 'Specifiche',
      about: 'Orage',
      contact: 'Contatti',
      cta: 'Richiedi Info',
    },
    hero: {
      headline: 'Saturazione analogica, scolpita nell’alluminio.',
      subheadline:
        'Evolver Overdrive è un saturatore hardware stereo 1U progettato per il workflow ibrido moderno. Calore armonico reale, filtri musicali a 3 dB/oct e controllo parallelo nativo.',
      primaryCta: 'Esplora i controlli',
      secondaryCta: 'Richiedi una prova',
      scrollHint: 'Scorri per esplorare',
      rackLabel: '1U 19" STEREO ANALOG OUTBOARD',
      editionLabel: 'ALLUMINIO EDITION',
    },
    philosophy: {
      title: 'Costruito per dare peso, aria e carattere senza distruggere il mix.',
      lead: 'Dalla leggera collosità armonica sul mix bus fino all’overdrive spinto su synth, basso e batterie: Evolver risponde alla dinamica del segnale con la naturalezza della circuitazione discreta.',
      pillars: [
        {
          title: 'Due anime di saturazione',
          description:
            'Dal colore caldo e trasparente alla saturazione ricca di armoniche grazie allo switch EVOLVE, capace di spingere il carattere fino al 25% di THD al massimo drive.',
          metric: '0,003% → 25% THD',
        },
        {
          title: 'Filtri scolpiti a 3 dB/oct',
          description:
            'Low Cut (0–1 kHz) e Hi Cut (600 Hz–22 kHz) con pendenza dolcissima da 3 dB/ottava per sagomare la saturazione senza introdurre durezza o rotazioni di fase invasive.',
          metric: '3 dB/oct SLOPE',
        },
        {
          title: 'Parallelo nativo & Blend Off',
          description:
            'Manopola MIX continua da Dry a Wet per preservare i transienti originali, più tasto BLEND OFF per escludere il circuito di miscelazione quando vuoi il 100% di segnale puro.',
          metric: 'TRUE PARALLEL',
        },
      ],
    },
    hardware: {
      title: 'Ogni controllo al posto giusto.',
      subtitle:
        'Seleziona una sezione sul pannello frontale in alluminio spazzolato per scoprire come Evolver modella il segnale dall’ingresso bilanciato fino all’uscita.',
      hint: 'Clicca o passa su una sezione del rack',
      rearTitle: 'Pannello Posteriore Bilanciato',
      rearSubtitle:
        'Integrazione immediata con patchbay, convertitori e console da studio in configurazione stereo o mono.',
      rearSpecs: [
        { label: 'Balanced INPUT', detail: '2× Jack TRS (Mono/Left, Right)' },
        { label: 'Balanced OUTPUT', detail: '2× Jack TRS (Mono/Left, Right)' },
        { label: 'Alimentazione', detail: 'DC 14V · 400 mA dedicata' },
      ],
      interactiveLabel: 'SEZIONE SELEZIONATA',
      signalPath: 'PERCORSO SEGNALE',
    },
    gallery: {
      title: 'Alluminio lavorato, pensato per il rack.',
      subtitle:
        'Scocca 1U in alluminio con serigrafia ad alto contrasto, manopole tattili e metering LED L/R leggibile anche nella penombra della regia.',
      captions: {
        angularBlack: 'Profilo 1U in alluminio spazzolato con LED di stato L/R e switch Power metallico',
        angularOrange: 'Contrasto iconico Orage: precisione industriale e calore analogico',
        dualOrange: 'Doppio modulo Evolver: identità visiva immediata in ogni setup da studio',
        rackFront: 'Layout simmetrico da sinistra a destra: Gain, Drive, Filtri, Output e Mix',
      },
    },
    soundLab: {
      title: 'Ascolta l’Evolver in azione.',
      subtitle:
        'Preferiamo farti sentire solo riprese autentiche registrate attraverso l’hardware reale, senza emulazioni digitali.',
      bypassLabel: 'BYPASS (DRY)',
      engagedLabel: 'EVOLVER (WET)',
      comingSoonTitle: 'Sessioni audio A/B in preparazione',
      comingSoonBody:
        'Stiamo finalizzando le nuove registrazioni comparative Dry / Wet della versione in alluminio su drum bus, basso, synth e chitarre. Vuoi ascoltarlo in anteprima o provarlo direttamente nel tuo studio?',
      comingSoonCta: 'Prenota una demo in studio',
      sources: [
        { id: 'drums', name: 'Drum Bus', note: 'Punch parallelo + Evolve leggero' },
        { id: 'bass', name: 'Analog Bass', note: 'Drive medio + Low Cut 3 dB/oct' },
        { id: 'synth', name: 'Poly Synth', note: 'Calore armonico + Hi Cut morbido' },
        { id: 'mixbus', name: 'Mix Bus', note: 'Colla analogica 20% Wet' },
      ],
    },
    specs: {
      title: 'Specifiche Tecniche',
      subtitle: 'Evolver Overdrive — Versione Alluminio 1U',
      groups: [
        {
          category: 'Architettura & Audio',
          items: [
            { label: 'Formato Rack', value: '19" · 1 Unità (1U)' },
            { label: 'Risposta in frequenza', value: '20 Hz – 20 kHz' },
            { label: 'Distorsione Armonica (THD)', value: '0,003% (Dry) · fino a 25% (Max Drive)' },
            { label: 'Livello nominale ottimale', value: '0 dBVu (Audio Pro +4 dBu)' },
            { label: 'Gain in ingresso', value: 'Regolabile fino a +9 dB + Switch PAD' },
            { label: 'Metering', value: 'VU LED L/R dedicati su Input e Output' },
          ],
        },
        {
          category: 'Controlli & Filtri',
          items: [
            { label: 'Stadio Drive', value: 'Regolazione continua 0–10 + Dual LED' },
            { label: 'Switch EVOLVE', value: 'Cambio carattere / marcia di saturazione' },
            { label: 'Filtro Low Cut', value: '0 – 1 kHz · Pendenza 3 dB/oct' },
            { label: 'Filtro Hi Cut', value: '600 Hz – 22 kHz · Pendenza 3 dB/oct' },
            { label: 'Sezione Mix', value: 'Dry/Wet continuo + Switch BLEND OFF' },
            { label: 'Bypass', value: 'Hardware Bypass dedicato con LED' },
          ],
        },
        {
          category: 'Connessioni & Alimentazione',
          items: [
            { label: 'Ingressi', value: '2× Jack TRS bilanciati (Mono/L, R)' },
            { label: 'Uscite', value: '2× Jack TRS bilanciati (Mono/L, R)' },
            { label: 'Alimentazione', value: 'DC 14V · 400 mA' },
            { label: 'Scocca', value: 'Alluminio lavorato · Pannello serigrafato' },
          ],
        },
      ],
    },
    about: {
      title: 'Dove l’ingegneria incontra il carattere.',
      paragraphs: [
        'Orage Audio nasce dalla passione ostinata per il suono analogico e dalla voglia di progettare outboard concreti, costruiti senza compromessi per chi lavora ogni giorno in studio.',
        'L’Evolver è il nostro primo manifesto: unisce il calore e la tridimensionalità delle macchine vintage con il controllo chirurgico richiesto dalle produzioni moderne. Ogni unità viene progettata, assemblata e calibrata con attenzione artigianale in Italia.',
        'La nostra visione guarda oltre il singolo prodotto: continuiamo a ricercare nuove architetture analogiche e ibride per creare strumenti che ispirino musicisti, producer e mix engineer.',
      ],
      manifesto: 'Innovazione, nostalgia e suono vero — senza scorciatoie.',
      location: 'Progettato e costruito in Italia',
    },
    contact: {
      title: 'Porta Evolver nel tuo studio.',
      subtitle:
        'Scrivici per disponibilità, specifiche personalizzate o per prenotare una sessione di prova. Ti risponderemo direttamente noi, senza intermediari.',
      nameLabel: 'Nome',
      namePlaceholder: 'Il tuo nome',
      emailLabel: 'Email',
      emailPlaceholder: 'tuo@studio.com',
      studioLabel: 'Studio / Progetto (opzionale)',
      studioPlaceholder: 'Es. Mastering Lab, Producer...',
      interestLabel: 'Cosa ti interessa?',
      interests: {
        info: 'Informazioni e disponibilità',
        demo: 'Prova in studio / Demo',
        order: 'Prenotazione unità',
      },
      messageLabel: 'Messaggio',
      messagePlaceholder: 'Raccontaci il tuo setup o cosa vorresti sapere su Evolver...',
      submit: 'Invia richiesta',
      sentTitle: 'Richiesta pronta!',
      sentBody:
        'Si è aperto il tuo client email con il messaggio precompilato. Se preferisci, scrivici direttamente su Instagram o via email.',
      directLabel: 'Contatto diretto',
    },
    footer: {
      tagline: 'Outboard analogico artigianale. Progettato per durare.',
      rights: 'Tutti i diritti riservati.',
    },
  },
  en: {
    nav: {
      overview: 'Overview',
      hardware: 'Controls',
      soundLab: 'Sound Lab',
      specs: 'Specs',
      about: 'Orage',
      contact: 'Contact',
      cta: 'Inquire',
    },
    hero: {
      headline: 'Analog saturation, sculpted in aluminum.',
      subheadline:
        'Evolver Overdrive is a 1U stereo hardware saturator engineered for modern hybrid studios. True harmonic warmth, musical 3 dB/oct filters, and native parallel blend.',
      primaryCta: 'Explore the hardware',
      secondaryCta: 'Book a studio demo',
      scrollHint: 'Scroll to explore',
      rackLabel: '1U 19" STEREO ANALOG OUTBOARD',
      editionLabel: 'ALUMINUM EDITION',
    },
    philosophy: {
      title: 'Built to add weight, air, and attitude without collapsing your mix.',
      lead: 'From subtle mix-bus glue to bold harmonic overdrive on synths, bass, and drums, Evolver reacts to your dynamics with unmistakable discrete analog feel.',
      pillars: [
        {
          title: 'Two saturation voices',
          description:
            'Move effortlessly from warm, transparent coloration to harmonically dense overdrive via the EVOLVE switch, pushing up to 25% THD at maximum drive.',
          metric: '0.003% → 25% THD',
        },
        {
          title: 'Gentle 3 dB/oct filters',
          description:
            'Variable Low Cut (0–1 kHz) and Hi Cut (600 Hz–22 kHz) with an ultra-musical 3 dB/octave slope to shape the wet signal without harsh phase artifacts.',
          metric: '3 dB/oct SLOPE',
        },
        {
          title: 'Native parallel & Blend Off',
          description:
            'Continuous Dry-to-Wet MIX control preserves transient punch, while BLEND OFF removes the blend stage from the path when you want pure 100% wet signal.',
          metric: 'TRUE PARALLEL',
        },
      ],
    },
    hardware: {
      title: 'Every control where your hands expect it.',
      subtitle:
        'Select any section on the brushed aluminum faceplate to explore how Evolver shapes your signal from balanced input to output.',
      hint: 'Click or hover any rack section',
      rearTitle: 'Balanced Rear I/O',
      rearSubtitle:
        'Seamless integration with studio patchbays, converters, and consoles in stereo or mono operation.',
      rearSpecs: [
        { label: 'Balanced INPUT', detail: '2× TRS Jack (Mono/Left, Right)' },
        { label: 'Balanced OUTPUT', detail: '2× TRS Jack (Mono/Left, Right)' },
        { label: 'Power Supply', detail: 'Dedicated DC 14V · 400 mA' },
      ],
      interactiveLabel: 'SELECTED SECTION',
      signalPath: 'SIGNAL PATH',
    },
    gallery: {
      title: 'Machined aluminum, built for the rack.',
      subtitle:
        '1U aluminum chassis with high-contrast faceplate lettering, tactile fluted knobs, and dual L/R LED metering designed for dimly lit control rooms.',
      captions: {
        angularBlack: '1U brushed aluminum profile with L/R status LEDs and chrome Power toggle',
        angularOrange: 'Signature Orage contrast: industrial precision meets analog warmth',
        dualOrange: 'Dual Evolver units: unmistakable presence in any studio rack',
        rackFront: 'Intuitive left-to-right workflow: Gain, Drive, Filters, Output, and Mix',
      },
    },
    soundLab: {
      title: 'Hear Evolver in action.',
      subtitle:
        'We only showcase real recordings tracked through the physical hardware — never digital emulations.',
      bypassLabel: 'BYPASS (DRY)',
      engagedLabel: 'EVOLVER (WET)',
      comingSoonTitle: 'A/B studio audio sessions coming soon',
      comingSoonBody:
        'We are finalizing fresh Dry / Wet comparative captures of the Aluminum Edition across drum bus, bass, synths, and guitars. Want an early listen or a hands-on trial?',
      comingSoonCta: 'Request a studio demo',
      sources: [
        { id: 'drums', name: 'Drum Bus', note: 'Parallel punch + subtle Evolve' },
        { id: 'bass', name: 'Analog Bass', note: 'Medium Drive + 3 dB/oct Low Cut' },
        { id: 'synth', name: 'Poly Synth', note: 'Harmonic sheen + smooth Hi Cut' },
        { id: 'mixbus', name: 'Mix Bus', note: 'Analog glue at 20% Wet' },
      ],
    },
    specs: {
      title: 'Technical Specifications',
      subtitle: 'Evolver Overdrive — 1U Aluminum Edition',
      groups: [
        {
          category: 'Architecture & Audio',
          items: [
            { label: 'Rack Format', value: '19" · 1U Chassis' },
            { label: 'Frequency Response', value: '20 Hz – 20 kHz' },
            { label: 'Total Harmonic Distortion', value: '0.003% (Dry) · up to 25% (Max Drive)' },
            { label: 'Optimal Operating Level', value: '0 dBVu (+4 dBu Pro Audio)' },
            { label: 'Input Gain', value: 'Variable up to +9 dB + PAD Switch' },
            { label: 'Metering', value: 'Dedicated L/R LED meters on Input & Output' },
          ],
        },
        {
          category: 'Controls & Tone Shaping',
          items: [
            { label: 'Drive Stage', value: 'Continuous 0–10 + Dual Clipping LEDs' },
            { label: 'EVOLVE Switch', value: 'Dual-stage saturation character shift' },
            { label: 'Low Cut Filter', value: '0 – 1 kHz · 3 dB/oct slope' },
            { label: 'Hi Cut Filter', value: '600 Hz – 22 kHz · 3 dB/oct slope' },
            { label: 'Mix Section', value: 'Continuous Dry/Wet + BLEND OFF switch' },
            { label: 'Bypass', value: 'Dedicated Hardware Bypass with LED' },
          ],
        },
        {
          category: 'Connectivity & Power',
          items: [
            { label: 'Inputs', value: '2× Balanced TRS Jacks (Mono/L, R)' },
            { label: 'Outputs', value: '2× Balanced TRS Jacks (Mono/L, R)' },
            { label: 'Power Supply', value: 'DC 14V · 400 mA' },
            { label: 'Enclosure', value: 'Brushed aluminum faceplate & 1U chassis' },
          ],
        },
      ],
    },
    about: {
      title: 'Where engineering meets soul.',
      paragraphs: [
        'Orage Audio was born from an obsessive love for analog sound and a clear goal: designing honest, no-compromise outboard gear built for everyday studio work.',
        'Evolver is our first statement — blending the warmth and depth of classic hardware with the surgical control modern productions demand. Every unit is engineered, assembled, and calibrated by hand in Italy.',
        'Our mission goes beyond a single box: we keep exploring analog and hybrid architectures to build instruments that inspire musicians, producers, and mix engineers.',
      ],
      manifesto: 'Innovation, nostalgia, and real sound — no shortcuts.',
      location: 'Designed & Handbuilt in Italy',
    },
    contact: {
      title: 'Bring Evolver into your rack.',
      subtitle:
        'Reach out for availability, technical questions, or to schedule a studio trial. You will talk directly with the people who build it.',
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      emailPlaceholder: 'you@studio.com',
      studioLabel: 'Studio / Role (optional)',
      studioPlaceholder: 'e.g. Mastering Engineer, Producer...',
      interestLabel: 'What are you interested in?',
      interests: {
        info: 'Availability & information',
        demo: 'Studio trial / Demo',
        order: 'Reserve a unit',
      },
      messageLabel: 'Message',
      messagePlaceholder: 'Tell us about your setup or what you would like to know about Evolver...',
      submit: 'Send inquiry',
      sentTitle: 'Inquiry ready!',
      sentBody:
        'Your email client opened with a pre-filled message. You can also reach us directly on Instagram or via email.',
      directLabel: 'Direct channels',
    },
    footer: {
      tagline: 'Handcrafted analog outboard. Built to last.',
      rights: 'All rights reserved.',
    },
  },
};
