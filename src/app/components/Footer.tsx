import logo from '../../imports/image.png';
import { Facebook, Instagram, MapPin, Phone, Clock } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--color-black)', color: 'rgba(255,255,255,0.7)' }}>

      {/* CTA Banner */}
      <div style={{
        background: 'var(--color-red)',
        padding: '3rem 1.5rem',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
          color: 'white',
          marginBottom: '0.75rem',
        }}>
          ¿Listo para la mejor carne de Lora del Río?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          Visítanos en C/ José Montoto y González de Hoyuela, 6 · Abrimos de lunes a sábado
        </p>
        <div className="footer-cta-btns" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="#contacto"
            style={{
              background: 'white',
              color: 'var(--color-red)',
              padding: '0.75rem 1.75rem',
              fontWeight: 700,
              textDecoration: 'none',
              borderRadius: '2px',
              fontSize: '0.9rem',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
          >
            Cómo llegar
          </a>
          <a
            href="https://www.instagram.com/carniceria_raul_oliver/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'transparent',
              color: 'white',
              padding: '0.75rem 1.75rem',
              fontWeight: 600,
              textDecoration: 'none',
              border: '2px solid rgba(255,255,255,0.6)',
              borderRadius: '2px',
              fontSize: '0.9rem',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'white'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.6)'; }}
          >
            Ver Instagram
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem 2rem' }}>
        <div className="footer-grid">

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ marginBottom: '1rem' }}>
              <img
                src={logo}
                alt="Raúl Oliver Carnicería"
                style={{
                  height: '50px',
                  width: 'auto',
                  borderRadius: '6px',
                }}
              />
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.8, maxWidth: '240px', marginBottom: '1.25rem' }}>
              Carnicería y charcutería artesanal en Lora del Río desde 1999. Tu elección de confianza.
            </p>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {[
                { href: 'https://www.facebook.com/people/Carnicer%C3%ADa-raul-Oliver/100057560074868/', Icon: Facebook, color: '#1877f2' },
                { href: 'https://www.instagram.com/carniceria_raul_oliver/', Icon: Instagram, color: '#e1306c' },
              ].map(({ href, Icon, color }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '36px', height: '36px',
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.7)',
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = color; (e.currentTarget as HTMLAnchorElement).style.color = 'white'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)'; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              color: 'white',
              marginBottom: '1.25rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid rgba(200,151,58,0.3)',
            }}>
              Navegación
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { href: '#inicio',    label: 'Inicio' },
                { href: '#productos', label: 'Productos' },
                { href: '#nosotros',  label: 'Quiénes somos' },
                { href: '#contacto',  label: 'Contacto y ubicación' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    style={{
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.55)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-gold)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                  >
                    <span style={{ width: '4px', height: '4px', background: 'var(--color-red)', borderRadius: '50%', flexShrink: 0 }} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              color: 'white',
              marginBottom: '1.25rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid rgba(200,151,58,0.3)',
            }}>
              Contacto
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <MapPin size={15} color="var(--color-gold)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', lineHeight: 1.6 }}>
                  C/ José Montoto y González de Hoyuela, 6<br />
                  41440 Lora del Río, Sevilla
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <Clock size={15} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem' }}>L–V: 9:00–14:00 / 17:00–20:30<br />Sáb: 9:00–14:30</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}>
          <p style={{ fontSize: '0.78rem' }}>
            © {year} Carnicería Raúl Oliver · Todos los derechos reservados
          </p>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>
            Lora del Río, Sevilla · Desde 1999
          </p>
        </div>
      </div>
    </footer>
  );
}
