import { Intro,LoginForm } from '@/components';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import { getCookie } from 'cookies-next';
const Login = () => {
    // console.log("cookies", getCookie('tokenAuthSerial'))
    return (
        <Container sx={{marginTop:'4rem'}}>
            <Typography variant='h3' textAlign={'center'}>{`Bienvenido a tu App-Genda`}</Typography>
            <Grid 
                container
                sx={{marginTop:{xs:'0.25rem', md:'2rem', lg:'3rem', xl:'4rem'}}} >
                <Grid item xs={12} display={'grid'} sx={{placeItems:'center'}}> <LoginForm/> </Grid>
                <Grid item sx={{placeContent:'center'}} xs={12} mt={4}>
                    <Typography textAlign={'center'}> {`¿Aun no tienes cuenta?`}</Typography>
                    <Typography textAlign={'center'}>
                        <Link href={'/register'} passHref>{`REGISTRATE GRATIS`}</Link>
                    </Typography>
                </Grid>
            
            </Grid>
            
        </Container>
    )
}

export default Login;