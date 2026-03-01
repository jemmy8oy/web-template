import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useGetSprintsQuery } from '../api/staticDataApi';

interface Sprint {
    id: string;
    startDate: string;
    endDate: string;
    standupUrl?: string;
    goals: string[];
    changes: any[];
    boardSnapshots: Record<string, any[]>;
}

interface SprintContextType {
    activeSprintId: string;
    setActiveSprintId: (id: string) => void;
    currentSprint: Sprint | null;
    isLatest: boolean;
    sprints: Sprint[];
    isLoading: boolean;
}

const SprintContext = createContext<SprintContextType | undefined>(undefined);

export const SprintProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: sprints = [], isLoading } = useGetSprintsQuery();
    
    // Default to the latest sprint that has goals (Current Sprint)
    const defaultSprintId = useMemo(() => {
        if (sprints.length === 0) return '';
        const withGoals = [...sprints].reverse().find(s => s.goals && s.goals.length > 0);
        return withGoals ? withGoals.id : sprints[sprints.length - 1].id;
    }, [sprints]);

    const [activeSprintId, setActiveSprintId] = useState<string>('');

    // Initialize activeSprintId once data is loaded
    useEffect(() => {
        if (sprints.length > 0 && !activeSprintId) {
            setActiveSprintId(defaultSprintId);
        }
    }, [sprints, defaultSprintId, activeSprintId]);

    const currentSprint = useMemo(() => {
        return sprints.find(s => s.id === activeSprintId) || null;
    }, [activeSprintId, sprints]);

    // isLatest is true if we are viewing anything that isn't a historical frozen snapshot from the past
    // But for the sake of labeling, let's treat the latest one with goals as "current"
    const latestWithGoalsId = useMemo(() => {
        const withGoals = [...sprints].reverse().find(s => s.goals && s.goals.length > 0);
        return withGoals ? withGoals.id : '';
    }, [sprints]);

    const isLatest = activeSprintId === latestWithGoalsId;

    return (
        <SprintContext.Provider value={{
            activeSprintId,
            setActiveSprintId,
            currentSprint,
            isLatest,
            sprints,
            isLoading
        }}>
            {children}
        </SprintContext.Provider>
    );
};

export const useSprint = () => {
    const context = useContext(SprintContext);
    if (!context) {
        throw new Error('useSprint must be used within a SprintProvider');
    }
    return context;
};
