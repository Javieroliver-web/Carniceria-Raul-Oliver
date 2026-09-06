/**
 * Genera los assets optimizados que consume la web a partir de los
 * originales de `src/imports/`.
 *
 *   npm run images
 *
 * Salidas:
 *   src/assets/*.webp   → imágenes que importan los componentes
 *   public/*            → favicons e imagen de Open Graph
 *
 * Los originales se conservan como fuente: si se sustituye una foto,
 * se reemplaza en `src/imports/` y se vuelve a ejecutar el script.
 */
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'src/imports');
const assets = path.join(root, 'src/assets');
const publicDir = path.join(root, 'public');

/** Fotos de producto: se muestran en tarjetas de ~380px (760px en pantallas 2x). */
const products = ['Ternera', 'Cerdo', 'Cordero', 'Aves', 'Elaborados', 'jamon'];

const manifest = {};

async function toWebp(input, output, width, quality = 70) {
  const info = await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(output);
  manifest[path.basename(output)] = { width: info.width, height: info.height, bytes: info.size };
  return info;
}

await mkdir(assets, { recursive: true });
await mkdir(publicDir, { recursive: true });

for (const name of products) {
  await toWebp(path.join(src, `${name}.jpg`), path.join(assets, `${name}.webp`), 800);
}

await toWebp(path.join(src, 'Raul-oliver.jpg'), path.join(assets, 'Raul-oliver.webp'), 1000, 80);
await toWebp(path.join(src, 'image.png'), path.join(assets, 'logo.webp'), 300, 90);

// Favicons e icono de aplicación a partir del logo.
for (const [file, size] of [['favicon-32.png', 32], ['favicon-192.png', 192], ['apple-touch-icon.png', 180]]) {
  const info = await sharp(path.join(src, 'image.png'))
    .resize(size, size, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, file));
  manifest[file] = { width: info.width, height: info.height, bytes: info.size };
}

// Imagen para compartir en WhatsApp / Facebook (1200x630 es el estándar).
const og = await sharp(path.join(src, 'Elaborados.jpg'))
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 78, mozjpeg: true })
  .toFile(path.join(publicDir, 'og-image.jpg'));
manifest['og-image.jpg'] = { width: og.width, height: og.height, bytes: og.size };

// Deja constancia de los tamaños intrínsecos para los atributos width/height.
await writeFile(path.join(assets, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

const originals = await readdir(src);
let before = 0;
for (const f of originals) {
  before += (await stat(path.join(src, f))).size;
}
const after = Object.values(manifest).reduce((n, m) => n + m.bytes, 0);

for (const [name, m] of Object.entries(manifest)) {
  console.log(`${name.padEnd(24)} ${String(m.width).padStart(5)}x${String(m.height).padEnd(5)} ${(m.bytes / 1024).toFixed(0)} kB`);
}
console.log(`\noriginales: ${(before / 1024).toFixed(0)} kB → generados: ${(after / 1024).toFixed(0)} kB`);
