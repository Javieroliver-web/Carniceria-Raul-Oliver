/**
 * Datos de contacto y horario del negocio.
 * Fuente única: si cambia un teléfono o un horario, se cambia aquí y se
 * actualiza en toda la web (cabecera, contacto, pie y botón de WhatsApp).
 *
 * El horario de `index.html` (JSON-LD para Google) debe mantenerse en sintonía
 * con `openingHours` de este fichero.
 */

const MAPS_QUERY = 'Calle José Montoto y González de Hoyuela 6, Lora del Río, Sevilla';

export const business = {
  name: 'Carnicería y Charcutería Raúl Oliver',
  phone: '+34625468165',
  phoneDisplay: '+34 625 468 165',
  /** Número en formato wa.me (sin + ni espacios). */
  whatsapp: '34625468165',
  whatsappMessage: 'Hola, me gustaría hacer una consulta sobre un pedido.',
  email: 'rauloliver81@icloud.com',
  street: 'C/ José Montoto y González de Hoyuela, 6',
  locality: '41440 – Lora del Río, Sevilla',
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`,
  mapsEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&t=&z=17&ie=UTF8&iwloc=&output=embed`,
  facebook: 'https://www.facebook.com/people/Carnicer%C3%ADa-raul-Oliver/100057560074868/',
  instagram: 'https://www.instagram.com/carniceria_raul_oliver/',
} as const;

export const whatsappUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(business.whatsappMessage)}`;

/** Tramos de apertura por día de la semana (0 = domingo), en hora local de Madrid. */
type Interval = { open: string; close: string };

const WEEKDAY_HOURS: Interval[] = [
  { open: '09:00', close: '14:00' },
  { open: '17:00', close: '20:30' },
];

export const openingHours: Record<number, Interval[]> = {
  0: [],
  1: WEEKDAY_HOURS,
  2: WEEKDAY_HOURS,
  3: WEEKDAY_HOURS,
  4: WEEKDAY_HOURS,
  5: WEEKDAY_HOURS,
  6: [{ open: '09:00', close: '14:30' }],
};

/** Horario tal y como se muestra en la web. */
export const schedule = [
  { day: 'Lunes – Viernes', hours: '9:00 – 14:00 / 17:00 – 20:30' },
  { day: 'Sábados', hours: '9:00 – 14:30' },
  { day: 'Domingos', hours: 'Cerrado' },
];

const DAY_NAMES = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

const pretty = (hhmm: string) => hhmm.replace(/^0/, '');

/**
 * Hora actual en Lora del Río, independientemente de la zona horaria del
 * visitante (un cliente mirando la web desde el extranjero vería mal el estado).
 */
function nowInMadrid(now: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Madrid',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) => parts.find(p => p.type === type)?.value ?? '';
  const weekdays: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  return {
    day: weekdays[get('weekday')] ?? now.getDay(),
    minutes: (Number(get('hour')) % 24) * 60 + Number(get('minute')),
  };
}

export type OpenState = { open: boolean; label: string };

/** Estado de apertura ("Abierto ahora", "Cerrado · abre el lunes a las 9:00"). */
export function getOpenState(now: Date = new Date()): OpenState {
  const { day, minutes } = nowInMadrid(now);

  for (const slot of openingHours[day] ?? []) {
    if (minutes >= toMinutes(slot.open) && minutes < toMinutes(slot.close)) {
      return { open: true, label: `Abierto ahora · cierra a las ${pretty(slot.close)}` };
    }
  }

  // Siguiente apertura: hoy más tarde o en alguno de los próximos 7 días.
  for (let offset = 0; offset < 8; offset++) {
    const d = (day + offset) % 7;
    for (const slot of openingHours[d] ?? []) {
      if (offset > 0 || minutes < toMinutes(slot.open)) {
        const when =
          offset === 0 ? 'hoy' : offset === 1 ? 'mañana' : `el ${DAY_NAMES[d]}`;
        return { open: false, label: `Cerrado · abre ${when} a las ${pretty(slot.open)}` };
      }
    }
  }

  return { open: false, label: 'Cerrado ahora mismo' };
}
