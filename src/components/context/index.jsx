import { useState, createContext } from 'react';

export const GlobalContext = createContext(null);

export default function LanguageState({ children }) {

    const [isModalShown, setiSModalShown] = useState(false);

    // Tracking of presence of modal

    return <GlobalContext.Provider
        value={{
            isModalShown,
            setiSModalShown
        }}
    >{children}</GlobalContext.Provider>

}