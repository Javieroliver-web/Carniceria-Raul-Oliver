import { useEffect, useRef, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const categories = [
  {
    name: 'Ternera',
    tag: 'Premium',
    items: ['Chuletones', 'Solomillo', 'Entrecot', 'Lomo alto', 'Redondo', 'Falda'],
    image: 'https://images.unsplash.com/photo-1588347818481-7c0caae8e49c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    color: '#7b2d2d',
  },
  {
    name: 'Cerdo',
    tag: 'Selección',
    items: ['Secreto ibérico', 'Solomillo', 'Costillas', 'Chuletillas', 'Presa', 'Carrillada'],
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    color: '#8b4513',
  },
  {
    name: 'Cordero',
    tag: 'Temporada',
    items: ['Chuletillas', 'Paletilla', 'Pierna', 'Costillar', 'Chuletas', 'Jarrete'],
    image: 'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    color: '#5a3e28',
  },
  {
    name: 'Aves',
    tag: 'Diario',
    items: ['Pollo entero', 'Pollo partido', 'Pavo', 'Codornices', 'Muslos', 'Alitas'],
    image: 'https://images.unsplash.com/photo-1612873100812-f56f9b77db8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    color: '#6b5a2a',
  },
  {
    name: 'Elaborados',
    tag: 'Artesano',
    items: ['Hamburguesas', 'Pinchitos', 'Albóndigas', 'Flamenquines', 'Adobados', 'Salchichas'],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    color: '#8b3a3a',
  },
  {
    name: 'Ibéricos',
    tag: 'Tradición',
    items: ['Jamón ibérico', 'Chorizo', 'Salchichón', 'Lomo', 'Morcilla', 'Panceta'],
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    color: '#7a2828',
  },
];

export function Products() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);

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
      id="productos"
      ref={ref}
      style={{ background: 'var(--color-cream)', padding: '6rem 1.5rem' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-label">Lo que ofrecemos</span>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
            color: 'var(--color-charcoal)',
            marginTop: '0.75rem',
            marginBottom: '1rem',
          }}>
            Nuestros productos
          </h2>
          <div className="gold-line gold-line-center" />
          <p style={{
            color: 'var(--color-gray-600)',
            fontSize: '1rem',
            maxWidth: '500px',
            margin: '1rem auto 0',
            lineHeight: 1.7,
          }}>
            Carnes frescas, charcutería y elaborados artesanales seleccionados cada día
          </p>
        </div>

        {/* Grid */}
        <div className="products-grid">
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              className="reveal"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <div
                className="card-hover"
                style={{
                  background: 'var(--color-white)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
                  cursor: 'pointer',
                  border: active === i ? '2px solid var(--color-red)' : '2px solid transparent',
                  transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
                }}
                onClick={() => setActive(active === i ? null : i)}
              >
                {/* Image */}
                <div className="img-overlay" style={{ height: '200px' }}>
                  <ImageWithFallback
                    src={cat.image}
                    alt={cat.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  {/* Tag */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'var(--color-red)',
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '2px',
                    zIndex: 2,
                  }}>
                    {cat.tag}
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: 'var(--color-charcoal)',
                    marginBottom: '0.75rem',
                  }}>
                    {cat.name}
                  </h3>
                  <ul style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.3rem 0.5rem',
                  }}>
                    {cat.items.map(item => (
                      <li key={item} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.82rem',
                        color: 'var(--color-gray-600)',
                      }}>
                        <span style={{
                          width: '5px',
                          height: '5px',
                          background: 'var(--color-red)',
                          borderRadius: '50%',
                          flexShrink: 0,
                        }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="reveal" style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <p style={{ color: 'var(--color-gray-600)', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
            ¿No encuentras lo que buscas? Consulta nuestra disponibilidad
          </p>
          <a href="#contacto" className="btn-primary">
            Contactar ahora
          </a>
        </div>
      </div>
    </section>
  );
}
