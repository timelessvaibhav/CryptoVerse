import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { useNavigate } from "react-router-dom";
import { Container, createTheme, CssBaseline, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from "@material-ui/core";
import { numberWithCommas } from "./Banner/Carousel";
const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false) 
//   const [search, setSearch] = useState();
  const { currency, symbol } = CryptoState();
  const navigate = useNavigate();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  console.log(coins);

  useEffect(() => {
    fetchCoins();
  }, [currency]);

 
// const handleSearch = ()=>{
//     return coins.filter((coin)=>(
//         coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
//     ));
// };


const darktheme = createTheme({
    palette: {
        primary:{
            main: "#fff",
        },
        type: "dark",
    },
});

  return (<ThemeProvider theme={darktheme}>
      <CssBaseline/>
      <Container style={{textAlign: "center"}}>
        <Typography variant="h5" style={{margin: 18, fontFamily: "Montserrat"}}>Crypto Currency Prices by Market Cap</Typography>
        {/* <TextField label = "Which currency are you looking for?" variant="outlined" style={{marginBottom: 20, width: "100%"}} onChange = {(e)=>setSearch(e.target.value)}/> */}
        <TableContainer>
            {
                loading? (<LinearProgress style={{backgroundColor: "gold"}}/>) : (
                <Table>
                    <TableHead style={{backgroundColor: "#EEBC1D", width: "100%"}}>
                        <TableRow>
                            {["Coin", "Price", "24h Change", "Market Cap"].map((head)=>(
                                <TableCell style={{color: "black", fontWeight: 700, fontFamily: "Montserrat" }} key = {head} align = {head === "Coin" ? "" : "right"}>
                                    {head}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                         {coins.map((row)=>{
                             const profit = row.price_change_percentage_24h >0;

                             return(<TableRow onClick = {()=>navigate(`/coins/${row.id}`)} key = {row.name}>
                                 <TableCell component="th" scope="row" style={{display: "flex", gap: 15, backgroundColor: "#202020"}}>
                                    <img src= {row.image} alt = {row.name} height = "50" style = {{marginBottom: 10}}/>
                                    <div style={{display: "flex", flexDirection: "column"}}>
                                        <span style={{textTransform: "uppercase", fontSize: 22}}>{row.symbol}</span>
                                        <span style={{color:"darkgray"}}>{row.name}</span>
                                    </div>
                                 </TableCell>

                                 <TableCell align="right" style={{backgroundColor: "#202020"}} >
                                    {symbol}{" "}
                                    {numberWithCommas(row.current_price.toFixed(2))}
                                 </TableCell>

                                 <TableCell align="right" style={{color: profit>0 ? "rgb(14,203,129)" : "red", fontWeight: 500, backgroundColor: "#202020"}}>
                                    {profit && "+"}
                                    {row.price_change_percentage_24h.toFixed(2) + "%"}
                                 </TableCell>

                                 <TableCell align="right" style={{backgroundColor: "#202020"}}>
                                    {symbol}{" "}
                                    {numberWithCommas(row.market_cap.toString().slice(0,-6))}M
                                 </TableCell>

                             </TableRow>)
                         })}       
                    </TableBody>
                </Table>
                )
            }
        </TableContainer>
      </Container>
  </ThemeProvider>)
};

export default CoinsTable;
