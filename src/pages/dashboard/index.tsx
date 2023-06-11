import axios from 'axios';
import{useState, useEffect} from 'react';
// import DashboardGrid from '@/components/DashboardGrid';
import Box from '@mui/material/Box';
import Header from '@/components/Header';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {AuthUser, DashboardType} from '../../utils/types';
import { Button } from '@mui/material';
import NewContact from '@/components/NewContact';

const Dashboard = (props:DashboardType) => {
    const [contactsData, setContactsData] = useState<Array<any>>([])
    const [loading, setLoading] = useState(false);
    const [userAuth, setUserAuth] = useState<AuthUser>(initUser)
    const [creatingUser, setCreatingUser] = useState(false);
    
    useEffect(()=>{
        const getProfile = async () => {
            const response = await axios.get('/api/auth/profile');
            // console.log(response.data);
            setUserAuth(response.data);
        }

        getProfile();
    }, []);

    useEffect(()=> {
        const getContacts = async () =>{
            setLoading(true);
            try {
                const r = await axios.post('/api/talk/dashboard', {
                    data: userAuth, 
                });
                // console.log("ON CONTACTS:", r.data.data)
                setContactsData(r.data.data);
                setLoading(false);
            } catch(err) {
                setLoading(false);
                console.error("ERROR: ", err);
                // router.push('/login')
            }
        }
        getContacts();
    }, [userAuth])

    // console.log(userAuth);
    // console.log("CONTACTOS:", !!contactsData? contactsData?.directorio: ``)

    return (
    <>
        <Header></Header>
        <Box sx={{
                margin:{
                    xl:'2rem auto', 
                    lg:'2rem 1.5rem',
                    md:'1rem 1rem',
                    sm:'0.5rem 0.5rem',
                    xs:'0 1rem'}, 
                maxWidth:'1440px'
            }}>
                <Typography
                    marginTop={2}
                    marginBottom={2}
                    variant='h4'>
                    {`Bienvenido`} 
                </Typography>
                <Typography variant='h4'>{` ${userAuth.username !== "" ? (userAuth.username) : "Usuario"}`}</Typography>
                <Typography><strong>Email: </strong>{userAuth.email}</Typography>

                {loading ?
                            <Box sx={{
                                display:'grid',
                                placeItems:'center'
                            }}>CARGANDO ... </Box >
                        // : 
                            // (colabsData?.length > 0) ?
                            //     <>
                                    
                                // </>       
                        :<></>
                }

                {
                    !!!loading && contactsData?.directorio?.length > 0 ?
                    <p style={{marginTop:'2rem'}}>{`Estos son tus contactos:`}</p>
                    : <p style={{marginTop:'2rem'}}> Parece que aun no tienes contactos </p>
                }

                <Grid container >
                    {
                        !!!loading && contactsData?.directorio?.length > 0 ?
                        contactsData.directorio.map((contact:any, index:number) => {
                            if(contact.lastName && contact.phone) {
                                return(
                                    <Grid item xs={4} key={index} sx={{margin:'2rem 1rem'}}>
                                        <Box>
                                            <Typography><strong>{`Nombre: `}</strong>{contact.name}</Typography>
    
                                            <Typography><strong>{`Apellidos: `}</strong>{contact.lastName}</Typography>
                                            <Typography><strong>{`Email: `}</strong>{contact.email}</Typography>
                                            <Typography><strong>{`Telefono: `}</strong>{contact.phone}</Typography>
                                        </Box>
                                    </Grid>   
                                )
                            } else {
                                return(
                                    <Grid item xs={4} key={index} sx={{margin:'2rem 1rem'}}>
                                        <Box>
                                            <Typography><strong>{`Nombre: `}</strong>{contact.name}</Typography>
                                            <Typography><strong>{`Email: `}</strong>{contact.email}</Typography>
                                        </Box>
                                    </Grid>   
                                )
                            }
                            
                        })
                        : <></>
                    }
                </Grid>

                {
                    !!!creatingUser ? 
                    <NewContact/> : <></>
                }
                <Box sx={{
                    // background:'red',
                    
                    position: creatingUser?'absolute':'relative',
                    bottom:'20px',
                    left:'0',
                    width:'100%',
                    
                    display:'grid', 
                    placeItems: 'center', 
                    alignSelf:'end',
                }}>
                    <Button variant='contained' 
                        onClick={()=>{setCreatingUser(!creatingUser)}}
                        color={creatingUser?'primary':'error'}
                        sx={{
                        fontWeight:'900', 
                        fontSize:'1.8rem', 
                        borderRadius:'50%',
                        padding:'0.5rem',
                        transform:!creatingUser?'rotate(45deg)':''
                        }}
                    >{' + '}</Button>
                </Box>
                
        </Box>        
    </>)
}

const initUser = () : AuthUser => {
    return {
        email: "",
        username: "",
        id: "",
        tokenKeystone: ""
    }
}
// import profileHandler from '../api/auth/profile';
// export const getServerSideProps = async() => {

//     let user = initUser();
//     try {
//         const response = await axios.get('/colaboradores/api/auth/profile');
//         user = response?.data && response?.data;
//     } catch(err) {
//         console.error(err);
//     }
    
//     console.log("USUARIO: ", user);
//     return {
//       props: {
//             user: user
//         }
//     }
// }
  

export default Dashboard;