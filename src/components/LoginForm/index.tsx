import axios from 'axios';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';import styles from './LoginForm.module.scss';
import FormControl from '@mui/material/FormControl';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Toast from '../Toast';
import { useRouter } from 'next/router';
import { useState } from 'react';


const LoginForm = () => {
    const router = useRouter();
    // const [showPass, setShowPass] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({
        user:{},
        password: ''
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
  
    const handleToastClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }

        setToastOpen(false);
    };

    const onTypeEmail = (e :  any) => {
        // console.log("CREDENTIALS: ", credentials);
        setCredentials({
            password: credentials.password,
            user: {
                email: e.target.value
            }
        })
    }

    const onTypePass = (e :  any) => {
        // console.log("CREDENTIALS: ", credentials);
        setCredentials({
            password: e.target.value,
            user: credentials.user,
        })
    }


    const handleClick = async (e : any) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/auth/login`, credentials);

            if(response.status === 200) {
                // console.log("CAMBIANDO DE PAGINA")
                if(response.data === 'Datos incorrectos'){
                    setToastOpen(true);
                } else {
                    router.push('/dashboard')
                    // console.log("PUSHING");
                    // console.log(response.data);
                }
            } else {
                console.log("USUARIO O CONTRASEÑA INCORRECTOS");
                setToastOpen(true);
            }
        } 
        catch(err) {
            setToastOpen(true);
            console.error("USUARIO O CONTRASEÑA INCORRECTOS");
            // console.error("ERROR LOG: ", err);
        }
    }

    return (
        
        <Box 
            sx={{marginBottom:{xs:'4rem', md:'0'}}}>

            <Toast isOpen={toastOpen} message={'Email o contraseña incorrectos'} handleClose={handleToastClose}/>
            <FormGroup sx={{display:'grid', placeContent:'center'}}>
                <FormControl required>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <OutlinedInput 
                        id="email" 
                        name="email"
                        label="Email"
                        onChange={onTypeEmail}
                        sx={{backgroundColor:'white', minWidth:{xs:'320px', sm:'360px', lg:'400px'}}}
                    />
                </FormControl>

                <FormControl required variant="outlined" sx={{margin: '1rem 0'}}>
                    <InputLabel htmlFor="password">Contraseña</InputLabel>
                    <OutlinedInput
                        id="password"
                        name="password"
                        onChange={onTypePass}
                        sx={{backgroundColor:'white', minWidth:{xs:'320px', sm:'360px', lg:'400px'}}}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                            }
                        label="Password"
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
                >Ingresar</Button>
            </FormGroup>

        </Box>
    )
}   

export default LoginForm;
