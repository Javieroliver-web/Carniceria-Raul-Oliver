import { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#inicio',    label: 'Inicio' },
  { href: '#productos', label: 'Productos' },
  { href: '#nosotros',  label: 'Nosotros' },
  { href: '#contacto',  label: 'Contacto' },
];

/** Typographic logo — always crisp and readable on any dark background */
function BrandLogo() {
  return (
    <a href="#inicio" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
      <span style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.45rem',
        fontWeight: 700,
        color: '#ffffff',
        letterSpacing: '-0.01em',
      }}>
        Raúl Oliver
      </span>
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.6rem',
        fontWeight: 600,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--color-gold)',
        marginTop: '2px',
      }}>
        Carnicería · Charcutería
      </span>
    </a>
  );
}

export function Header() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.4s ease',
          background: scrolled
            ? 'rgba(15,15,15,0.97)'
            : 'linear-gradient(to bottom, rgba(0,0,0,0.70) 0%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(200,151,58,0.2)' : 'none',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>

            <BrandLogo />

            {/* Desktop nav */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="hidden-mobile">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    color: 'rgba(255,255,255,0.88)',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    letterSpacing: '0.05em',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-gold)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.88)')}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:+34955"
                className="btn-primary"
                style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}
              >
                <Phone size={15} />
                Llamar
              </a>
            </nav>

            {/* Hamburger */}
            <button
              className={`hamburger${mobileOpen ? ' open' : ''}`}
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Menú"
              style={{ display: 'none' }}
              id="hamburger-btn"
            >
              {mobileOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
        <button
          onClick={closeMenu}
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <X size={28} color="white" />
        </button>
        <div style={{ marginBottom: '0.5rem' }}>
          <BrandLogo />
        </div>
        {navLinks.map(link => (
          <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>
        ))}
        <a href="tel:+34955" className="btn-primary" onClick={closeMenu}>
          <Phone size={16} /> Llamar ahora
        </a>
      </div>

      <style>{`
        @media (min-width: 769px) { #hamburger-btn { display: none !important; } }
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } #hamburger-btn { display: flex !important; } }
      `}</style>
    </>
  );
}
