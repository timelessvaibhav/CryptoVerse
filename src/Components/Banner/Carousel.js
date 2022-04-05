import { Container, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { TrendingCoins } from "../../config/api";
import axios from "axios";
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";

const useStyles = makeStyles(() => ({
  Carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem:{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
  },
}));

export function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const classes = useStyles();
  const { currency,symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  console.log(trending);
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);
  
  const items = trending.map((coin)=>{
      let profit = coin.price_change_percentage_24h>=0;
    return (
        <div className={classes.carouselItem}>
            <img src = {coin.image} alt = {coin.name} height = "80" style={{marginBottom: 10}}/>
            <span>
                {coin.symbol}
                &nbsp;
                <span style={{color: profit>0 ? "rgb(14,203,129)" : "red"}}>
                    {profit &&"+"}{coin.price_change_percentage_24h?.toFixed(2) + "%"}
                </span>
            </span>
            <span style={{fontSize: 22, fontWeight: 500}}>
                {symbol}{numberWithCommas(coin.current_price.toFixed(2))}
            </span>
        </div>
    )
   })

  const responsive = {
    0:{
        items:2,
    },
    256:{
        items: 4,
    },
    512:{
        items: 5,
    },
  };

  return <div className={classes.Carousel}>
     <div>
        <AliceCarousel 
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration = {1500}
        disableDotsControls
        disableButtonsControls
            responsive={responsive}
            autoPlay
            items = {items}
        >
    
        </AliceCarousel>
    </div>;
 </div>;
};

export default Carousel;
