import React from 'react';
import { HashLink } from 'react-router-hash-link';

const Hero: React.FC = () => {
    return (
        <section className="container" style={{
            textAlign: 'center',
            marginTop: '60px'
        }}>
            <img
                src="/balenthiran.svg"
                alt="James Balenthiran Logo"
                style={{
                    width: '160px',
                    height: '160px',
                    display: 'inline-block',
                    filter: 'drop-shadow(0 0 20px rgba(var(--accent-primary-rgb), 0.2))'
                }}
            />
            <h1 style={{
                fontSize: 'clamp(3.5rem, 8vw, 6rem)',
                marginBottom: '24px',
                background: 'linear-gradient(to bottom right, var(--text-primary) 30%, rgba(148, 163, 184, 0.5))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.1
            }}>
                James Balenthiran
            </h1>
            <p style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                color: 'var(--text-secondary)',
                maxWidth: '600px',
                margin: '0 auto 48px',
                fontWeight: 400
            }}>
                Crafting digital experiences, building ambitious app ideas, and documenting the journey from concept to MVP.
            </p>
            <div className="hero-actions" style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <HashLink
                    replace
                    smooth
                    to="/#projects"
                    scroll={(el) => {
                        const yOffset = -100; // Offset for fixed navbar
                        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                    }}
                    className="glass"
                    style={{
                        padding: '16px 32px',
                        background: 'var(--accent-primary)',
                        color: '#fff',
                        fontWeight: 600,
                        borderRadius: '50px',
                        border: 'none',
                        textDecoration: 'none'
                    }}
                >
                    Explore Projects
                </HashLink>
                <HashLink
                    replace
                    smooth
                    to="/#about"
                    scroll={(el) => {
                        const yOffset = -100;
                        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                    }}
                    className="glass"
                    style={{
                        padding: '16px 32px',
                        color: 'var(--text-primary)',
                        fontWeight: 600,
                        borderRadius: '50px',
                        textDecoration: 'none'
                    }}
                >
                    About Me
                </HashLink>
            </div>
        </section>
    );
};

export default Hero;
