import React from 'react';

interface GoalItemProps {
    goal: string;
    isCompact?: boolean;
}

const GoalItem: React.FC<GoalItemProps> = ({ goal, isCompact = false }) => {
    const isCompleted = goal.startsWith('[x]');
    const isFailed = goal.startsWith('[-]');
    const cleanText = goal.replace('[x] ', '').replace('[ ] ', '').replace('[-] ', '')
                         .replace('[x]', '').replace('[ ]', '').replace('[-]', ''); // Handle no-space variants

    return (
        <div className="glass" style={{ 
            padding: isCompact ? '4px 10px' : '6px 14px', 
            borderRadius: '20px', 
            fontSize: isCompact ? '0.75rem' : '0.9rem', 
            color: isCompleted ? 'var(--accent-primary)' : isFailed ? '#ef4444' : 'var(--text-secondary)',
            border: isCompleted ? '1px solid var(--accent-primary)' : isFailed ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.1)',
            background: isCompleted ? 'rgba(var(--accent-primary-rgb), 0.1)' : isFailed ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255,255,255,0.05)',
            textDecoration: isFailed ? 'line-through' : 'none',
            opacity: isFailed ? 0.7 : 1,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: isCompleted || isFailed ? 600 : 400
        }}>
            {isCompleted && <span style={{ fontWeight: 900 }}>✓</span>}
            {isFailed && <span style={{ fontWeight: 900, color: '#ef4444' }}>✗</span>}
            <span>{cleanText}</span>
        </div>
    );
};

export default GoalItem;
