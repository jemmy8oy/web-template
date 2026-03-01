import { Link } from 'react-router-dom';

const YouTubeDetail: React.FC = () => {
    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div style={{ maxWidth: '1100px' }}>
                <header style={{ marginBottom: '64px' }}>
                    <Link to="/" style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontWeight: 600 }}>
                        ← Back to Portfolio
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '16px' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'var(--bg-card)', padding: '15px' }}>
                            <img src="/balenthiran.svg" alt="jemmy8oy" style={{ width: '100%', height: '100%' }} />
                        </div>
                        <h1 style={{ fontSize: '3.5rem', color: 'var(--text-primary)' }}>jemmy8oy</h1>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                        <span style={{
                            fontSize: '0.8rem',
                            padding: '6px 16px',
                            borderRadius: '100px',
                            background: 'rgba(255, 0, 0, 0.1)',
                            color: '#ff0000',
                            fontWeight: 700
                        }}>
                            YouTube Channel
                        </span>
                        <span style={{
                            fontSize: '0.8rem',
                            padding: '6px 16px',
                            borderRadius: '100px',
                            background: 'rgba(168, 85, 247, 0.1)',
                            color: 'var(--accent-secondary)',
                            fontWeight: 700
                        }}>
                            Building in Public
                        </span>
                    </div>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px' }}>
                        Documenting the journey of a lifelong builder, from custom K8s clusters to App Store rejections.
                    </p>
                </header>

                <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '64px', marginBottom: '80px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <section>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Why I Started the Channel</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                For as long as I can remember, I've been driven to work on my own projects. But for a long time, I didn't really have a platform to share what I was building or the lessons I was learning along the way.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                I wanted to start building that platform. The jemmy8oy channel is where I document the "whole story"—not just the finished products, but the messy middle, the technical pivots, and the hard-earned wins.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                One of the realities of tech projects is that they don't always reach 100% completion. Ideas pivot, scopes change, or life gets in the way. By creating content around these projects, I ensure that every hour spent engineering creates something tangible: a shared lesson, a technical breakdown, or a story that inspires someone else to keep building.
                            </p>
                        </section>

                        <section className="glass" style={{ padding: '32px', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '24px', color: 'var(--text-primary)' }}>Watch the Journey</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                                Check out my latest videos on engineering, project updates, and the "standup" rhythm.
                            </p>
                            <a
                                href="https://www.youtube.com/@jemmy8oy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '16px 32px',
                                    background: '#ff0000',
                                    color: '#fff',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    borderRadius: '50px'
                                }}
                            >
                                Visit jemmy8oy on YouTube
                            </a>
                        </section>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <section className="glass" style={{ padding: '32px' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Content Focus</h3>
                            <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                <li><strong>Technical Deep-Dives</strong>: Breaking down backends, K8s configs, and Flutter logic.</li>
                                <li><strong>Project Updates</strong>: Bi-weekly rhythm on works-in-progress.</li>
                                <li><strong>The Builder Mindset</strong>: Sharing the philosophy behind "Project Northstar".</li>
                                <li><strong>Real-Life Balance</strong>: Documenting 500km running goals and fitness integrations.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Status</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
                                <span>Active & Growing</span>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YouTubeDetail;
