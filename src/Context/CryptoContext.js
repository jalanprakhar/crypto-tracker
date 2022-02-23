import { createContext, useContext, useEffect, useState } from "react"

const Crypto=createContext()
const CryptoContext=({children})=>{
    const [currency,setCurrency]=useState("INR");
    const [there,setThere]=useState(true);
    const [symbol, setSymbol] = useState("₹");
    useEffect(() => {
      if(currency==="INR" && there) setSymbol("₹");
      else if(currency==="USD" && there)setSymbol("$")

      return ()=>{setThere(false)}
        
          
    }, [currency,there]);

    return (<Crypto.Provider value={{currency,setCurrency,symbol}}>
        {children}
    </Crypto.Provider>)
}
export default CryptoContext;
export const CryptoState=()=>{
    return useContext(Crypto);
}

