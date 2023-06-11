import { Box, Typography, Paper, Button } from "@mui/material"
import axios from "axios"
import { useRouter } from "next/router"

type ContactCardPros = {
    id?:string
    name?: string
    lastName?: string
    email?: string
    phone?: string
}
const ContactCard = ({name, lastName, email, phone, id}: ContactCardPros) => {
    const router = useRouter();
    const handleClick = async (e:any) => {
        e.preventDefault();
        console.log("MY ID: ",id)
        try {
            const deleteThis = await axios.post('/api/talk/deleteContact', {id})
            // console.log("ELIMINDAO:", deleteThis)
            if(deleteThis.status === 200) {
                router.reload();
            }
        } catch(err) {
            console.error("ERROR LOG: ", err);
        }
    }
    return(
        <Paper elevation={1}>
            <Box m={2} pt={2} pb={1} 
            color={'info'}
            sx={{
                minHeight:'140px',
                position:'relative'
            }}>
                <Typography><strong>{`Nombre: `}</strong>{name}</Typography>
                {lastName?<Typography><strong>{`Apellidos: `}</strong>{lastName}</Typography>:<></>}
                <Typography><strong>{`Email: `}</strong>{email}</Typography>
                {phone?<Typography><strong>{`Telefono: `}</strong>{phone}</Typography>:<></>}
                <Button variant="text" size="small" color='error'
                    onClick={handleClick}
                    sx={{
                        position:'absolute',
                        bottom:'8px',
                        right:'8px'
                    }}
                >{`Eliminar`}</Button>
            </Box>
        </Paper>
    )
}

export default ContactCard;