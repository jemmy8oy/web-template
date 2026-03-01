import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import KanbanBoard from '../components/KanbanBoard';
import BoardSwitcher from '../components/BoardSwitcher';
import SprintGoals from '../components/SprintGoals';
import SprintHistory from '../components/SprintHistory';
import SprintNavigator from '../components/SprintNavigator';
import { useSprint } from '../context/SprintContext';

type InternalBoardType = 'project' | 'devops' | 'youtube' | 'admin';

const BOARD_METADATA: Record<InternalBoardType, { title: string; description: string }> = {
    project: {
        title: 'Project Board',
        description: "A transparent look at the lifecycle of every app I've built or planned. From initial backlog to long-term retirement.",
    },
    devops: {
        title: 'Engineering Board',
        description: 'The backend of my digital world. Tracking migrations, infrastructure upgrades, and core engineering milestones.',
    },
    youtube: {
        title: 'Content Board',
        description: 'Tracking the pipeline of engineering videos, project breakdowns, and build-in-public sessions for the jemmy8oy channel.',
    },
    admin: {
        title: 'Platform Board',
        description: 'Managing the jemmy8oy brand presence. Tracking social media setups, newsletter launches, and platform growth.',
    }
};

const Board: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialType = (searchParams.get('type') as InternalBoardType) || 'project';
    const initialViewMode = (searchParams.get('view') as 'board' | 'evolution') || 'board';
    
    const [boardType, setBoardType] = useState<InternalBoardType>(initialType);
    const [viewMode, setViewMode] = useState<'board' | 'evolution'>(initialViewMode);
    const { activeSprintId } = useSprint();

    // Sync state with URL when switcher is used
    const handleTypeChange = (type: InternalBoardType) => {
        setBoardType(type);
        setSearchParams({ type, view: viewMode });
    };

    const handleViewModeChange = (mode: 'board' | 'evolution') => {
        setViewMode(mode);
        setSearchParams({ type: boardType, view: mode });
    };

    // Also sync if URL changes manually
    useEffect(() => {
        const type = searchParams.get('type') as InternalBoardType;
        if (type && type !== boardType && ['project', 'devops', 'youtube', 'admin'].includes(type)) {
            setBoardType(type);
        }
        const view = searchParams.get('view') as 'board' | 'evolution';
        if (view && view !== viewMode && ['board', 'evolution'].includes(view)) {
            setViewMode(view);
        }
    }, [searchParams]);

    const metadata = BOARD_METADATA[boardType];

    return (
        <div style={{ marginTop: '80px', width: '100%' }}>
            <header className="container" style={{ marginBottom: '48px' }}>
                <Link to="/" style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontWeight: 600 }}>
                    ← Back to Portfolio
                </Link>
                
                {/* View Mode Toggle */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'flex-start', 
                    alignItems: 'center', 
                    gap: '16px',
                    marginBottom: viewMode === 'board' ? '32px' : '48px'
                }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>View Mode:</span>
                    <div className="glass" style={{ display: 'flex', padding: '4px', gap: '4px', borderRadius: '12px' }}>
                        <button 
                            onClick={() => handleViewModeChange('board')}
                            style={{ 
                                padding: '6px 16px', 
                                border: 'none', 
                                background: viewMode === 'board' ? 'var(--accent-primary)' : 'transparent',
                                color: viewMode === 'board' ? '#fff' : 'var(--text-secondary)',
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Kanban Board
                        </button>
                        <button 
                            onClick={() => handleViewModeChange('evolution')}
                            style={{ 
                                padding: '6px 16px', 
                                border: 'none', 
                                background: viewMode === 'evolution' ? 'var(--accent-primary)' : 'transparent',
                                color: viewMode === 'evolution' ? '#fff' : 'var(--text-secondary)',
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Evolution Timeline
                        </button>
                    </div>
                </div>

                {/* Sprint Navigator Row - Now under View Mode */}
                {viewMode === 'board' && (
                    <div style={{ marginBottom: '48px' }}>
                        <SprintNavigator />
                    </div>
                )}

                {viewMode === 'board' && (
                    <>
                        <SprintGoals />
                        <BoardSwitcher currentType={boardType} onTypeChange={handleTypeChange} />
                    </>
                )}

                <div style={{ marginBottom: '48px' }}>
                    <h1 style={{ fontSize: '3.5rem', color: 'var(--text-primary)', marginBottom: '16px' }}>
                        {viewMode === 'board' ? metadata.title : 'Project Evolution'}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '32px', fontSize: '1.1rem', lineHeight: '1.6' }}>
                        {viewMode === 'board' 
                            ? metadata.description 
                            : 'Tracing the entire history of theursery. Every pivot, every milestone, and every lesson learned across all projects and engineering cycles.'}
                    </p>

                    {viewMode === 'board' ? (
                        <SprintHistory boardFilter={boardType} sprintId={activeSprintId} />
                    ) : (
                        <SprintHistory isTimelineView />
                    )}
                </div>
            </header>

            {viewMode === 'board' && <KanbanBoard initialType={boardType} />}
        </div>
    );
};

export default Board;
