import { Link } from 'react-router-dom';
import ProjectInterestForm from '../components/ProjectInterestForm';

const EarnYourDrinksDetail: React.FC = () => {
    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div style={{ maxWidth: '1100px' }}>
                <header style={{ marginBottom: '64px' }}>
                    <Link to="/" style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontWeight: 600 }}>
                        ← Back to Portfolio
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '16px' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'var(--bg-card)', padding: '15px' }}>
                            <img src="/balenthiran.svg" alt="Earn Your Drinks" style={{ width: '100%', height: '100%' }} />
                        </div>
                        <h1 style={{ fontSize: '3.5rem', color: 'var(--text-primary)' }}>Earn Your Beers</h1>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                        <span style={{
                            fontSize: '0.8rem',
                            padding: '6px 16px',
                            borderRadius: '100px',
                            background: 'rgba(52, 211, 153, 0.1)',
                            color: '#34d399',
                            fontWeight: 700
                        }}>
                            Just for Fun
                        </span>
                        <span style={{
                            fontSize: '0.8rem',
                            padding: '6px 16px',
                            borderRadius: '100px',
                            background: 'rgba(96, 165, 250, 0.1)',
                            color: '#60a5fa',
                            fontWeight: 700
                        }}>
                            In Development
                        </span>
                    </div>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px' }}>
                        A fun, zero-pressure project built to track the eternal balance between pints and kilometers.
                    </p>
                </header>

                <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '64px', marginBottom: '80px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <section>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-primary)' }}>The Origin Story</h2>

                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                This project started, as many great (and drinking-related) ideas do, with a conversation. My friend James has a unique ritual: every time he has a drink, he logs it in his notes app. Then, he offsets those drinks by running or cycling.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                It's a simple exchange economy: <strong>5 pints might cost him a 5k run or a 20k cycle</strong>.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                He jokingly mentioned turning this manual process into an app, and I thought, "Why not?" It’s a perfect, low-stakes project to kick off the year. No complex business logic—just a fun utility to solve a very specific problem for one person.
                            </p>
                        </section>

                        <section className="glass" style={{ padding: '32px' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--text-primary)' }}>The "Who Cares?" Philosophy</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                I know what you're thinking. <em>"Doesn't Garmin already do this? Doesn't Strava track calories?"</em>
                            </p>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                Yes. Absolutely. You can track net calories on a dozen different platforms. But that’s not the point. This isn't about perfectly accurate caloric deficit tracking; it’s about the <strong>fun of the trade-off</strong>. It's about looking at your phone and seeing exactly how many kilometers you "owe" the beer gods.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '0' }}>
                                Sometimes, you just build things because you can. That’s enough of a reason.
                            </p>
                        </section>
                        
                        <section>
                             <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-primary)' }}>What's Next?</h2>
                             <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                I'm building this out as a simple MVP. If it turns out other people want to "earn their beers" too, I might expand it with more features. For now, watch this space for updates.
                             </p>
                        </section>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <ProjectInterestForm projectSlug="earn-your-drinks" projectTitle="Earn Your Beers" />
                         <section className="glass" style={{ padding: '32px' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Project Goals</h3>
                            <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                <li><strong>Speed</strong>: Built quickly to capture the momentum of the idea.</li>
                                <li><strong>Utility</strong>: Replaces a manual notes-app workflow.</li>
                                <li><strong>Fun</strong>: A lighthearted way to start the coding year.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Project Status</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#60a5fa' }}></div>
                                <span>In Development</span>
                            </div>
                            <p style={{ marginTop: '16px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                Currently building the initial views and logic.
                            </p>
                        </section>
                    </div>
                </div>

                <section className="glass" style={{ padding: '40px', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '32px', color: 'var(--text-primary)' }}>Announcing First Project of the Year</h2>
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
                            src="https://www.youtube.com/embed/gPzL90ZtClA?si=DM-xDLS6qnXCmLOi"
                            title="Announcing First Project of the Year - Earn Your Beers!"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default EarnYourDrinksDetail;
