export type usuarioType = {
	id: string
	nombre: string
}

export type actsType = {
	id?:string
	titulo?:string
	slug?:string
}

export type infoType = {
	usuarioCreador: usuarioType
	id: string
	titulo: string
	subtitulo: string
	slug: string
	tipoActividad: string
	tipoActividadOtro: string
	modo: string
	personaOrganizadora:string
	personasObjetivo:string
	cupo:string
	tieneRegistro:boolean | null
	fechaInicioGlobal:string
	fechaFinalGlobal:string
	resumenSesiones:string
	copy:string
	introduccion:string
	contenido:string
	semblanza:string
	contacto:string
	urlDriveImages:string
	urlDriveLogos:string
	comentarios:string
	requerimientosMobiliario: boolean | null
	requerimientosInternet: boolean | null
	requerimientosHardware: boolean | null
	requerimientosSoftware: boolean | null
	requerimientosPapeleria: boolean | null
	requerimientosOtro: boolean | null
	requerimientosOtroExtras:string
	notas:string
}

export type userDataType= {
    email: "",
    username: "",
    id: "",
    token: ""
} 

export type infoFormType = {
	isDisabled: boolean
	data: infoType
	isNew: boolean
	children: React.ReactNode;
}

export type checkboxType = {
	requerimientosMobiliario: boolean | null
	requerimientosInternet: boolean | null
	requerimientosHardware: boolean | null
	requerimientosSoftware: boolean | null
	requerimientosPapeleria: boolean | null
	requerimientosOtro: boolean | null
}

export function createInfoType():infoType {
    const infoEmpty : infoType = {
    usuarioCreador: {
        id: "",
        nombre: ""
    },
	id: "",
	titulo: "",
	subtitulo: "",
	slug: "",
	tipoActividad: "",
	tipoActividadOtro: "",
	modo: "",
	personaOrganizadora: "",
	personasObjetivo: "",
	cupo: "",
	tieneRegistro: null,
	fechaInicioGlobal: "",
	fechaFinalGlobal: "",
	resumenSesiones: "",
	copy: "",
	introduccion: "",
	contenido: "",
	semblanza: "",
	contacto: "",
	urlDriveImages: "",
	urlDriveLogos: "",
	comentarios: "",
	requerimientosMobiliario: null,
	requerimientosInternet: null,
	requerimientosHardware: null,
	requerimientosSoftware: null,
	requerimientosPapeleria: null,
	requerimientosOtro: null,
	requerimientosOtroExtras: "",
	notas: "",

    }
    return infoEmpty; 
}

export type DashboardItemProps = {
    slug?: string
    titulo?: string
    colaborador?: string
}

export type DashboardItemInfoType = {
    id: string
    slug: string
    subtitulo: string
    titulo: string
    usuarioCreador: Array<usuarioType>
}

export type DashboardGridProps = {
    list: Array<DashboardItemInfoType>
}

type ext = {
    email: string
    username: string
    id: string
    tokenKeystone: string
}
import {JwtPayload} from 'jsonwebtoken';
export type extendedJWT = JwtPayload & ext

export type AuthUser = {
    email: string
    username: string
    id: string
	rol?: string
    tokenKeystone: string
}
export type DashboardType = {
    user : AuthUser
}