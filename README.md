# Carnicería y Charcutería Raúl Oliver

Web de la Carnicería Raúl Oliver — C/ José Montoto y González de Hoyuela, 6, Lora del Río (Sevilla).
React + Vite, una sola página estática, desplegada en GitHub Pages.

## Comandos

| Comando            | Qué hace                                                        |
| ------------------ | --------------------------------------------------------------- |
| `npm run dev`      | Servidor de desarrollo                                            |
| `npm run build`    | Comprueba tipos y genera `dist/` (incluye robots.txt y sitemap)   |
| `npm run preview`  | Sirve el `dist/` ya construido                                    |
| `npm run typecheck`| Sólo comprobación de tipos                                        |
| `npm run images`   | Regenera imágenes optimizadas, favicons e imagen de Open Graph    |

## Dónde se cambia cada cosa

- **Teléfono, dirección, email, horario y redes** → `src/app/data/business.ts`
  (el horario del JSON-LD de `index.html` debe mantenerse en sintonía).
- **Fotos** → se sustituye el original en `src/imports/` y se ejecuta `npm run images`.
  El script escribe los `.webp` que consumen los componentes en `src/assets/` y los
  iconos y la imagen para compartir en `public/`.
- **URL pública del sitio** → `SITE_URL` en `vite.config.ts`. Alimenta el canonical,
  las etiquetas Open Graph, el JSON-LD, `robots.txt` y `sitemap.xml`.

## Activar el dominio propio

Hoy la web se publica en `https://javieroliver-web.github.io/Carniceria-Raul-Oliver/`.
Para pasar a `carniceriarauloliver.es`:

1. Apuntar el DNS del dominio a GitHub Pages y activarlo en *Settings → Pages*.
2. En `vite.config.ts`: `SITE_URL = 'https://carniceriarauloliver.es'` y `base: '/'`.
3. Crear `public/CNAME` con una línea: `carniceriarauloliver.es`.

Mientras el dominio no resuelva, el canonical debe seguir apuntando a la URL de
GitHub Pages: un canonical hacia un dominio que no existe impide que Google
indexe la página.

## Despliegue

Cada `push` a `main` lanza `.github/workflows/deploy.yml`, que construye el
proyecto y lo publica en GitHub Pages.
