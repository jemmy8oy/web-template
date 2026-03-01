import { Link } from 'react-router-dom';
import ProjectInterestForm from '../components/ProjectInterestForm';

const TenBeerPlanDetail: React.FC = () => {
    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div style={{ maxWidth: '1100px' }}>
                <header style={{ marginBottom: '64px' }}>
                    <Link to="/" style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontWeight: 600 }}>
                        ← Back to Portfolio
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '16px' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'var(--bg-card)', padding: '15px' }}>
                            <img src="/assets/images/tenbeerplan/tenbeerplan.png" alt="Ten Beer Plan" style={{ width: '100%', height: '100%' }} />
                        </div>
                        <h1 style={{ fontSize: '3.5rem', color: 'var(--text-primary)' }}>Ten Beer Plan</h1>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                        <span style={{
                            fontSize: '0.8rem',
                            padding: '6px 16px',
                            borderRadius: '100px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: '#ef4444',
                            fontWeight: 700
                        }}>
                            Technical MVP
                        </span>
                        <span style={{
                            fontSize: '0.8rem',
                            padding: '6px 16px',
                            borderRadius: '100px',
                            background: 'rgba(168, 85, 247, 0.1)',
                            color: 'var(--accent-secondary)',
                            fontWeight: 700
                        }}>
                            Meme Origin
                        </span>
                    </div>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px' }}>
                        A social coordination experiment that started with a meme and became my first journey into custom backend engineering.
                    </p>
                </header>

                <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '64px', marginBottom: '80px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <section>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-primary)' }}>The "Meme to MVP" Journey</h2>

                            <div className="glass" style={{
                                marginBottom: '32px',
                                overflow: 'hidden',
                                borderRadius: '24px',
                                maxWidth: '500px',
                                margin: '0 auto 32px'
                            }}>
                                <img
                                    src="/assets/images/tenbeerplan/tbp-meme.jpeg"
                                    alt="Ten Beer Plan Meme"
                                    style={{ width: '100%', display: 'block' }}
                                />
                                <div style={{ padding: '16px', background: 'rgba(0,0,0,0.4)', color: 'white', fontSize: '0.9rem', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
                                    The original meme that sparked the project
                                </div>
                            </div>

                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                It all started with a simple meme from a friend: a photo of a beer fridge with the quote, <strong>"Where do you see yourself 10 beers from now? What is your 10 beer plan?"</strong>
                            </p>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                What started as a joke between friends turned into a vision for a social utility similar to "Beer Buddy"—a way for friends to coordinate and share their nights out in real-time. I built an MVP and tested it with a group of 15 alpha users, iterating until we had a functional, real-time social app.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                This project was a massive technical leap for me. It was the first time I moved away from "backend-as-a-service" and built everything from scratch. I was managing user authentication, real-time location sharing, and a relational database—all hosted on AWS.
                            </p>
                            <h3 style={{ fontSize: '1.4rem', marginTop: '32px', marginBottom: '16px', color: 'var(--text-primary)' }}>The Apple Roadblock</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                After months of development and successful alpha testing, the project hit a major wall: the App Store Review. Apple rejected the app multiple times, citing policies regarding "encouraging excessive consumption of alcohol."
                            </p>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Despite our arguments that the app was about "coordination and safety," Apple's gatekeepers were firm. The "Ten Beer Plan" name and the associated meme humor were inherently at odds with their strict safety guidelines. Rather than stripping the project of its identity to fit a policy box, I decided to retire the app and preserve its technical legacy.
                            </p>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '24px', color: 'var(--text-primary)' }}>Product Interface</h2>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                                gap: '20px'
                            }}>
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <div key={num} className="glass" style={{ borderRadius: '16px', overflow: 'hidden', height: '350px' }}>
                                        <img
                                            src={`/assets/images/tenbeerplan/tbp-screen-${num}.png`}
                                            alt={`Ten Beer Plan Screen ${num}`}
                                            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="glass" style={{ padding: '32px' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Technical Deep-Dive</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div>
                                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '8px' }}>The First Backend</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        My first time building a custom API from scratch using <strong>Python, Flask, and SQLAlchemy</strong>.
                                    </p>
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '8px' }}>Security & Auth</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        Implemented my own authentication flow, handling secure user data and session management.
                                    </p>
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '8px' }}>Infrastructure</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        Deployed the backend to <strong>AWS Elastic Beanstalk</strong>, with a hosted database also living on AWS.
                                    </p>
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '8px' }}>Cross-Platform</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        Built the frontend using <strong>Flutter</strong>, ensuring a smooth, native feel for the social interactions.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <ProjectInterestForm projectSlug="tenbeerplan" projectTitle="Ten Beer Plan" />
                        <section className="glass" style={{ padding: '32px' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Key Learnings</h3>
                            <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                <li><strong>Full-Stack Ownership</strong>: Moving from managed services to building and deploying a custom API.</li>
                                <li><strong>AWS Ecosystem</strong>: Practical experience with Elastic Beanstalk and RDS database management.</li>
                                <li><strong>Testing Rhythms</strong>: Managing a small group of alpha testers to validate features early.</li>
                                <li><strong>Policy Navigation</strong>: Understanding the nuances of App Store guidelines and content sensitivity.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Project Status</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div>
                                <span>Retired (Technical Legacy)</span>
                            </div>
                            <p style={{ marginTop: '16px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                While the app never hit the store, its technical foundation and the transition to AWS directly paved the way for my current Project Northstar infrastructure.
                            </p>
                        </section>
                    </div>
                </div>

                <section className="glass" style={{ padding: '64px', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '24px', color: 'var(--text-primary)' }}>Technical Post-Mortem</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        The "Ten Beer Plan" story is a testament to the fact that failed deployments are often the best teachers. I'll be sharing a full technical breakdown of the Flask-to-AWS architecture on my YouTube channel soon.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default TenBeerPlanDetail;
