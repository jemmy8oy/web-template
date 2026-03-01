import React, { useState } from 'react';
import { useRegisterInterestMutation } from '../api/generatedApi';

interface ProjectInterestFormProps {
    projectSlug: string;
    projectTitle: string;
}

const ProjectInterestForm: React.FC<ProjectInterestFormProps> = ({ projectSlug, projectTitle }) => {
    const [email, setEmail] = useState('');
    const [registerInterest, { isLoading, isError }] = useRegisterInterestMutation();
    const [status, setStatus] = useState<'idle' | 'success' | 'already_registered'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            try {
                const result = await registerInterest({
                    projectSlug,
                    registerInterestRequest: { email }
                }).unwrap();
                
                // @ts-ignore - mapping the backend response
                if (result.message === "Already registered") {
                    setStatus('already_registered');
                } else {
                    setStatus('success');
                }
                setEmail('');
            } catch (err) {
                console.error('Failed to register interest:', err);
            }
        }
    };

    return (
        <div className="glass" style={{
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
            border: '1px solid var(--glass-border)',
            marginBottom: '32px'
        }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>
                Interested in {projectTitle}?
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.85rem', lineHeight: '1.5' }}>
                Get notified when {projectTitle} receives major updates or moves into its next phase.
            </p>

            {status === 'idle' ? (
                <>
                    <form onSubmit={handleSubmit} style={{
                        display: 'flex',
                        gap: '12px',
                        flexWrap: 'wrap'
                    }}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                            style={{
                                flex: '1 1 100%',
                                padding: '10px 16px',
                                borderRadius: '50px',
                                background: 'var(--bg-card)',
                                border: '1px solid var(--glass-border)',
                                color: 'var(--text-primary)',
                                fontSize: '0.85rem',
                                outline: 'none'
                            }}
                        />
                        <button type="submit" className="glass" disabled={isLoading} style={{
                            flex: '1 1 100%',
                            padding: '10px 20px',
                            background: 'var(--accent-primary)',
                            color: '#fff',
                            fontWeight: 600,
                            borderRadius: '50px',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            fontSize: '0.85rem'
                        }}>
                            {isLoading ? 'Joining...' : 'Get Updates'}
                        </button>
                    </form>
                    {isError && (
                        <div style={{ color: '#ef4444', marginTop: '12px', fontSize: '0.85rem' }}>
                            Something went wrong. Please try again.
                        </div>
                    )}
                </>
            ) : (
                <div style={{
                    color: 'var(--accent-primary)',
                    fontWeight: 600,
                    fontSize: '1rem',
                    padding: '12px 20px',
                    background: 'rgba(99, 102, 241, 0.1)',
                    borderRadius: '50px',
                    display: 'inline-block'
                }}>
                    {status === 'success' ? (
                        <>🎉 Thanks! You'll be notified about {projectTitle} updates.</>
                    ) : (
                        <>👋 You're already watching this project! Updates coming soon.</>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProjectInterestForm;
