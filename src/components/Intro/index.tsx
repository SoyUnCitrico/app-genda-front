// import styles from './Intro.module.scss';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AssignmentIcon from '@mui/icons-material/Assignment';

type introType = {
    isButtonSet?: boolean
}

const Intro = (props : introType) => {
    const isButton = !!props.isButtonSet ? props.isButtonSet : false;
    return( 
        <Container>
            <Paper elevation={0}>
                <Box sx={{display:'grid', placeItems:'center', paddingTop:'2rem'}}>
                    <Image 
                        width={220}
                        height={120}
                        src={"./logo-ccd-black.svg"} 
                        alt={"Logo de CCD"}
                    />
                </Box>
                <Box sx={{
                        display:'grid',
                        justifyContent: 'center',
                        padding: {lg:'2rem 4rem', md:'2rem 2rem', sm:'2rem 4rem', xs:'2rem 1rem'}
                    }}
                >
                    <Typography variant='h4'>En el CCD estamos muy contentes de colaborar contigo.</Typography>
                    
                    <Box sx={{marginBottom: {xs:'1rem',md:'2rem'}}}>
                        <br/>
                        <Typography variant='body1'>Queremos que nuestra actividad salga hermosa. <strong>Su éxito depende del trabajo coordinado de muchas personas.</strong></Typography>
                        <Typography variant='body1'>Los equipos de comunicación y diseño generarán los materiales de difusión necesarios a partir de la información que aquí nos compartas.</Typography>
                        <br/>
                        <Typography variant='body1'><strong>Colabora entregando este formulario completo y a tiempo por favor.</strong></Typography>
                    </Box>
                    { isButton ? (
                         <Box sx={{display:'grid', placeItems: 'center', padding: '2rem 1rem 1rem'}}>
                         <Button 
                            variant='contained'
                            href='/colaboradores/dashboard'
                            endIcon={<AssignmentIcon/>}
                            disableElevation
                            sx={{
                              backgroundColor: `${'#afda5f'}`,
                              mixBlendMode: 'multiply',
                              color: '#272727'
                            }}    
                        >
                             Ir al Dashboard
                         </Button>
                     </Box>
                    ): <></>}
                </Box>
            </Paper>
        </Container>
        )
}

export default Intro;