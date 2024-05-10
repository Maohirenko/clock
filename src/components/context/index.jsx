import { useState, createContext } from 'react';

export const GlobalContext = createContext(null);

export default function LanguageState({ children }) {

    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [isModalShown, setiSModalShown] = useState(false);

    return <GlobalContext.Provider
        value={{
            selectedLanguage,
            setSelectedLanguage,
            isModalShown, 
            setiSModalShown
        }}
    >{children}</GlobalContext.Provider>

}