import { useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import raulPhoto from '../../assets/Raul-oliver.webp';

const highlights = [
  'Más de 25 años sirviendo a Lora del Río y alrededores',
  'Carnicería y charcutería bajo el mismo techo',
  'Elaborados artesanales con recetas propias',
  'Asesoramiento personalizado en cada visita',
  'Selección de ibéricos de primera calidad',
  'Cortes a medida para hostelería y particulares',
];

const stats = [
  { num: '1999', label: 'Año de apertura' },
  { num: '+25', label: 'Años de experiencia' },
  { num: '100%', label: 'Fresco cada día' },
];

export function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="nosotros"
      ref={ref}
      className="section-pad"
      style={{ background: 'var(--color-white)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Section header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-label">Quiénes somos</span>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
            color: 'var(--color-charcoal)',
            marginTop: '0.75rem',
          }}>
            El maestro detrás de cada corte
          </h2>
          <div className="gold-line gold-line-center" />
        </div>

        <div className="about-grid">

          {/* Photo + badge */}
          <div className="reveal" style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 30px 70px rgba(0,0,0,0.18)',
              lineHeight: 0,
            }}>
              <img
                src={raulPhoto}
                alt="Raúl Oliver, maestro carnicero, en su carnicería de Lora del Río"
                width={1000}
                height={1333}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>



            {/* Side caption */}
            <div style={{
              marginTop: '2.5rem',
              padding: '1.25rem 1.5rem',
              background: 'var(--color-charcoal)',
              borderRadius: '6px',
              borderLeft: '4px solid var(--color-gold)',
            }}>
              <p style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.6,
              }}>
                "Cada pieza que sale de mis manos lleva el mismo cuidado y pasión de siempre. Eso es lo que
                nos diferencia desde 1999."
              </p>
              <p style={{
                marginTop: '0.75rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--color-gold)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                — Raúl Oliver, Maestro carnicero
              </p>
            </div>
          </div>

          {/* Text content */}
          <div className="reveal">
            <span className="section-label">Nuestra historia</span>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
              color: 'var(--color-charcoal)',
              marginTop: '0.75rem',
              marginBottom: '0.5rem',
            }}>
              Tradición familiar en<br />
              <em style={{ color: 'var(--color-red)', fontStyle: 'italic' }}>Lora del Río</em>
            </h3>
            <div className="gold-line" />

            <div style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
              <p style={{ color: 'var(--color-gray-600)', lineHeight: 1.85, marginBottom: '1rem', fontSize: '0.95rem' }}>
                <strong style={{ color: 'var(--color-charcoal)' }}>Raúl Oliver</strong> lleva más de dos décadas
                perfeccionando su arte. Desde que abrió las puertas de su carnicería en 1999, el local se ha
                convertido en un referente de calidad en toda la comarca sevillana.
              </p>
              <p style={{ color: 'var(--color-gray-600)', lineHeight: 1.85, marginBottom: '1rem', fontSize: '0.95rem' }}>
                Con la reciente renovación del local en la{' '}
                <strong style={{ color: 'var(--color-charcoal)' }}>C/ José Montoto y González de Hoyuela, 6</strong>,
                Raúl ha modernizado las instalaciones sin renunciar a los valores que le han hecho ganarse
                la confianza de sus clientes: producto fresco, trato cercano y precio justo.
              </p>
              <p style={{ color: 'var(--color-gray-600)', lineHeight: 1.85, fontSize: '0.95rem' }}>
                Hoy la <strong style={{ color: 'var(--color-charcoal)' }}>Carnicería y Charcutería Raúl Oliver</strong> es
                mucho más que una carnicería: es el punto de encuentro donde tradición artesanal y
                selección premium se unen para llevarte lo mejor a la mesa.
              </p>
            </div>

            {/* Checklist */}
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2.5rem' }}>
              {highlights.map(h => (
                <li key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle size={17} color="var(--color-red)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontSize: '0.88rem', color: 'var(--color-gray-600)', lineHeight: 1.55 }}>{h}</span>
                </li>
              ))}
            </ul>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--color-gray-200)',
            }}>
              {stats.map(({ num, label }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div className="stat-number">{num}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-600)', marginTop: '0.3rem', letterSpacing: '0.05em' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ marginTop: '2rem' }}>
              <a href="#contacto" className="btn-primary">
                Visítanos en el local
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
