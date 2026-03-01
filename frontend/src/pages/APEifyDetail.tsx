import { Link } from 'react-router-dom';
import ProjectInterestForm from '../components/ProjectInterestForm';

const APEifyDetail: React.FC = () => {
    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <Link to="/" style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '32px', fontWeight: 600 }}>
                ← Back to Portfolio
            </Link>

            <div style={{ maxWidth: '1100px' }}>
                <header style={{ marginBottom: '64px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
                        <img
                            src="/assets/images/apeify/apeify.png"
                            alt="APEify"
                            style={{ width: '80px', height: '80px', borderRadius: '20px', objectFit: 'cover' }}
                            onError={(e) => { (e.target as HTMLImageElement).src = '/balenthiran.svg'; }}
                        />
                        <div>
                            <h1 style={{ fontSize: '3.5rem', marginBottom: '8px' }}>APEify</h1>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <span className="glass" style={{ padding: '4px 12px', fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600 }}>70,000+ Downloads</span>
                                <span className="glass" style={{ padding: '4px 12px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Flutter & Firebase</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '64px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                        <section>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>The lockdown success story</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                APEify was my second major project, born during the COVID-19 lockdown. A close friend from school had the initial spark for an avatar creator and had begun development, but reached out for technical support to take it to the next level.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                What followed was a true lesson in organic growth. We didn't spend a penny on marketing, yet the app found its audience naturally. People didn't just use the app; they identified with it, adopting their custom-created characters as profile pictures across social media.
                            </p>
                            <a
                                href="https://www.tiktok.com/@alyanat_/video/7479151008266898734?lang=en"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass glass-hover"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    padding: '24px',
                                    color: 'var(--text-primary)',
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                    borderRadius: '16px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    marginTop: '16px'
                                }}
                            >
                                <span style={{ fontSize: '1.5rem' }}>🔥</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>Viral Moment</div>
                                        <span style={{ fontSize: '0.7rem', background: 'rgba(255, 59, 48, 0.1)', color: '#ff3b30', padding: '2px 8px', borderRadius: '4px' }}>2M+ Views</span>
                                    </div>
                                    <div style={{ fontSize: '1.1rem', lineHeight: '1.4' }}>
                                        APEify characters being printed onto physical apparel ↗
                                    </div>
                                </div>
                            </a>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>Technical Reflection</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                From an engineering perspective, APEify is an important reflection because it has no traditional backend. We used <strong>Flutter</strong> for the UI and <strong>Firebase</strong> as a "backend-as-a-service," with the NoSQL database handling everything we needed.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                It is an interesting reflection on how powerful these tools can be for those starting out. Google's ecosystem effectively bridged the gap for us as inexperienced developers, allowing us to build a production-ready app that handled 70k+ organic users by focusing entirely on what the user sees.
                            </p>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>The Reality of Maintenance</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                Maintaining a successful app alongside life—first University and now a full-time 9-5 job—is a skill in itself. While I've moved into a more passive maintenance phase, APEify is still used daily by people on their iPhones and remains available globally on the iOS App Store. It's a project that proved its resilience by continuing to find an audience long after the initial lockdown spark.
                            </p>
                        </section>
                    </div>

                    <aside style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <ProjectInterestForm projectSlug="apeify" projectTitle="APEify" />
                        <div className="glass" style={{ padding: '24px' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Project Stats</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Downloads</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>70k+ (Organic)</div>
                                </div>
                                <div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Timeline</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>Lockdown 2020</div>
                                </div>
                                <div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Status</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '16px' }}>Ongoing (Passive)</div>
                                    <a
                                        href="https://apps.apple.com/us/app/id1523829414"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ display: 'inline-block', transition: 'transform 0.2s ease' }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        <img src="/assets/images/shared/app_store.svg" alt="Download on App Store" style={{ height: '40px' }} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="glass" style={{ padding: '24px' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Tech Stack</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600 }}>Flutter</span>
                                <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600 }}>Firebase</span>
                                <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600 }}>NoSQL</span>
                                <span style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-secondary)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600 }}>iOS Exclusive</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default APEifyDetail;
