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
import ContactCard from '@/components/ContactCard';

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
        setCreatingUser(false)
    }, []);

    useEffect(()=> {
        const getContacts = async () =>{
            setLoading(true);
            try {
                const r = await axios.post('/api/talk/dashboard', {
                    data: userAuth, 
                });
                const aC = await axios.post('/api/talk/manyContacts', r.data.data.directorio)
                // console.log("ALLLLLLLLL:" ,aC.data);
                setContactsData(aC.data);
                setLoading(false);
            } catch(err) {
                setLoading(false);
                console.error("ERROR: ", err);
                // router.push('/login')
            }
        }
        getContacts();
    }, [userAuth])

    console.log(contactsData);
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
                    marginBottom={1}
                    variant='h6'>
                    {`Bienvenido`} 
                </Typography>
                <Typography variant='h4' marginBottom={2}>{` ${userAuth.username !== "" ? (userAuth.username) : "Usuario"}`}</Typography>
                <Typography variant='body2'><strong>Tu email es: </strong>{userAuth.email}</Typography>

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
                    !!!loading && contactsData?.length > 0 ?
                    <Typography style={{marginTop:'2rem'}} variant='subtitle2' >{`Estos son tus contactos:`}</Typography>
                    : <Typography style={{marginTop:'2rem'}} variant='subtitle2'> Parece que aun no tienes contactos </Typography>
                }

                <Grid container rowSpacing={2} mt={2} columnSpacing={1}>
                    {
                        !!!loading && contactsData?.length > 0 ?
                        contactsData.map((contact:any, index:number) => {
                            return(

                                <Grid item xs={12} md={4} key={index}>
                                    <ContactCard
                                        key={index}
                                        id={contact._id??``}
                                        name={contact.name??``}
                                        lastName={contact.lastName??``}
                                        email={contact.email??``}
                                        phone={contact.phone??``}
                                    />
                                </Grid>   
                                
                            )
                            
                        })
                        : <></>
                    }
                </Grid>

                {
                    creatingUser === true ? 
                    <NewContact/> : <></>
                }
                <Box sx={{
                    // background:'red',
                    position: !creatingUser?'sticky':'relative',
                    bottom:'20px',
                    left:'0',
                    width:'100%',
                    display:'grid', 
                    placeItems: 'center', 
                    alignSelf:'end',
                }}>
                    <Button variant='contained' 
                        onClick={()=>{setCreatingUser(!creatingUser)}}
                        color={!creatingUser?'primary':'error'}
                        sx={{
                        fontWeight:'900', 
                        fontSize:'1.8rem', 
                        borderRadius:'50%',
                        padding:'0.5rem',
                        transform:creatingUser?'rotate(45deg)':'',
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
  

export default Dashboard;