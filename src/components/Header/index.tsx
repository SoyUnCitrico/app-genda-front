import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';
import { useRouter } from 'next/router';
import axios from 'axios';

const Header = () => {
  const router = useRouter();



  const handleCerrarSesion = async () => {

    

    try {
        // console.log("CLICKED:", credentials);
        const response = await axios.post(`/api/auth/unauth`);

        if(!!response.status && response.status === 200) {
            // console.log("CAMBIANDO DE PAGINA")
            // if(response.data === 'El usuario no se ha encontrado con los datos de tu busqueda'){
            //     setToastOpen(true);
            // } else {
                router.push('/login');
                console.log("PUSHING");
            // }
        } else {
            console.log("USUARIO O CONTRASEÑA INCORRECTOS");
        }
    } 
    catch(err) {
        console.error("USUARIO O CONTRASEÑA INCORRECTOS");
        // console.error("ERROR LOG: ", err);
    }
  };

  return(
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                App-Genda
            </Typography>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            App-Genda
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Cerrar Sesión">
              <Button onClick={handleCerrarSesion} sx={{ p: 1, pl: 2, pr:2 }} variant='contained' color='secondary'>
                {`Cerrar Sesión`}
              </Button>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header;