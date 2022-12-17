import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import { useRouter } from 'next/router'

const Header = () => {

  //Router
  const router = useRouter()

  //Extraer el Usuario autenticado del Staorage
  const AuthContext = useContext(authContext);
  const {usuarioAutenticado, usuario, cerrarSesion} = AuthContext

  //Context de la aplicacion
  const AppContext = useContext(appContext);
  const {limpiarState} = AppContext

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  const redireccionar = () => {
    router.push('/');
    limpiarState();
  }


  return (
    <header className=' py-8 flex flex-col md:flex-row items-center justify-between'>
      <Link href={"/"}>
        <img onClick={ ()=> redireccionar() } src="/logo.svg" alt="Logotipo" className='w-64 mb-8 md:mb-0'/>
      </Link>

      {usuario ? (
        <div className='flex items-center'>
          <p className='mx-3 uppercase bg-indigo-200 p-2 rounded-lg'>Hola {usuario.nombre} </p>
          <button 
            type='button'
            className='bg-black px-5 py-3 rounded-lg text-white uppercase font-bold'
            onClick={()=> cerrarSesion()}
          >Cerrar Sesion</button>
        </div>
      ): (
        <div>
          <Link 
              href={"/login"} 
              className='bg-red-500 px-5 py-3 rounded-lg text-white uppercase font-bold mx-2'>
              Iniciar Secion
          </Link>
          <Link 
              href={"/crearcuenta"} 
              className='bg-black px-5 py-3 rounded-lg text-white uppercase font-bold'>
              Crear Cuenta
          </Link>
        </div>
      )}

    </header>
  )
}

export default Header
