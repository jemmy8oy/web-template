import React from 'react';

const Northstar: React.FC = () => {
    const milestones = [
        { label: 'Baseline', users: '100', active: true },
        { label: 'Traction', users: '1k', active: false },
        { label: 'Growth', users: '10k', active: false },
        { label: 'Northstar', users: '100k', active: false },
    ];

    return (
        <section id="strategy" className="container">
            <div className="glass mobile-tight-padding" style={{
                padding: '64px',
                background: 'linear-gradient(225deg, rgba(99, 102, 241, 0.03) 0%, rgba(168, 85, 247, 0.03) 100%)',
            }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
                    <div>
                        <span style={{
                            color: 'var(--accent-primary)',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em'
                        }}>
                            Strategic Pivot
                        </span>
                        <h2 style={{ fontSize: '2.5rem', marginTop: '16px', marginBottom: '24px', color: 'var(--text-primary)' }}>Project Northstar</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                            Building software is secondary to building user interest. Project Northstar is my commitment to being <strong>user-driven</strong>. No more building in isolation—I'm focusing on demand-first development.
                        </p>
                        <div style={{ display: 'flex', gap: '24px' }}>
                            <div className="glass" style={{ padding: '16px 24px', flex: 1 }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>Oracle K8s</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Cloud Infrastructure</div>
                            </div>
                            <div className="glass" style={{ padding: '16px 24px', flex: 1 }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>Bi-Weekly</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Accountability</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h3 style={{ marginBottom: '32px', fontSize: '1.2rem', color: 'var(--text-primary)' }}>Milestones to 100k Monthly Users</h3>
                        <div className="milestones-container" style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', padding: '0 10px' }}>
                            <div className="milestones-connector" style={{
                                position: 'absolute',
                                top: '20px',
                                left: '0',
                                right: '0',
                                height: '2px',
                                background: 'var(--glass-border)',
                                zIndex: 0
                            }} />
                            {milestones.map((m, i) => (
                                <div key={i} style={{ textAlign: 'center', zIndex: 1, position: 'relative' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: m.active ? 'var(--accent-primary)' : 'var(--bg-page)',
                                        border: '2px solid',
                                        borderColor: m.active ? 'var(--accent-primary)' : 'var(--glass-border)',
                                        margin: '0 auto 12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: m.active ? '#fff' : 'var(--text-secondary)',
                                        fontWeight: 700,
                                        fontSize: '0.8rem'
                                    }}>
                                        {m.active ? '✓' : i + 1}
                                    </div>
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{m.users}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{m.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Northstar;
