import React, {useState, useContext} from 'react'
import appContext from '../context/app/appContext';

const Formulario = () => {

    const [tienePassword, setTienePassword] = useState(false);

     //Context de la APP
     const AppContext = useContext(appContext);
     const {agregarPassword, agregarDescargas} = AppContext    

  return (
    <div className='w-full mt-20'>
        <div>
            <label htmlFor="form" className='text-lg text-gray-800 flex text-right'>Eliminar trans:</label>
            <select 
                name="" 
                id="form" 
                className='appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-2 px-4 pr-8 rounded focus:outline-none focus:border-gray-500'
                onChange={(e)=> agregarDescargas(parseInt(e.target.value))}        
            >
                <option value="" selected disabled>--Seleccione--</option>
                <option value="1">1 Descarga</option>
                <option value="5">5 Descargas</option>
                <option value="10">10 Descargas</option>
                <option value="20">20 Descargas</option>
            </select>
        </div> 

        <div className='mt-4'>
            <div className='flex justify-between items-center'>
                <label htmlFor="" className='text-lg text-gray-800 flex text-right'>Proteger contraseña</label>
                <input type="checkbox" name="" id="" onChange={()=> setTienePassword(!tienePassword)}/>                
            </div>

            {tienePassword ? (
                <input 
                type="password" 
                name="" 
                id="" 
                className='appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-2 px-4 pr-8 rounded focus:outline-none focus:border-gray-500'
                placeholder='Coloque un password'
                onChange={(e)=> agregarPassword(e.target.value)}
            />
            ) : null}
            
        </div>     
    </div>
  )
}

export default Formulario
