import  { createContext, useContext, useState } from 'react';

const StatusContext = createContext();

export const useStatusContext = () =>{
    
    const context_t= useContext(StatusContext);

    if (!context_t) {
        throw new Error('useStatusContext must be used within a ModalProvider');
      }
      return context_t;
};

export const StatusProvider = ({children}) =>{

    const[status,setStatus]=useState('SIGNED_OUT');
    const[lid,setlid] =useState(null);
    return(
        <StatusContext.Provider value={
            {
                stat:[status,setStatus],
                logid:[lid,setlid]
            }
        }>
            {children}
        </StatusContext.Provider>
    );
};