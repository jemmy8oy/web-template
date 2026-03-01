import React from 'react';
import { Link } from 'react-router-dom';
import { useGetProjectsQuery } from '../api/staticDataApi';

const ProjectGrid: React.FC = () => {
    const { data: projects, isLoading, error } = useGetProjectsQuery();

    if (isLoading) return <div style={{ color: 'var(--text-secondary)' }}>Loading projects...</div>;
    if (error || !projects) return <div style={{ color: 'var(--text-secondary)' }}>Error loading projects.</div>;

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '32px'
        }}>
            {projects.map((project) => {
                const CardContent = (
                    <div className="glass glass-hover" style={{
                        padding: '32px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px',
                        height: '100%',
                        cursor: project.path ? 'pointer' : 'default'
                    }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '16px',
                            background: 'rgba(255,255,255,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}>
                            <img
                                src={project.media.icon}
                                alt={project.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => { (e.target as HTMLImageElement).src = '/balenthiran.svg'; }}
                            />
                        </div>

                        <div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '8px'
                            }}>
                                <h3 style={{ fontSize: '1.5rem' }}>{project.title}</h3>
                                <span style={{
                                    fontSize: '0.7rem',
                                    padding: '4px 12px',
                                    borderRadius: '100px',
                                    background: 'rgba(99, 102, 241, 0.1)',
                                    color: 'var(--accent-primary)',
                                    fontWeight: 600,
                                    textTransform: 'uppercase'
                                }}>
                                    {project.category}
                                </span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                {project.description}
                            </p>
                            {project.path && (
                                <div style={{ marginTop: '16px', fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                                    View Deep Dive →
                                </div>
                            )}
                        </div>

                        <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
                            {project.links.appStore && (
                                <a href={project.links.appStore} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                    <img src="/assets/images/shared/app_store.svg" alt="App Store" style={{ height: '32px' }} />
                                </a>
                            )}
                            {project.links.playStore && (
                                <a href={project.links.playStore} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                    <img src="/assets/images/shared/google_play.png" alt="Play Store" style={{ height: '32px' }} />
                                </a>
                            )}
                        </div>
                    </div>
                );

                return project.path ? (
                    <Link key={project.id} to={project.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {CardContent}
                    </Link>
                ) : (
                    <div key={project.id}>
                        {CardContent}
                    </div>
                );
            })}
        </div>
    );
};

export default ProjectGrid;
