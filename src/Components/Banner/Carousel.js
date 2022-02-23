import { makeStyles } from "@material-ui/core"
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import AliceCarousel from 'react-alice-carousel';
import { Link } from "react-router-dom";

import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../Context/CryptoContext";

const useStyles=makeStyles((theme)=>({
    caraousel:{
        height:"50%",
        display:"flex",
        alignItems:"center",
        
    },
    carouselItem:{
        display:"flex",
        flexDirection:'column',
        alignItems:'center',
        cursor:'pointer',
        textTransform:'uppercase',
        color:'white'

    },
}))
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
export default function Carousel() {
    const [trending, setTrending] = useState([])
    const classes=useStyles();
    const {currency,symbol}=CryptoState();
    const fetchTrendingCoins=useCallback(async()=>{
        const {data}=await axios.get(TrendingCoins(currency))
        setTrending(data);
    },[currency])
    // console.log(trending);
    useEffect(() => {
        fetchTrendingCoins()
        
      
    }, [fetchTrendingCoins])
    
    const items=trending.map((coin)=>{
        let profit=coin.price_change_percentage_24h>=0;
        return (<Link className={classes.carouselItem} to={`/coin/${coin.id}`}>
           <img src={coin?.image} alt={coin.name} height="80" style={{marginBottom:10}} /> 
           <span>{coin?.symbol}&nbsp;
            <span style={{color:profit? "rgb(14,203,129)":"red"}}>
                {profit && "+"} {coin?.price_change_percentage_24h.toFixed(2)}%
                {/* {!profit && "-"} {coin?.price_change_percentage_24h.toFixed(2)} */}
            </span>
           </span>
           <span style={{fontSize:22,fontWeight:500}}>
               {symbol}  {numberWithCommas(coin?.current_price.toFixed(2))}
           </span>
        </Link>)
    });
    const responsive={
        0:{
            items:2,
        },
        512:{
            items:4,
        },
    
    };
    
  return (
    <div className={classes.caraousel}>
        <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
        disableButtonsControls
         />
    </div>
  )
}
