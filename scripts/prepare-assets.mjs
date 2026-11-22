import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC_RENDERS = 'I:\\Il mio Drive\\Sito web- INSTAGRAM\\render (foto) evolver\\render evolver alluminio\\nuova evolver';
const SRC_EVOLVER = 'I:\\Il mio Drive\\Sito web- INSTAGRAM\\evolver alluminio\\Evolver\\Evolver';
const SRC_CHISIAMO = 'I:\\Il mio Drive\\Sito web- INSTAGRAM\\render (foto) evolver\\Chi siamo';
const SRC_FONT = 'I:\\Il mio Drive\\Sito web- INSTAGRAM\\render (foto) evolver\\Chi siamo\\Fugaz_One (LOGO) FONT\\FugazOne-Regular.ttf';

const OUT_IMG = path.resolve('public/images');
const OUT_FONT = path.resolve('public/fonts');

fs.mkdirSync(OUT_IMG, { recursive: true });
fs.mkdirSync(OUT_FONT, { recursive: true });

if (fs.existsSync(SRC_FONT)) {
  fs.copyFileSync(SRC_FONT, path.join(OUT_FONT, 'FugazOne-Regular.ttf'));
  console.log('Copied FugazOne-Regular.ttf');
}

// 1. Faceplate 1U trimmed tightly
const trimmedFaceplateBuf = await sharp(path.join(SRC_RENDERS, 'FRONTALE NO SFONDO.png'))
  .trim({ threshold: 10 })
  .toBuffer();

const fpMeta = await sharp(trimmedFaceplateBuf).metadata();
console.log(`Faceplate trimmed: ${fpMeta.width}x${fpMeta.height}`);

await sharp(trimmedFaceplateBuf)
  .resize({ width: 2400, withoutEnlargement: true })
  .webp({ quality: 92 })
  .toFile(path.join(OUT_IMG, 'faceplate-1u.webp'));

// 2. Authentic workshop photo for About Orage Audio
await sharp(path.join(SRC_CHISIAMO, 'chi siamo.jpg'))
  .resize({ width: 1800, withoutEnlargement: true })
  .webp({ quality: 86 })
  .toFile(path.join(OUT_IMG, 'workshop-about.webp'));
console.log('Generated workshop-about.webp');

// 3. Macro crops from high-res angular render (5 evolver angolare con sfondo nero.png) for Apple-style Bento cards
const angularMeta = await sharp(path.join(SRC_RENDERS, '5 evolver angolare con sfondo nero.png')).metadata();
const aw = angularMeta.width ?? 1920;
const ah = angularMeta.height ?? 1080;

// Macro 1: Drive & Output LEDs close-up
await sharp(path.join(SRC_RENDERS, '5 evolver angolare con sfondo nero.png'))
  .extract({
    left: Math.round(aw * 0.14),
    top: Math.round(ah * 0.16),
    width: Math.round(aw * 0.44),
    height: Math.round(ah * 0.56),
  })
  .resize({ width: 1200 })
  .webp({ quality: 88 })
  .toFile(path.join(OUT_IMG, 'macro-leds.webp'));
console.log('Generated macro-leds.webp');

// Macro 2: Mix knob, Power toggle & EVOLVER Overdrive badge close-up
await sharp(path.join(SRC_RENDERS, '5 evolver angolare con sfondo arancio.png'))
  .extract({
    left: Math.round(aw * 0.42),
    top: Math.round(ah * 0.18),
    width: Math.round(aw * 0.44),
    height: Math.round(ah * 0.56),
  })
  .resize({ width: 1200 })
  .webp({ quality: 88 })
  .toFile(path.join(OUT_IMG, 'macro-power.webp'));
console.log('Generated macro-power.webp');

// 4. Rear panel (un-mirrored)
await sharp(path.join(SRC_EVOLVER, 'retro nuovo.png'))
  .flop()
  .trim({ threshold: 8 })
  .resize({ width: 1800, withoutEnlargement: true })
  .webp({ quality: 90 })
  .toFile(path.join(OUT_IMG, 'rear-panel.webp'));
console.log('Generated rear-panel.webp');

// 5. Full-bleed gallery & hero renders
const galleryJobs = [
  ['5 evolver angolare con sfondo nero.png', 'angular-black.webp', 1920],
  ['5 evolver angolare con sfondo arancio.png', 'angular-orange.webp', 1920],
  ['2 evo storte sfondo arancio.png', 'dual-orange.webp', 1400],
  ['5 evolver frontale con sfondo nero.png', 'rack-front-black.webp', 1800],
];

for (const [srcName, outName, width] of galleryJobs) {
  await sharp(path.join(SRC_RENDERS, srcName))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(path.join(OUT_IMG, outName));
  const sizeKb = Math.round(fs.statSync(path.join(OUT_IMG, outName)).size / 1024);
  console.log(`Generated ${outName} (${sizeKb} KB)`);
}
