import { useEffect, useRef } from 'react';
import { MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react';

const schedule = [
  { day: 'Lunes – Viernes', hours: '9:00 – 14:00 / 17:00 – 20:30' },
  { day: 'Sábados',         hours: '9:00 – 14:30' },
  { day: 'Domingos',        hours: 'Cerrado' },
];

export function Contact() {
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
      id="contacto"
      ref={ref}
      style={{ background: 'var(--color-cream)', padding: '6rem 1.5rem' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-label">Dónde estamos</span>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
            color: 'var(--color-charcoal)',
            marginTop: '0.75rem',
          }}>
            Ven a visitarnos
          </h2>
          <div className="gold-line gold-line-center" />
        </div>

        <div className="contact-grid">

          {/* Info card */}
          <div className="reveal" style={{
            background: 'var(--color-white)',
            borderRadius: '8px',
            padding: '2.5rem',
            boxShadow: '0 4px 30px rgba(0,0,0,0.07)',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.4rem',
              color: 'var(--color-charcoal)',
              marginBottom: '2rem',
              paddingBottom: '1rem',
              borderBottom: '2px solid var(--color-red)',
              display: 'inline-block',
            }}>
              Información de contacto
            </h3>

            {/* Address */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.75rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '44px', height: '44px',
                background: 'rgba(192,57,43,0.08)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <MapPin size={20} color="var(--color-red)" />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-charcoal)', marginBottom: '0.25rem' }}>Dirección</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--color-gray-600)', lineHeight: 1.6 }}>
                  C/ José Montoto y González de Hoyuela, 6<br />
                  41440 – Lora del Río, Sevilla
                </div>
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.75rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '44px', height: '44px',
                background: 'rgba(192,57,43,0.08)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Phone size={20} color="var(--color-red)" />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-charcoal)', marginBottom: '0.25rem' }}>Teléfono</div>
                <a
                  href="tel:+34625468165"
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--color-red)',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-red-dark)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-red)')}
                >
                  +34 625 468 165
                </a>
              </div>
            </div>

            {/* Schedule */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '44px', height: '44px',
                background: 'rgba(192,57,43,0.08)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Clock size={20} color="var(--color-red)" />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-charcoal)', marginBottom: '0.5rem' }}>Horario</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {schedule.map(({ day, hours }) => (
                    <div key={day} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                      <span style={{ fontSize: '0.82rem', color: 'var(--color-gray-600)', fontWeight: 500 }}>{day}</span>
                      <span style={{ fontSize: '0.82rem', color: hours === 'Cerrado' ? 'var(--color-gray-400)' : 'var(--color-charcoal)', fontWeight: 600 }}>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Social */}
            <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--color-gray-200)' }}>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-charcoal)', marginBottom: '0.75rem' }}>
                Síguenos en redes sociales
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <a
                  href="https://www.facebook.com/people/Carnicer%C3%ADa-raul-Oliver/100057560074868/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '40px', height: '40px',
                    background: 'var(--color-charcoal)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white',
                    transition: 'background 0.2s, transform 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#1877f2'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--color-charcoal)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'none'; }}
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://www.instagram.com/carniceria_raul_oliver/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '40px', height: '40px',
                    background: 'var(--color-charcoal)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white',
                    transition: 'background 0.2s, transform 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#e1306c'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--color-charcoal)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'none'; }}
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="reveal" style={{
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
            height: '100%',
            minHeight: '450px',
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d-5.527305984692498!3d37.6582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0c59e5f8a3b1af%3A0xd42a5c2e1c9f2e7!2sC.%20Jos%C3%A9%20Montoto%20y%20Gonz%C3%A1lez%20de%20Hoyuela%2C%206%2C%2041440%20Lora%20del%20R%C3%ADo%2C%20Sevilla!5e0!3m2!1ses!2ses!4v1684000000000!5m2!1ses!2ses"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', minHeight: '450px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Carnicería Raúl Oliver – C/ José Montoto y González de Hoyuela 6, Lora del Río"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
