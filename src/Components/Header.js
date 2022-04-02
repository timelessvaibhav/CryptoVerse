import { AppBar, Container, createTheme, CssBaseline, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles(()=>({
    title:{
        flex :1,
        color: "gold",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer",
        textAlign: "center",
    }
}))
const Header = () => {
    const classes = useStyles();
    const {currency,setCurrency} = CryptoState(); 
    const darktheme = createTheme({
        palette: {
            primary:{
                main: "#fff",
            },
            type: "dark",
        },
    })
    return (
        <ThemeProvider theme = {darktheme}>
        {/* <CssBaseline/> */}
        <AppBar color='transparent' position='static'>
            <Container>
                <Toolbar>
                    <Typography className= {classes.title} variant = "h5">CryptoVerse</Typography>
                    <Select variant = "outlined" style = {{width: 100,height: 40,marginRight: 15,}} value = {currency} onChange={(e)=>setCurrency(e.target.value)}>
                        {/* <MenuItem value = {"USD"}>USD</MenuItem> */}
                        <MenuItem value = {"INR"}>INR</MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
        </ThemeProvider>
    )
}

export default Header
