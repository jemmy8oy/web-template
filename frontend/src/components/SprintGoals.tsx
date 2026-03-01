import React from 'react';
import { useSprint } from '../context/SprintContext';
import GoalItem from './GoalItem';

const SprintGoals: React.FC = () => {
    const { currentSprint } = useSprint();

    if (!currentSprint) return null;

    const hasGoals = currentSprint.goals && currentSprint.goals.length > 0;
    
    // Derived labels

    return (
        <div className="glass" style={{ padding: '24px', marginBottom: '48px', borderLeft: '4px solid var(--accent-primary)' }}>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '16px', fontWeight: 700 }}>
                Sprint {currentSprint.id} Goals
            </h2>
            
            {hasGoals ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {currentSprint.goals.map((goal, index) => (
                        <GoalItem key={index} goal={goal} />
                    ))}
                </div>
            ) : (
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.95rem' }}>
                    Sprint goals haven't been set yet.
                </p>
            )}
        </div>
    );
};

export default SprintGoals;
