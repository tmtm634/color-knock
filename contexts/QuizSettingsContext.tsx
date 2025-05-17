import React, { createContext, useContext, useState } from 'react';

type QuizSettings = {
    grade: string;
    mode: string;
    setGrade: (grade: string) => void;
    setMode: (mode: string) => void;
};

const QuizSettingsContext = createContext<QuizSettings | undefined>(undefined);

export const QuizSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [grade, setGrade] = useState('');
    const [mode, setMode] = useState('');
    return (
        <QuizSettingsContext.Provider value={{ grade, mode, setGrade, setMode }}>
            {children}
        </QuizSettingsContext.Provider>
    );
};

export const useQuizSettings = () => {
    const ctx = useContext(QuizSettingsContext);
    if (!ctx) throw new Error('useQuizSettings must be used within QuizSettingsProvider');
    return ctx;
};
