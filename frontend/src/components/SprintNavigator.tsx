import React from 'react';
import { useSprint } from '../context/SprintContext';

const SprintNavigator: React.FC = () => {
    const { activeSprintId, setActiveSprintId, sprints } = useSprint();

    const allSprintIds = sprints.map(s => s.id);
    const currentIndex = allSprintIds.indexOf(activeSprintId);

    const handlePrev = () => {
        if (currentIndex > 0) {
            setActiveSprintId(allSprintIds[currentIndex - 1]);
        }
    };

    const handleNext = () => {
        if (currentIndex < allSprintIds.length - 1) {
            setActiveSprintId(allSprintIds[currentIndex + 1]);
        }
    };

    const currentSprint = sprints.find(s => s.id === activeSprintId);
    
    // Find the latest sprint with goals
    const latestWithGoals = [...sprints].reverse().find(s => s.goals && s.goals.length > 0);
    const latestWithGoalsIndex = latestWithGoals ? allSprintIds.indexOf(latestWithGoals.id) : -1;

    let headerLabel = 'Previous Sprint';
    if (currentIndex === latestWithGoalsIndex) {
        headerLabel = 'Current Sprint';
    } else if (currentIndex > latestWithGoalsIndex) {
        headerLabel = 'Next Sprint (Planning)';
    }

    const standupUrl = currentSprint?.standupUrl;
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '48px',
            justifyContent: 'center',
            padding: '0 8px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <button 
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--glass-border)',
                        color: currentIndex === 0 ? 'var(--text-secondary)' : 'var(--accent-primary)',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                        fontSize: '1.2rem',
                        opacity: currentIndex === 0 ? 0.5 : 1,
                        transition: 'all 0.2s ease'
                    }}
                >
                    ←
                </button>

                <div style={{ textAlign: 'center', minWidth: '220px' }}>
                    <div style={{ 
                        fontSize: '0.7rem', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.1em', 
                        color: 'var(--text-secondary)',
                        fontWeight: 700,
                        marginBottom: '4px'
                    }}>
                        {headerLabel}
                    </div>
                    <div style={{ 
                        fontSize: '1.2rem', 
                        color: 'var(--accent-primary)', 
                        fontWeight: 800,
                        lineHeight: '1.1',
                        marginBottom: '4px'
                    }}>
                        Sprint {activeSprintId}
                    </div>
                    {currentSprint && (
                        <div style={{ 
                            fontSize: '0.75rem', 
                            color: 'var(--text-secondary)',
                            fontWeight: 500
                        }}>
                            {formatDate(currentSprint.startDate)} – {formatDate(currentSprint.endDate)}
                        </div>
                    )}
                </div>

                <button 
                    onClick={handleNext}
                    disabled={currentIndex === allSprintIds.length - 1}
                    style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--glass-border)',
                        color: currentIndex === allSprintIds.length - 1 ? 'var(--text-secondary)' : 'var(--accent-primary)',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        cursor: currentIndex === allSprintIds.length - 1 ? 'not-allowed' : 'pointer',
                        fontSize: '1.2rem',
                        opacity: currentIndex === allSprintIds.length - 1 ? 0.5 : 1,
                        transition: 'all 0.2s ease'
                    }}
                >
                    →
                </button>
            </div>

            {standupUrl && (
                <a 
                    href={standupUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="glass glass-hover"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 20px',
                        borderRadius: '24px',
                        textDecoration: 'none',
                        fontSize: '0.8rem',
                        color: 'var(--text-primary)',
                        fontWeight: 600,
                        border: '1px solid var(--glass-border)',
                        transition: 'all 0.3s ease',
                        marginTop: '4px'
                    }}
                >
                    <span style={{ color: '#ff0000', fontSize: '1.1rem' }}>▶</span> Watch Sprint Stand-up
                </a>
            )}
        </div>
    );
};

export default SprintNavigator;
