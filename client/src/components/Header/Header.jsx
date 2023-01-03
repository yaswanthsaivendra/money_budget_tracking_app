import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PaidIcon from '@mui/icons-material/Paid';
const Header = ({title,setOption}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >  
        </IconButton>
        <PaidIcon sx={{m:2}} fontSize="large"/>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         {title}
        </Typography>
        <Button variant="contained" sx={{m:2,border:"1px solid white"}} onClick={()=>{setOption("login")}}>Login</Button>
        <Button variant="contained"  sx={{mr:2, border:"1px solid white"}} onClick={()=>{setOption("register")}}>Signup</Button>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Header


