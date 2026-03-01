import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
    return (
        <section id="about" className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '3rem', marginBottom: '24px', lineHeight: 1.1 }}>
                        Engineering My <span style={{ color: 'var(--accent-primary)' }}>Future</span>
                    </h2>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <p>
                            Hey, I'm James. I've been writing code since I was 10, but my journey is about more than just the IDE. I'm a builder, a lifelong learner, and an aspiring founder.
                        </p>
                        <p>
                            Beyond the day job, I'm scaling my own universe. From migrating my entire stack from AWS to a custom <strong>Kubernetes cluster on Oracle Cloud</strong> to running 500km a year and maintaining a bi-weekly "standup" rhythm on <Link to="/youtube" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>YouTube</Link>.
                        </p>
                        <p>
                            I believe in the "whole story"—not just the successful launches, but the App Store rejections (looking at you, Germy), the 95% complete projects, and the pivots that lead to true user-driven growth.
                        </p>
                    </div>

                    <div style={{ marginTop: '40px', display: 'flex', gap: '32px' }}>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>70k+</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Organic Downloads</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>100k</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Northstar Goal</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>User-First</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Philosophy</div>
                        </div>
                    </div>
                </div>

                <div className="glass" style={{
                    padding: '40px',
                    position: 'relative',
                    overflow: 'hidden',
                    color: 'var(--text-primary)'
                }}>
                    <h3 style={{ marginBottom: '24px' }}>My Core Values</h3>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <li style={{ display: 'flex', gap: '16px' }}>
                            <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>01</span>
                            <div>
                                <strong style={{ display: 'block', color: 'var(--text-primary)' }}>Lifelong Learning</strong>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>I don't claim to know it all. I am committed to learning and growing alongside my community.</span>
                            </div>
                        </li>
                        <li style={{ display: 'flex', gap: '16px' }}>
                            <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>02</span>
                            <div>
                                <strong style={{ display: 'block', color: 'var(--text-primary)' }}>Authentic Storytelling</strong>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Documenting the roadblocks and overcome challenges, inspired by the transparency of creators like Code Bullet.</span>
                            </div>
                        </li>
                        <li style={{ display: 'flex', gap: '16px' }}>
                            <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>03</span>
                            <div>
                                <strong style={{ display: 'block', color: 'var(--text-primary)' }}>Holistic Development</strong>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Focusing on the entire lifecycle: idea, design, code, user testing, and marketing.</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default About;
