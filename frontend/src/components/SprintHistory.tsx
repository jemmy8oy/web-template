import React, { useState, useMemo } from 'react';
import { useGetSprintsQuery, useGetProjectsQuery } from '../api/staticDataApi';
import devopsData from '../data/devops.json';
import youtubeData from '../data/youtube.json';
import adminData from '../data/admin.json';
import GoalItem from './GoalItem';

interface SprintHistoryProps {
    boardFilter?: 'project' | 'devops' | 'youtube' | 'admin';
    sprintId?: string; // Optional: Only show for this specific sprint
    isTimelineView?: boolean;
}

const SprintHistory: React.FC<SprintHistoryProps> = ({ boardFilter, sprintId, isTimelineView }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { data: sprintsData = [], isLoading: isLoadingSprints } = useGetSprintsQuery();
    const { data: projectsData = [], isLoading: isLoadingProjects } = useGetProjectsQuery();

    // Create a lookup for items
    const itemMap = useMemo(() => {
        const map: Record<string, any> = {};
        [...projectsData, ...devopsData, ...youtubeData, ...adminData].forEach(item => {
            map[item.id] = item;
        });
        return map;
    }, [projectsData]);

    if (isLoadingSprints || isLoadingProjects) return <div style={{ color: 'var(--text-secondary)' }}>Loading history...</div>;
    if (sprintsData.length === 0) return null;

    // Filter changes based on sprintId or boardFilter
    const getSprintChanges = (sprint: any) => {
        let changes = sprint.changes || [];
        if (boardFilter) {
            changes = changes.filter((c: any) => c.board === boardFilter);
        }
        return changes;
    };

    if (isTimelineView) {
        const today = new Date().toISOString().split('T')[0];
        
        return (
            <div style={{ position: 'relative', paddingLeft: '32px', marginTop: '48px' }}>
                {/* Vertical Timeline Line */}
                <div style={{ 
                    position: 'absolute', 
                    left: '7px', 
                    top: '0', 
                    bottom: '0', 
                    width: '2px', 
                    background: 'linear-gradient(to bottom, var(--accent-primary), transparent)',
                    opacity: 0.3
                }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
                    {sprintsData
                        .slice()
                        .reverse()
                        .filter(s => s.startDate <= today)
                        .map((sprint) => {
                            const changes = sprint.changes || [];
                            const goals = sprint.goals || [];
                            
                            return (
                                <div key={sprint.id} style={{ position: 'relative' }}>
                                    {/* Timeline Dot */}
                                    <div style={{ 
                                        position: 'absolute', 
                                        left: '-32px', 
                                        top: '8px', 
                                        width: '16px', 
                                        height: '16px', 
                                        borderRadius: '50%', 
                                        background: 'var(--bg-primary)',
                                        border: '3px solid var(--accent-primary)',
                                        zIndex: 2,
                                        boxShadow: '0 0 10px rgba(var(--accent-primary-rgb), 0.5)'
                                    }} />

                                    <div style={{ marginBottom: '24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
                                            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: 0 }}>
                                                Sprint {sprint.id}
                                            </h2>
                                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                                                {sprint.startDate} — {sprint.endDate}
                                            </span>
                                        </div>
                                        
                                        {goals.length > 0 && (
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                                                {goals.map((goal: string, idx: number) => (
                                                    <GoalItem key={idx} goal={goal} />
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="glass" style={{ padding: '24px', position: 'relative' }}>
                                        <h4 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: '16px', opacity: 0.6 }}>
                                            Movement Log
                                        </h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            {changes.length > 0 ? (
                                                changes.map((change: any, idx: number) => (
                                                    <SprintChangeRow key={idx} change={change} itemMap={itemMap} />
                                                ))
                                            ) : (
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                                                    Quiet sprint. No movements recorded.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }

    // If sprintId is provided, we render a simplified "Sprint Log"
    if (sprintId) {
        const specificSprint = sprintsData.find(s => s.id === sprintId);
        if (!specificSprint) return null;

        const changes = getSprintChanges(specificSprint);
        const goals = specificSprint.goals || [];
        if (changes.length === 0 && goals.length === 0 && !boardFilter) return null;

        return (
            <div className="glass" style={{ padding: '16px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ opacity: 0.6 }}>📝</span> Sprint Log
                </h3>
                
                {goals.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                        {goals.map((goal: string, idx: number) => (
                            <GoalItem key={idx} goal={goal} isCompact />
                        ))}
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {changes.length > 0 ? (
                        changes.map((change: any, idx: number) => (
                            <SprintChangeRow key={idx} change={change} itemMap={itemMap} boardFilter={boardFilter} />
                        ))
                    ) : (
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                            No movements recorded for this board in this sprint.
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Default full history view
    return (
        <div style={{ marginBottom: '48px' }}>
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--accent-primary)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: 0,
                    marginBottom: '16px'
                }}
            >
                {isExpanded ? '▼' : '►'} View Global History
            </button>

            {isExpanded && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {sprintsData.slice().reverse().map((sprint) => {
                        const changes = getSprintChanges(sprint);
                        const goals = sprint.goals || [];
                        if (changes.length === 0 && goals.length === 0 && !boardFilter) return null;

                        return (
                            <div key={sprint.id} className="glass" style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>
                                        Sprint {sprint.id}
                                    </h3>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                        {sprint.startDate} — {sprint.endDate}
                                    </span>
                                </div>
                                
                                {goals.length > 0 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                                        {goals.map((goal: string, idx: number) => (
                                            <GoalItem key={idx} goal={goal} isCompact />
                                        ))}
                                    </div>
                                )}

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {changes.map((change: any, idx: number) => (
                                        <SprintChangeRow key={idx} change={change} itemMap={itemMap} boardFilter={boardFilter} />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const SprintChangeRow: React.FC<{ change: any, itemMap: any, boardFilter?: string }> = ({ change, itemMap, boardFilter }) => (
    <div style={{ fontSize: '0.85rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>•</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {itemMap[change.itemId]?.youtubeUrl ? (
                <a 
                    href={itemMap[change.itemId].youtubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                        color: 'var(--accent-primary)', 
                        textDecoration: 'none',
                        fontWeight: 600,
                        borderBottom: '1px solid transparent',
                        transition: 'border-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                >
                    {itemMap[change.itemId]?.title || change.itemId}
                </a>
            ) : (
                <span style={{ color: 'var(--text-primary)' }}>{itemMap[change.itemId]?.title || change.itemId}</span>
            )}
            {!boardFilter && (
                <span style={{ 
                    fontSize: '0.6rem', 
                    color: 'var(--text-secondary)', 
                    textTransform: 'uppercase',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '1px 4px',
                    borderRadius: '3px',
                    letterSpacing: '0.05em'
                }}>{change.board}</span>
            )}
        </div>
        <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {typeof change.to === 'object' && change.to !== null ? (
                <>
                    <span style={{ 
                        fontSize: '0.65rem', 
                        background: 'rgba(52, 211, 153, 0.1)', 
                        color: '#34d399', 
                        padding: '2px 6px', 
                        borderRadius: '4px',
                        fontWeight: 800,
                        border: '1px solid rgba(52, 211, 153, 0.2)'
                    }}>NEW Task</span>
                    <span>— {change.to.status}</span>
                </>
            ) : change.field && change.field !== 'status' ? (
                <>
                    <span style={{ 
                        fontSize: '0.6rem', 
                        color: 'var(--accent-primary)', 
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        background: 'rgba(var(--accent-primary-rgb), 0.1)',
                        padding: '1px 4px',
                        borderRadius: '3px'
                    }}>{change.field} Changed</span>
                    <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>{change.from} →</span>
                    <span style={{ fontWeight: 600 }}>{change.to}</span>
                </>
            ) : (
                <>
                    {!change.from ? (
                        <span style={{ 
                            fontSize: '0.65rem', 
                            background: 'rgba(52, 211, 153, 0.1)', 
                            color: '#34d399', 
                            padding: '2px 6px', 
                            borderRadius: '4px',
                            fontWeight: 800,
                            border: '1px solid rgba(52, 211, 153, 0.2)'
                        }}>NEW</span>
                    ) : (
                        <span>{change.from} →</span>
                    )}
                    <span>{change.to}</span>
                </>
            )}
        </span>
    </div>
);

export default SprintHistory;
