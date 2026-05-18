import { useEffect, useRef } from 'react';
import { ShieldCheck, Leaf, Users, Award } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Calidad garantizada',
    desc: 'Seleccionamos cada pieza con el mismo cuidado desde 1999. Solo la mejor carne llega a tu mesa.',
  },
  {
    icon: Leaf,
    title: 'Producto fresco diario',
    desc: 'Recibimos género fresco cada día para asegurarte la máxima frescura y sabor en cada corte.',
  },
  {
    icon: Users,
    title: 'Trato personalizado',
    desc: 'Te asesoramos en cada compra. Sabemos cómo preparar cada pieza según tus gustos y necesidades.',
  },
  {
    icon: Award,
    title: 'Artesanía local',
    desc: 'Elaborados propios: hamburguesas, pinchitos, adobados y chorizos hechos con recetas tradicionales.',
  },
];

export function Features() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.15 }
    );
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--color-black)',
        padding: '5rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-label">Por qué elegirnos</span>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
            color: 'var(--color-white)',
            marginTop: '0.75rem',
          }}>
            La diferencia está en el detalle
          </h2>
          <div className="gold-line gold-line-center" />
        </div>


        {/* Cards */}
        <div className="features-grid">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="reveal card-hover"
              style={{
                animationDelay: `${i * 0.1}s`,
                background: 'var(--color-charcoal)',
                border: '1px solid rgba(200,151,58,0.15)',
                borderRadius: '4px',
                padding: '2rem',
                transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,151,58,0.5)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,151,58,0.15)';
              }}
            >
              <div style={{
                width: '52px',
                height: '52px',
                background: 'rgba(192,57,43,0.12)',
                border: '1px solid rgba(192,57,43,0.3)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
              }}>
                <Icon size={22} color="var(--color-red-light)" />
              </div>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.15rem',
                color: 'var(--color-white)',
                marginBottom: '0.6rem',
              }}>
                {title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-gray-400)', lineHeight: 1.7 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
