import axios from 'axios';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';import styles from './LoginForm.module.scss';
import FormControl from '@mui/material/FormControl';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Toast from '../Toast';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Typography } from '@mui/material';

const NewContact = () => {
    const router = useRouter();
    // const [showPass, setShowPass] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({
        name:'',
        lastName:'',
        email: '',
        phone: ''
    });

    const handleToastClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }

        setToastOpen(false);
    };

    const onType = (e :  any) => {
        // console.log("CREDENTIALS: ", credentials);
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = async (e : any) => {
        e.preventDefault();

        try {
            console.log(credentials)
            const response = await axios.post('/api/talk/createContact', credentials);
            // console.log(response.status)
            // console.log(response.data)

            if(!!response.data._id) {
                // console.log(response.data._id)
                const query = await axios.post('/api/talk/updateUser', credentials);
                console.log(query.data)
            }
            // response;
            // if(response.status === 200) {
            //     // console.log("CAMBIANDO DE PAGINA")
            //     router.push('/dashboard')
            // } else {
            //     console.log("USUARIO O CONTRASEÑA INCORRECTOS");
            //     setToastOpen(true);
            // }
        } catch(err) {
            setToastOpen(true);
            console.error("USUARIO O CONTRASEÑA INCORRECTOS");
            console.error("ERROR LOG: ", err);
        }
    }

    return(
    <Box 
        sx={{marginBottom:{xs:'4rem', md:'0'}}}>
        <Toast isOpen={toastOpen} message={'Email o contraseña incorrectos'} handleClose={handleToastClose}/>
        <Paper elevation={6}>
            <Box m={4} p={2} pb={4}>
                <Typography variant='h3'>Crear Contacto</Typography>
                <FormGroup sx={{display:'grid', placeContent:'center'}}>
                    <FormControl required sx={{margin: '0.5rem 0'}}>
                        <InputLabel htmlFor="name">Nombre</InputLabel>
                        <OutlinedInput 
                            id="name" 
                            name="name"
                            label="Name"
                            onChange={onType}
                            sx={{backgroundColor:'white', minWidth:{xs:'320px', sm:'360px', lg:'400px'}}}
                        />
                    </FormControl>
                    <FormControl sx={{margin: '0.5rem 0'}}>
                        <InputLabel htmlFor="lastName">Apellido</InputLabel>
                        <OutlinedInput 
                            id="lastName" 
                            name="lastName"
                            label="lastName"
                            onChange={onType}
                            sx={{backgroundColor:'white', minWidth:{xs:'320px', sm:'360px', lg:'400px'}}}
                        />
                    </FormControl>
                    <FormControl required sx={{margin: '0.5rem 0'}}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput 
                            id="email" 
                            name="email"
                            label="Email"
                            onChange={onType}
                            sx={{backgroundColor:'white', minWidth:{xs:'320px', sm:'360px', lg:'400px'}}}
                        />
                    </FormControl>
                    <FormControl sx={{margin: '0.5rem 0'}}>
                        <InputLabel htmlFor="phone">Teléfono</InputLabel>
                        <OutlinedInput 
                            id="phone" 
                            name="phone"
                            label="Phone"
                            onChange={onType}
                            sx={{backgroundColor:'white', minWidth:{xs:'320px', sm:'360px', lg:'400px'}}}
                        />
                    </FormControl>

                    <Button 
                        disableElevation
                        variant='contained'
                        onClick={handleClick}
                        // sx={{
                        //     backgroundColor: `${'#afda5f'}`,
                        //     mixBlendMode: 'multiply',
                        //     color: '#272727'
                        //   }}
                    >Agregar Contacto</Button>
                </FormGroup>
            </Box>
        </Paper>
    </Box>
    )
}

export default NewContact;






  
    

