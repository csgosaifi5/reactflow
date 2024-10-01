import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// Define the type for the context value
type DnDContextType = {
  type: string | null;
  setType: Dispatch<SetStateAction<string | null>>;
};

// Create the context with a default value that matches the DnDContextType
const DnDContext = createContext<DnDContextType>({
  type: null,
  setType: () => {},
});

// Define the provider's props type
interface DnDProviderProps {
  children: ReactNode;
}

export const DnDProvider = ({ children }: DnDProviderProps) => {
  const [type, setType] = useState<string | null>(null);

  // Provide an object matching DnDContextType
  const contextValue = {
    type,
    setType,
  };

  return (
    <DnDContext.Provider value={contextValue}>
      {children}
    </DnDContext.Provider>
  );
};

export default DnDContext;

// Custom hook to use the DnD context
export const useDnD = (): DnDContextType => {
  return useContext(DnDContext);
};
