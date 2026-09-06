import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Clock, Instagram, Facebook, Mail, MessageCircle, Navigation } from 'lucide-react';
import { business, getOpenState, schedule, whatsappUrl } from '../data/business';

const iconCircle = {
  width: '44px',
  height: '44px',
  background: 'rgba(192,57,43,0.08)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
} as const;

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [openState, setOpenState] = useState(() => getOpenState());

  // El estado depende de la hora: se refresca cada minuto para que no se quede
  // "Abierto" en una pestaña que lleva horas abierta.
  useEffect(() => {
    const id = window.setInterval(() => setOpenState(getOpenState()), 60_000);
    return () => window.clearInterval(id);
  }, []);

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
              <div style={iconCircle}>
                <MapPin size={20} color="var(--color-red)" />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-charcoal)', marginBottom: '0.25rem' }}>Dirección</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--color-gray-600)', lineHeight: 1.6 }}>
                  {business.street}<br />
                  {business.locality}
                </div>
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.75rem', alignItems: 'flex-start' }}>
              <div style={iconCircle}>
                <Phone size={20} color="var(--color-red)" />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-charcoal)', marginBottom: '0.25rem' }}>Teléfono</div>
                <a
                  href={`tel:${business.phone}`}
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
                  {business.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Email */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.75rem', alignItems: 'flex-start' }}>
              <div style={iconCircle}>
                <Mail size={20} color="var(--color-red)" />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-charcoal)', marginBottom: '0.25rem' }}>Email</div>
                <a
                  href={`mailto:${business.email}`}
                  style={{ fontSize: '0.88rem', color: 'var(--color-red)', fontWeight: 600, textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-red-dark)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-red)')}
                >
                  {business.email}
                </a>
              </div>
            </div>

            {/* Schedule */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'flex-start' }}>
              <div style={iconCircle}>
                <Clock size={20} color="var(--color-red)" />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-charcoal)', marginBottom: '0.5rem' }}>Horario</div>
                <div
                  className="open-badge"
                  data-state={openState.open ? 'open' : 'closed'}
                  style={{ marginBottom: '0.75rem' }}
                  role="status"
                >
                  <span className="dot" />
                  {openState.label}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {schedule.map(({ day, hours }) => (
                    <div key={day} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                      <span style={{ fontSize: '0.82rem', color: 'var(--color-gray-600)', fontWeight: 500 }}>{day}</span>
                      <span style={{ fontSize: '0.82rem', color: hours === 'Cerrado' ? 'var(--color-gray-600)' : 'var(--color-charcoal)', fontWeight: 600 }}>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Acciones rápidas */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: '0.7rem 1.3rem', fontSize: '0.88rem', background: '#25d366', borderColor: '#25d366', color: '#08361a' }}
              >
                <MessageCircle size={16} />
                Escribir por WhatsApp
              </a>
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.7rem 1.3rem',
                  border: '2px solid var(--color-charcoal)',
                  color: 'var(--color-charcoal)',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-charcoal)'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-charcoal)'; }}
              >
                <Navigation size={16} />
                Cómo llegar
              </a>
            </div>

            {/* Social */}
            <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--color-gray-200)' }}>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-charcoal)', marginBottom: '0.75rem' }}>
                Síguenos en redes sociales
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <a
                  href={business.facebook}
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
                  href={business.instagram}
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
              src={business.mapsEmbedUrl}
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
