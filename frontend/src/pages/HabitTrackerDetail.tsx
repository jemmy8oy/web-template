import { Link } from 'react-router-dom';
import ProjectInterestForm from '../components/ProjectInterestForm';

const HabitTrackerDetail: React.FC = () => {
    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div style={{ maxWidth: '1100px' }}>
                <header style={{ marginBottom: '64px' }}>
                    <Link to="/" style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontWeight: 600 }}>
                        ← Back to Portfolio
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '16px' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'var(--bg-card)', padding: '15px' }}>
                            <img src="/balenthiran.svg" alt="Habit Tracker" style={{ width: '100%', height: '100%' }} />
                        </div>
                        <h1 style={{ fontSize: '3.5rem', color: 'var(--text-primary)' }}>Personal Habit Tracker</h1>
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
                            background: 'rgba(251, 191, 36, 0.1)',
                            color: '#fbbf24',
                            fontWeight: 700
                        }}>
                            Planning Phase
                        </span>
                    </div>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px' }}>
                        A bespoke habit tracker tailored to my exact rituals and growth goals. Built for speed, ritual, and zero friction.
                    </p>
                </header>

                <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '64px', marginBottom: '80px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                        <section>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-primary)' }}>The "Habit of Sharing"</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                This project is as much about the output as it is about the process. As I build the habit of posting to YouTube and getting comfortable sharing my technical journey, I'm sticking to light-hearted, personal utility projects.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                The Personal Habit Tracker is the ultimate "eat your own dog food" project. I'm building a tool to track my growth, while sharing that growth with the world.
                            </p>
                        </section>

                        <section className="glass" style={{ padding: '32px' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--text-primary)' }}>The Ideation List</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div>
                                    <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '12px' }}>Physical & Wellness</h3>
                                    <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        <li>💤 Sleep hours (Apple wheel style)</li>
                                        <li>🍳 Ate breakfast</li>
                                        <li>🥦 Veg with lunch/dinner</li>
                                        <li>🍎 Ate fruit</li>
                                        <li>🏃‍♂️ Ran / Exercised</li>
                                        <li>💪 Press ups / Upper body</li>
                                        <li>🧘‍♂️ Stretch</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '12px' }}>Social & Creative</h3>
                                    <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        <li>☀️ Been outside</li>
                                        <li>🍻 Drinks drank</li>
                                        <li>🤝 Seen friend / family</li>
                                        <li>🚀 Side hustle time</li>
                                        <li>🎨 Drawing / Learning</li>
                                        <li>🎁 Gift giving</li>
                                        <li>✨ Word of the month</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Why Build My Own?</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                I know these apps exist. I've used them. But they often come with clutter: subscription nudges, social feeds I didn't ask for, and rigid tracking methods.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                By building my own, I can tailor it to the <strong>exact ways I like to do things</strong>. Whether it's the specific list of habits or the way I want to see my progress over time, this is about creating a tool that fits my life perfectly—and potentially open-sourcing the template for others to do the same.
                            </p>
                        </section>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <ProjectInterestForm projectSlug="habit-tracker" projectTitle="Personal Habit Tracker" />
                        <section className="glass" style={{ padding: '32px' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Planned Features</h3>
                            <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                <li><strong>Customizable</strong>: Add your own habits or use presets.</li>
                                <li><strong>Rich Media</strong>: Notes, photos, and calendar views.</li>
                                <li><strong>Engagement</strong>: Reminders, progress bars, and "On Track" status.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Current Status</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbf24' }}></div>
                                <span>Planning Phase</span>
                            </div>
                            <p style={{ marginTop: '16px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                Confirming initial requirements and technical stack.
                            </p>
                        </section>
                    </div>
                </div>

                <section className="glass" style={{ padding: '40px', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '32px', color: 'var(--text-primary)' }}>Building For Myself</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 32px auto' }}>
                        Stay tuned for the announcement video where I'll dive deeper into the design philosophy and the first lines of code.
                    </p>
                    <div style={{
                        maxWidth: '800px',
                        margin: '0 auto',
                        background: 'rgba(255, 255, 255, 0.05)',
                        aspectRatio: '16/9',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px dashed var(--glass-border)'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>🎬</span>
                            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Video Announcement Coming Soon</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HabitTrackerDetail;
