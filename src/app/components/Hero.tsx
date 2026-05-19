import { useEffect, useRef } from 'react';
import { ChevronDown, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);

  // Slow Ken Burns parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      if (imgRef.current) {
        const y = window.scrollY * 0.35;
        imgRef.current.style.transform = `scale(1.08) translateY(${y}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="inicio"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--color-black)',
      }}
    >
      {/* Background image with parallax */}
      <div
        ref={imgRef}
        style={{
          position: 'absolute',
          inset: '-8%',
          transform: 'scale(1.08)',
          transition: 'transform 0.1s linear',
          zIndex: 0,
        }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400"
          alt="Interior Carnicería Raúl Oliver"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }}
        />
      </div>

      {/* Gradient overlays */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(15,15,15,0.85) 0%, rgba(15,15,15,0.55) 60%, rgba(192,57,43,0.15) 100%)',
        zIndex: 1,
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '200px',
        background: 'linear-gradient(to top, var(--color-black) 0%, transparent 100%)',
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        width: '100%',
        paddingTop: '100px',
      }}>
        <div style={{ maxWidth: '720px' }}>

          {/* Since badge */}
          <div className="animate-fade-up" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(200,151,58,0.15)',
            border: '1px solid rgba(200,151,58,0.4)',
            borderRadius: '50px',
            padding: '0.4rem 1rem',
            marginBottom: '1.5rem',
          }}>
            <Star size={13} fill="var(--color-gold)" color="var(--color-gold)" />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
            }}>Tradición y Calidad desde 1999</span>
          </div>

          {/* Heading */}
          <h1
            className="animate-fade-up delay-100"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              fontWeight: 900,
              color: 'var(--color-white)',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            Carnicería &<br />
            <span style={{
              fontStyle: 'italic',
              color: 'var(--color-red-light)',
            }}>Charcutería</span>{' '}
            <span style={{ whiteSpace: 'nowrap' }}>Raúl Oliver</span>
          </h1>

          {/* Gold line */}
          <div className="animate-fade-up delay-200" style={{
            width: '70px',
            height: '3px',
            background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
            marginBottom: '1.5rem',
          }} />

          {/* Subtitle */}
          <p
            className="animate-fade-up delay-300"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.8,
              maxWidth: '560px',
              marginBottom: '2.5rem',
            }}
          >
            La mejor selección de carnes frescas, embutidos ibéricos y elaborados
            artesanales en <strong style={{ color: 'rgba(255,255,255,0.95)' }}>Lora del Río, Sevilla</strong>.
            Tu carnicería de confianza.
          </p>

          {/* CTA Buttons */}
          <div className="cta-group animate-fade-up delay-400">
            <a href="#productos" className="btn-primary" style={{ fontSize: '0.95rem' }}>
              Ver productos
            </a>
            <a href="#contacto" className="btn-outline" style={{ fontSize: '0.95rem' }}>
              Cómo llegar
            </a>
          </div>

          {/* Trust indicators */}
          <div
            className="hero-stats animate-fade-up delay-500"
          >
            {[
              { num: '+25', label: 'Años de experiencia' },
              { num: '100%', label: 'Producto fresco diario' },
              { num: '★★★★★', label: 'Valoración en redes' },
            ].map(({ num, label }) => (
              <div key={label}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-gold)' }}>
                  {num}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', marginTop: '0.2rem', letterSpacing: '0.05em' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#productos"
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'rgba(255,255,255,0.5)',
          textDecoration: 'none',
          animation: 'fadeIn 1.5s 1.5s both',
        }}
      >
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Descubrir</span>
        <ChevronDown size={20} style={{ animation: 'fadeUp 1s infinite alternate' }} />
      </a>
    </section>
  );
}
