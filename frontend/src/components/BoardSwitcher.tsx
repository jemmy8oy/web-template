import React from 'react';

interface BoardSwitcherProps {
    currentType: 'project' | 'devops' | 'youtube' | 'admin';
    onTypeChange: (type: 'project' | 'devops' | 'youtube' | 'admin') => void;
}

const BoardSwitcher: React.FC<BoardSwitcherProps> = ({ currentType, onTypeChange }) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
            justifyContent: 'flex-start'
        }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Switch View:</span>
            <div className="glass" style={{ display: 'flex', padding: '4px', gap: '4px', borderRadius: '12px' }}>
                <div 
                    onClick={() => onTypeChange('project')}
                    style={{
                        padding: '6px 16px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        background: currentType === 'project' ? 'var(--accent-primary)' : 'transparent',
                        color: currentType === 'project' ? '#fff' : 'var(--text-secondary)',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                >
                    Project Board
                </div>
                <div 
                    onClick={() => onTypeChange('devops')}
                    style={{
                        padding: '6px 16px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        background: currentType === 'devops' ? 'var(--accent-primary)' : 'transparent',
                        color: currentType === 'devops' ? '#fff' : 'var(--text-secondary)',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                >
                    Engineering Board
                </div>
                <div 
                    onClick={() => onTypeChange('youtube')}
                    style={{
                        padding: '6px 16px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        background: currentType === 'youtube' ? 'var(--accent-primary)' : 'transparent',
                        color: currentType === 'youtube' ? '#fff' : 'var(--text-secondary)',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                >
                    Content Board
                </div>
                <div 
                    onClick={() => onTypeChange('admin')}
                    style={{
                        padding: '6px 16px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        background: currentType === 'admin' ? 'var(--accent-primary)' : 'transparent',
                        color: currentType === 'admin' ? '#fff' : 'var(--text-secondary)',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                >
                    Platform Board
                </div>
            </div>
        </div>
    );
};

export default BoardSwitcher;
