import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout"
import Dropzone from "../components/Dropzone";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";
import Link from "next/link";
import Alerta from "../components/Alerta";

export default function Home() {

  const AuthContext = useContext(authContext);
  const {usuarioAutenticado} = AuthContext

  //Extraer el mensaje de error de archivos
  const AppContext = useContext(appContext);
  const { mensaje_archivo, url } = AppContext

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if(token){
      usuarioAutenticado();
    }

  }, []);

  return (
    <Layout>     

      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        {url ? (
          <>
            <p className="text-center text-2xl"> 
              <span className="fond-bold text-red-700 uppercase text-3xl ippercase">Tu url es:</span> 
              {`${process.env.frontendURL}/enlaces/${url}`} 
            </p>

            <button 
              type="submit"               
              className='bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold rounded-lg cursor-pointer mt-10'
              onClick={ () => navigator.clipboard.writeText(`${process.env.frontendURL}/enlaces/${url}`)}
            >copiar enlace</button>
          </>  
        ) : (
          <>          
            {mensaje_archivo && <Alerta/> }

            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
              
              <Dropzone/>
              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                <h2 className="text-4xl font-sans font-bold text-gray-600 my-4">
                  Compartir Archivos de forma sencilla y privada
                </h2>

                <p className="text-lg leading-loose">
                  <span className="text-red-500 font-bold">
                    ReactNodeSend 
                  </span>
                  Te permite compartir archivos privadosLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis laoreet est. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque ipsum lacus, euismod sit amet est vitae 
                </p>

                <Link 
                  href={"/crearcuenta"} 
                  className="text-red-500 font-bold text-lg hover:text-red-700"
                >
                Crea una cuenta para mejores beneficios
                </Link>

              </div>
            </div>
          </>
        )}

      </div>

      
    </Layout>
  )
}
