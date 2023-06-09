import axios from 'axios';
import{useState, useEffect} from 'react';
// import DashboardGrid from '@/components/DashboardGrid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {AuthUser, DashboardType} from '../../utils/types';

const Dashboard = (props:DashboardType) => {
    const [colabsData, setColabsData] = useState([])
    const [loading, setLoading] = useState(false);
    const [userAuth, setUserAuth] = useState<AuthUser>(initUser)
    
    // useEffect(()=>{
    //     const getProfile = async () => {
    //         const response = await axios.get('/colaboradores/api/auth/profile');
    //         console.log(response.data);
    //         setUserAuth(response.data);
    //     }

    //     getProfile();
    // }, []);

    // useEffect(()=> {
    //     const getColabs = async () =>{
    //         setLoading(true);
    //         try {
    //             const r = await axios.post('/colaboradores/api/talk/colabsDashboard', {
    //                 data: userAuth, 
    //             });
    //             setColabsData(r.data);
    //             setLoading(false);
    //         } catch(err) {
    //             setLoading(false);
    //             console.error("ERROR: ", err);
    //             // router.push('/login')
    //         }
    //     }
    //     getColabs();
    // }, [userAuth])

    // console.log(userAuth.rol);

    return (
    <>
        <Box sx={{
                margin:{
                    xl:'2rem auto', 
                    lg:'2rem 1.5rem',
                    md:'1rem 1rem',
                    sm:'0.5rem 0.5rem',
                    xs:'0 1rem'}, 
                maxWidth:'1440px'
            }}>
            <Paper elevation={0} sx={{borderRadius:'16px', padding:{xs:'0 0rem', md: '0'}}}>
                <Typography
                    paddingTop={4}
                    marginTop={2}
                    marginBottom={2}
                    marginLeft={{xs:2, md:4}} 
                    variant='h4'>
                    {`Hola ${userAuth.username !== "" ? (userAuth.username) : "Usuario"}`}
                </Typography>

                <Box sx={{padding:'1rem 2rem 2rem'}}>
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
                </Box>
            </Paper>  
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