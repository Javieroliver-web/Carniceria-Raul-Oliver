/**
 * Aviso de errores de JavaScript a Discord.
 *
 * Esta web está en GitHub Pages y no tiene servidor propio, así que los
 * errores van al receptor /api/error del portfolio (Vercel), que es quien
 * guarda la URL del webhook de Discord. Se importa lo primero en main.tsx
 * para capturar también los fallos al arrancar React.
 *
 * Si cambia el dominio de la web, hay que añadirlo a ALLOWED_ORIGINS en
 * api/error.js del portfolio o los avisos se rechazarán.
 */
const ENDPOINT = 'https://portfolio-javieroliver-web.vercel.app/api/error';
const MAX_REPORTS = 5;

type Report = { type: string; message: string; source?: string; line?: number; col?: number; stack?: string };

const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

if (!isLocal && typeof navigator.sendBeacon === 'function') {
  const seen = new Set<string>();

  const report = (data: Report) => {
    // "Script error." de otro origen no trae información; los de extensiones
    // del navegador del visitante no son fallos de la web.
    if (!data.message || data.message === 'Script error.') return;
    if (/extension:\/\//.test(`${data.source ?? ''} ${data.stack ?? ''}`)) return;

    const key = `${data.message}|${data.source}:${data.line}`;
    if (seen.has(key) || seen.size >= MAX_REPORTS) return;
    seen.add(key);

    try {
      // text/plain evita el preflight CORS.
      const body = JSON.stringify({ ...data, site: 'carniceria', page: location.href });
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'text/plain' }));
    } catch {
      // Avisar de un error nunca debe romper la web.
    }
  };

  window.addEventListener('error', e => {
    report({
      type: 'error',
      message: String(e.message ?? ''),
      source: e.filename,
      line: e.lineno,
      col: e.colno,
      stack: e.error instanceof Error ? e.error.stack : undefined,
    });
  });

  window.addEventListener('unhandledrejection', e => {
    const r = e.reason;
    report({
      type: 'promesa',
      message: String(r instanceof Error ? r.message : r ?? ''),
      stack: r instanceof Error ? r.stack : undefined,
    });
  });
}

export {};
