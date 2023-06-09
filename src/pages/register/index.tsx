import { RegisterForm } from '@/components';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import { getCookie } from 'cookies-next';
const Register = () => {
    // console.log("cookies", getCookie('tokenAuthSerial'))
    return (
        <Container sx={{marginTop:'4rem'}}>
            <Typography variant='h3' textAlign={'center'}>{`Registrate ahora y usa `}</Typography>
            <Typography variant='h2' textAlign={'center'}>{`App-Genda`}</Typography>
            <Grid 
                container
                sx={{marginTop:{xs:'0.25rem', md:'2rem', lg:'3rem', xl:'4rem'}}} >
                <Grid item xs={12} display={'grid'} sx={{placeItems:'center'}}> <RegisterForm/> </Grid>
                <Grid item sx={{placeContent:'center'}} xs={12} mt={4}>
                    <Typography textAlign={'center'}> {`¿Ya tienes cuenta?`}</Typography>
                    <Typography textAlign={'center'}>
                        <Link href={'/login'} passHref>{`INGRESA AHORA`}</Link>
                    </Typography>
                </Grid>
            
            </Grid>
            
        </Container>
    )
}

export default Register;