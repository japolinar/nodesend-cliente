import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';
import {
    REGISTRO_EXITOSO, 
    REGISTRO_ERROR, 
    LIMPIAR_ALERTA,    
    LOGIN_EXITOSO,
    LOGIN_ERROR,    
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} from '../../type';


const AuthState = ({children}) => {

    //Definir un state inicial
    const iniciarState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        autenticado: null,
        usuario: null,
        mensaje: null
        
    }

    //Definir el reducer
    const [state, dispatch] = useReducer(authReducer, iniciarState);

    //Registrar nuevo Usuario
    const registrarUsuario = async (datos) =>{
        //console.log(datos);
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            //console.log(respuesta.data.msg);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            });            

        } catch (error) {
            //console.log(error.response.data.msg);
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            })
        }
        
        //Limpia la aterta despues de 3 segundos
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA                    
            })
        }, 3000);

    }

    //Autenticar Usuarios
    const iniciarSesion = async (datos)=>{
        //console.log(datos);
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            //console.log(respuesta.data.token);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            })
        } catch (error) {
            //console.log(error.response.data.msg);
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }

        //Limpia la aterta despues de 3 segundos
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA                    
            })
        }, 3000);

    }

    //Usuario autenticado en base de l JWT 
    const usuarioAutenticado = async () =>{
        const token = localStorage.getItem('token');
        //console.log(token);
        if(token){
            tokenAuth(token)
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth')
            //console.log(respuesta.data.usuario);
            
            if(respuesta.data.usuario){
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: respuesta.data.usuario
                })
            }
        } catch (error) {
            //console.log(error.response.data.msg);
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    const cerrarSesion = ()=>{
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion                              
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;
