import {verify} from 'jsonwebtoken';
import { extendedJWT } from '@/utils/types';
const extendUse = (verifiedToken : any, token: string): extendedJWT => {
    const original = verify(verifiedToken, token);
    if(typeof original === 'object') {
        return { 
            ...original,
            email: original.email ? original.email : '',
            username: original.name ? original.name : '',
            id: original.id ? original.id : '',
            tokenKeystone: original.tokenKeystone ? original.tokenKeystone : '',
        }
    
        
    } else {
        return {
            key: original,
            email: '',
            username: '',
            id: '',
            tokenKeystone: '',
        }
    }
}

export default extendUse;