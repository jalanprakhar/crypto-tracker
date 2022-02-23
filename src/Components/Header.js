import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from "@material-ui/core";
// import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../Context/CryptoContext";
const useStyles=makeStyles(()=>({title:{
    flex:"1",
    color:"gold",
    fontFamily:"Montserrat",
    fontWeight:"bold",
    cursor:"pointer"
}}))

export default function Header() {
    const classes=useStyles();
    const history=useHistory();
    const handleClick=()=>{
        history.push('/');
    }
    const {currency,setCurrency}=CryptoState();
    const darkTheme = createTheme({
        palette:{primary:{
            main:"#fff"
        },
        type:'dark',}
      });
    return (
    <ThemeProvider theme={darkTheme}>
        <AppBar color='transparent' position="static">
            <Container>
                <Toolbar>
                    <Typography className={classes.title} onClick={handleClick} variant='h6'>
                        Crypto Tracker
                    </Typography>
                    <Select variant="outlined" style={{width:100,height:40,marginRight:15}}
                    value={currency}
                    onChange={(e)=>{setCurrency(e.target.value)}}
                    >
                        <MenuItem value={'USD'}>USD
                        </MenuItem>
                        <MenuItem value={'INR'}>
                        INR
                        </MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
    </ThemeProvider>
  )
}
