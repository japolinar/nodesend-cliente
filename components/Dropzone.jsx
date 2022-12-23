import React, { useCallback, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import clienteAxios from '../config/axios'
import appContext from '../context/app/appContext'
import authContext from '../context/auth/authContext'
import Formulario from './Formulario'

const Dropzone = () => {

    //Context de la APP
    const AppContext = useContext(appContext);
    const {mostrarAlerta, subirArchivos, cargando, crearEnlace} = AppContext    

    //Context de autenticacion
    const AuthContext = useContext(authContext);
    const { usuario, autenticado} = AuthContext    

    const onDropRejected = () => {
        //console.log('No se puede subir');
        mostrarAlerta('No se pudo subir el archivo, El limite es de 1MB obten una cuenta gratis para subir archivos mas grandes');
    }

    const onDropAccepted = useCallback( (acceptedFiles) => {
        //console.log(acceptedFiles);      

        //Crear un form Date
        const formData = new FormData();
        formData.append('archivo', acceptedFiles[0])
        //console.log(acceptedFiles[0].path);   

        subirArchivos(formData, acceptedFiles[0].path)        

    },  [] /*No olvidar el arreglo vacio */ )

    //Extaer contenido de Dropzone
    const { getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 });

    const archivos = acceptedFiles.map( archivo => (
        <li 
            key={archivo.lastModified}           
            className="bg-white flex-1 p-3 mt-4 shadow-lg rounded"
        >
            <p className='font-bold text-xl'>{archivo.path}</p>
            <p className='text-sm text-gray-500'> { (archivo.size /Math.pow(1024, 2)).toFixed(2) } MB</p>
        </li>
    ))    


  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex  flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-200 px-4 rounded"> 

        { acceptedFiles.length > 0 ? (
            <div className='mt-10 w-full text-center'>
                <h4 className='text-2x1 font-bold mb-4 uppercase'>Archivos</h4>
                <ul>
                    {archivos}
                </ul>
                {autenticado ? <Formulario/> : ''}

                {cargando ? <p className='my-10 text-center text-gray-700'>Subuendo Archivo</p> : (
                    <button 
                        type='button'
                        className='bg-blue-700 w-full py-3 rounded-lg text-white uppercase font-bold my-10 hover:bg-blue-800 hover:shadow-lg'
                        onClick={ () => crearEnlace() }
                    >Crear Enlace</button>
                )}
            </div>

        ) : (
            <div {...getRootProps({className: 'dropzone w-full py-32'})}>
                <input className="h-100" {...getInputProps()} />

                {
                    isDragActive ? <p className='text-2x1 text-center text-gray-600'>Suelta el archivo</p> :
                    <div className='text-center'>
                        <p className='text-2x1 text-center text-gray-600'>Seleciona un archivo y arrastralo aqui</p>

                        { cargando ? <p className='my-10 text-center text-gray-700'>Subuendo Archivo</p> :(
                            <button 
                                className='bg-blue-700 w-full py-3 rounded-lg text-white uppercase font-bold my-10 hover:bg-blue-800 hover:shadow-lg'
                                type='button'
                                >Seleciona Archivo para subir
                            </button>
                        )}
                    </div>
                }
            </div>
        ) }       
        
    </div>
  )
}

export default Dropzone
