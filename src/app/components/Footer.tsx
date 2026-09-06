import { useEffect, useRef, useState } from 'react';
import logo from '../../assets/logo.webp';
import { Facebook, Instagram, MapPin, Clock, MessageCircle } from 'lucide-react';
import { business, whatsappUrl } from '../data/business';

export function Footer() {
  const year = new Date().getFullYear();
  const [openLegal, setOpenLegal] = useState<'aviso' | 'privacidad' | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // Dialogo legal accesible: cierra con Esc, bloquea el scroll de fondo,
  // mantiene el foco dentro y lo devuelve al boton de origen al cerrar.
  useEffect(() => {
    if (!openLegal) return;

    lastFocused.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector<HTMLElement>('button')?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenLegal(null);
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;

      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      lastFocused.current?.focus();
    };
  }, [openLegal]);

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
          Visítanos en {business.street} · Abrimos de lunes a sábado
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
            href={business.instagram}
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
                alt="Logotipo de Carnicería Raúl Oliver"
                width={50}
                height={50}
                loading="lazy"
                decoding="async"
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
                { href: business.facebook, Icon: Facebook, color: '#1877f2' },
                { href: business.instagram, Icon: Instagram, color: '#e1306c' },
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
                  {business.street}<br />
                  {business.locality}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <Clock size={15} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem' }}>L–V: 9:00–14:00 / 17:00–20:30<br />Sáb: 9:00–14:30</span>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <MessageCircle size={15} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-gold)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                >
                  WhatsApp {business.phoneDisplay}
                </a>
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
          gap: '1rem',
        }}>
          <p style={{ fontSize: '0.78rem' }}>
            © {year} Carnicería Raúl Oliver · Todos los derechos reservados
          </p>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <button
              onClick={() => setOpenLegal('aviso')}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.65)', fontSize: '0.78rem', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
            >
              Aviso Legal
            </button>
            <button
              onClick={() => setOpenLegal('privacidad')}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.65)', fontSize: '0.78rem', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
            >
              Política de Privacidad
            </button>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)' }}>
            Lora del Río, Sevilla · Desde 1999 · Desarrollado por <a href="https://portfolio-javieroliver-web.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'underline', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}>Francisco Javier Párraga Oliver</a>
          </p>
        </div>
      </div>

      {/* Legal Modals */}
      {openLegal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1.5rem',
        }} onClick={() => setOpenLegal(null)}>
          <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="legal-title" style={{
            background: 'var(--color-cream)',
            color: 'var(--color-charcoal)',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto',
            borderRadius: '8px',
            padding: '2.5rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            position: 'relative',
          }} onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setOpenLegal(null)}
              aria-label="Cerrar"
              style={{
                position: 'absolute',
                top: '1rem', right: '1rem',
                background: 'none', border: 'none',
                fontSize: '1.8rem', cursor: 'pointer',
                color: 'var(--color-charcoal)',
                opacity: 0.7,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
            >
              ×
            </button>
            {openLegal === 'aviso' ? (
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '1.25rem', borderBottom: '2px solid var(--color-red)', paddingBottom: '0.5rem', color: 'var(--color-charcoal)' }} id="legal-title">Aviso Legal</h3>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem', color: 'var(--color-gray-600)' }}>
                  En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se exponen los siguientes datos identificativos del titular de este sitio web:
                </p>
                <ul style={{ fontSize: '0.85rem', lineHeight: 1.8, marginBottom: '1.5rem', paddingLeft: '1.2rem', color: 'var(--color-gray-600)', listStyleType: 'disc' }}>
                  <li><strong>Titular:</strong> Raúl Oliver Sánchez</li>
                  <li><strong>NIF/NIE:</strong> 14622915K</li>
                  <li><strong>Domicilio Social:</strong> C/ Anea, 12, 41440 Lora del Río, Sevilla</li>
                  <li><strong>Teléfono:</strong> {business.phoneDisplay}</li>
                  <li><strong>Email:</strong> {business.email}</li>
                </ul>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-charcoal)' }}>1. Propiedad Intelectual</h4>
                <p style={{ fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '1rem', color: 'var(--color-gray-600)' }}>
                  El código fuente, los diseños gráficos, las imágenes, las fotografías, las animaciones, los textos, así como la información y los contenidos de esta web están protegidos por la legislación española sobre los derechos de propiedad intelectual e industrial a favor del titular.
                </p>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-charcoal)' }}>2. Limitación de Responsabilidad</h4>
                <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--color-gray-600)' }}>
                  El titular no se hace responsable de los daños derivados del uso de los contenidos del sitio web o de incidencias en la disponibilidad del servicio.
                </p>
              </div>
            ) : (
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '1.25rem', borderBottom: '2px solid var(--color-red)', paddingBottom: '0.5rem', color: 'var(--color-charcoal)' }} id="legal-title">Política de Privacidad</h3>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem', color: 'var(--color-gray-600)' }}>
                  De conformidad con lo dispuesto en el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), te informamos de cómo tratamos tus datos personales:
                </p>
                <ul style={{ fontSize: '0.85rem', lineHeight: 1.8, marginBottom: '1.5rem', paddingLeft: '1.2rem', color: 'var(--color-gray-600)', listStyleType: 'disc' }}>
                  <li><strong>Responsable del Tratamiento:</strong> Raúl Oliver Sánchez</li>
                  <li><strong>Finalidad:</strong> Atender las consultas de información o solicitudes realizadas mediante contacto telefónico, WhatsApp o redes sociales.</li>
                  <li><strong>Legitimación:</strong> Consentimiento del interesado al ponerse en contacto directo con el establecimiento.</li>
                  <li><strong>Conservación:</strong> Los datos se conservarán durante el tiempo estrictamente necesario para responder y gestionar la consulta.</li>
                  <li><strong>Destinatarios:</strong> No se cederán datos a terceros, salvo obligación legal.</li>
                </ul>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-charcoal)' }}>Tus Derechos</h4>
                <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--color-gray-600)' }}>
                  Puedes ejercer tus derechos de acceso, rectificación, supresión y limitación del tratamiento escribiendo a la dirección del responsable o a través de los datos de contacto facilitados.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
