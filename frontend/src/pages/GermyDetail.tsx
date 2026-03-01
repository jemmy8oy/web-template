import { Link } from 'react-router-dom';
import ProjectInterestForm from '../components/ProjectInterestForm';

const GermyDetail: React.FC = () => {
    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div style={{ maxWidth: '1100px' }}>
                <header style={{ marginBottom: '64px' }}>
                    <Link to="/" style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontWeight: 600 }}>
                        ← Back to Portfolio
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '16px' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'var(--bg-card)', padding: '15px' }}>
                            <img src="/assets/images/germy/virus.svg" alt="Germy" style={{ width: '100%', height: '100%' }} />
                        </div>
                        <h1 style={{ fontSize: '3.5rem', color: 'var(--text-primary)' }}>Germy</h1>
                    </div>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px' }}>
                        My first ever mobile app. A story of technical triumph, pandemic-era creativity, and the harsh realities of App Store gatekeeping.
                    </p>
                </header>

                <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '64px', marginBottom: '80px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <section>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-primary)' }}>The Origin Story (2020)</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Germy started at the beginning of the 2020 lockdown. With extra time and a burning curiosity, I challenged myself to build my very first mobile app. The concept actually predates the pandemic—it began as a school work experience project designed to attract people to a convention stand.
                            </p>
                        </section>

                        <section className="glass" style={{ padding: '32px' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Game Mechanics</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Unlike traditional Tetris, Germy features a 360-degree challenge. Walls are "broken down" by viruses from four different directions. The player must use Tetris pieces (originally toilet rolls in the lockdown version) to rebuild the defenses and stop the spread.
                            </p>
                        </section>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <ProjectInterestForm projectSlug="germy" projectTitle="Germy" />
                        <section>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-primary)' }}>The Rejection Saga</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>01</span>
                                    <div>
                                        <strong style={{ color: 'var(--text-primary)' }}>Apple Sensitivity</strong>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Rejected because of the COVID-19 theme during a time of high policy sensitivity.</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>02</span>
                                    <div>
                                        <strong style={{ color: 'var(--text-primary)' }}>The "Computer Virus" Pivot</strong>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Rebranded the theme to satisfy policies, focusing on a digital virus attacking a system.</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>03</span>
                                    <div>
                                        <strong style={{ color: 'var(--text-primary)' }}>"Duplication" Final Blow</strong>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Finally rejected for being too similar to Tetris—a common hurdle for indie innovators.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-primary)' }}>The Verdict</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                While the Apple App Store remained out of reach, Germy did successfully launch on the <strong>Google Play Store</strong>. However, as I shifted my focus to newer projects, the app was eventually removed from the store due to a lack of active maintenance.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', marginTop: '16px' }}>
                                Despite its removal, Germy remains the project where I learned <strong>Flutter</strong>—the foundational skill for every app I've built since.
                            </p>
                        </section>
                    </div>
                </div>

                <section className="glass" style={{ padding: '40px', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '32px', color: 'var(--text-primary)' }}>Watch the Post-Mortem</h2>
                    <div style={{
                        maxWidth: '800px',
                        margin: '0 auto',
                        position: 'relative',
                        paddingBottom: '56.25%',
                        height: 0,
                        overflow: 'hidden',
                        borderRadius: '16px',
                        background: '#000'
                    }}>
                        <iframe
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                            src="https://www.youtube.com/embed/oAu9jSV_72Y"
                            title="Germy - My First Ever App!"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default GermyDetail;
