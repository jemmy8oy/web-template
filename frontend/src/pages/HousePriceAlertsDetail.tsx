import { Link } from 'react-router-dom';
import ProjectInterestForm from '../components/ProjectInterestForm';

const HousePriceAlertsDetail: React.FC = () => {
    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div style={{ maxWidth: '1100px' }}>
                <header style={{ marginBottom: '64px' }}>
                    <Link to="/" style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontWeight: 600 }}>
                        ← Back to Portfolio
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '16px' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'var(--bg-card)', padding: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                            <img
                                src="/assets/images/house-price-alerts/logo.svg"
                                alt="House Price Alerts"
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        </div>
                        <h1 style={{ fontSize: '3.5rem', color: 'var(--text-primary)' }}>House Price Alerts</h1>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                        <span style={{
                            fontSize: '0.8rem',
                            padding: '6px 16px',
                            borderRadius: '100px',
                            background: 'rgba(34, 197, 94, 0.1)',
                            color: '#22c55e',
                            fontWeight: 700
                        }}>
                            95% Complete
                        </span>
                        <span style={{
                            fontSize: '0.8rem',
                            padding: '6px 16px',
                            borderRadius: '100px',
                            background: 'rgba(234, 179, 8, 0.1)',
                            color: '#eab308',
                            fontWeight: 700
                        }}>
                            Pending Validation
                        </span>
                    </div>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px' }}>
                        Real-time alerts for property market shifts, built for those looking to rent or buy in a fast-moving market.
                    </p>
                </header>

                <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '64px', marginBottom: '80px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <section>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Project Overview</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.6' }}>
                                While most property portals excel at alerting users to new listings, they often fail to provide transparency when an existing listing drops in price. <strong>House Price Alerts</strong> fills this specific market gap by tracking fluctuations that typical vendors overlook.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.6' }}>
                                I built a custom ingestion engine that scrapes and monitors property listings at the source. This system identifies price reductions minutes after they are updated, providing a distinct competitive edge for buyers and renters waiting for the right entry point.
                            </p>
                        </section>
                        <section>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Infrastructure Evolution</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.6' }}>
                                As this project grew, I hit a technical wall with my initial hosting strategy. While <strong>Ten Beer Plan</strong> was running on AWS Elastic Beanstalk, I found it wasn't designed for running multiple independent applications side-by-side efficiently.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.6' }}>
                                I initially pivoted toward AWS ECS and started managing scheduled scrapers and new databases, but it became increasingly difficult to stay within the AWS Free Tier. Knowing that the free tier would eventually expire, and with my cloud knowledge expanding, I decided to take full control.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.6' }}>
                                This was the catalyst for moving away from managed vendor services and building my own <strong>Cloud Cluster</strong>. It gave me the flexibility to run complex scheduled jobs and multiple databases without the constraints of a specific vendor's ecosystem.
                            </p>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-primary)' }}>The "User-First" Pause</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.6' }}>
                                Technically, the core engine is 95% functional. It tracks fluctuations and manages notification queues effectively. However, as I approached deployment, I realized that building the technology was only half the battle. Pushing to release without an audience felt like an exercise in over-engineering without direction.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.6' }}>
                                This specific moment was the birth of <strong>Project Northstar</strong>. I recognized that before launching more standalone products, I needed to build a platform to discover user interest, market my ideas, and ensure my development effort is always driven by where the community's demand actually lies.
                            </p>
                        </section>

                        <section className="glass" style={{ padding: '32px' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Planned Features</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div>
                                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '8px' }}>Area Subscriptions</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        Follow specific postcodes or customized map areas to get hyper-local data.
                                    </p>
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '8px' }}>Daily Price Checks</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        Automated scrapers check for shifts, reductions, or new listings every 24 hours.
                                    </p>
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '8px' }}>Instant Notifications</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        Get push notifications the moment a property in your watch-list changes price.
                                    </p>
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '8px' }}>Market Insights</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        View historical trends for areas to determine if it's a "buyer's" or "seller's" market.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <ProjectInterestForm projectSlug="house-price-alerts" projectTitle="House Price Alerts" />
                        <section className="glass" style={{ padding: '32px' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Technical Stack</h3>
                            <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                <li><strong>Backend</strong>: Node.js / .NET Core worker services.</li>
                                <li><strong>Data Ingestion</strong>: Custom scraping engine with proxy rotation.</li>
                                <li><strong>Database</strong>: PostgreSQL for efficient spatial queries.</li>
                                <li><strong>Notifications</strong>: Firebase Cloud Messaging (FCM).</li>
                            </ul>
                        </section>

                        <section>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Project Status</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308' }}></div>
                                <span>On Hold (Awaiting Validation)</span>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HousePriceAlertsDetail;
