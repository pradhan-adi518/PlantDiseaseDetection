import { createContext, useContext, useState } from "react";


const UserContext = createContext<{
    usernameHolder: string;
    setUsernameHolder: React.Dispatch<React.SetStateAction<string>>;
  } | null>(null);
  
  // Create a provider component
  export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [usernameHolder, setUsernameHolder] = useState<string>("");
  
    return (
      <UserContext.Provider value={{ usernameHolder, setUsernameHolder }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  // Hook to access the username and updater
  export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
  };