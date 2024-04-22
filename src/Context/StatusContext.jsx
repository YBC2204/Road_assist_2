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
    const[name1,setname]=useState(null);
    const [submitStatus, setSubmitStatus] =useState(null);
    const[name2,setname2]=useState(null);
    const [locationClicked, setLocationClicked] = useState(false);
    const [longitud,setlong]=useState('');
    const [latitud,setlat]=useState('');
    return(
        <StatusContext.Provider value={
            {
                stat:[status,setStatus],
                logid:[lid,setlid],
                user:[name1,setname],
                submit:[submitStatus, setSubmitStatus],
                user2:[name2,setname2],
                locclick:[locationClicked, setLocationClicked],
                long:[longitud,setlong],
                lat:[latitud,setlat]
            }
        }>
            {children}
        </StatusContext.Provider>
    );
};