import React, {useContext} from 'react'
import Layout from '../components/Layout'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import authContext from '../context/auth/authContext'
import Alerta from '../components/Alerta'

const CrearCuenta = () => {

    //Acceder al state
    const AuthContext = useContext(authContext);
    const {mensaje, registrarUsuario } = AuthContext;    

    //Formulario y validacion con formik y yup
    const formik = useFormik({
        initialValues: {
            nombre: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El Nombre es Obligatorio').min(3, 'El nombre debe tener al menos 3 caracteres'),
            email: Yup.string().email('El email no es valido').required('El Email es Obligatorio'),
            password: Yup.string().required('El password es obligatorio').min(6, 'El password debe tener al menos 6 caracteres')
        }),
        onSubmit: (valores)=>{
            registrarUsuario(valores);
        }
    })

  return (
    <Layout>
      <div className=' md:w-4/5 xl:w-3/5 mx-auto mb-32'>
        <h2 className=' text-4xl font-sans font-bold text-gray-800 text-center my-4'>
            Crear Cuenta
        </h2>

        {mensaje && <Alerta/>}

        <div className='flex justify-center mt-5'>
            <div className='w-full max-w-lg'>
                <form 
                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                    onSubmit={formik.handleSubmit}
                >
                    <div className='mb-4'>
                        <label className='block text-black text-sm font-bold mb-2' htmlFor="nombre">
                            Nombre
                        </label>
                        <input 
                            type="text"                             
                            id="nombre"
                            className='shadow appearance-none border rounded w-full py-2 px-3 text gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                            placeholder='Nombre de Usuario'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.nombre}
                        />
                        {formik.touched.nombre && formik.errors.nombre ? (
                            <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-3'>
                                <p className='font-bold'>Error</p>
                                <p className='uppercase'>{formik.errors.nombre}</p>
                            </div>
                        ): null}
                    </div>

                    <div className='mb-4'>
                        <label className='block text-black text-sm font-bold mb-2' htmlFor="email">
                            Email
                        </label>
                        <input 
                            type="email"                             
                            id="email"
                            className='shadow appearance-none border rounded w-full py-2 px-3 text gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                            placeholder='Email del Usuario'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-3'>
                                <p className='font-bold'>Error</p>
                                <p className='uppercase'>{formik.errors.email}</p>
                            </div>
                        ): null}
                    </div>

                    <div className='mb-4'>
                        <label className='block text-black text-sm font-bold mb-2' htmlFor="password">
                            Password
                        </label>
                        <input 
                            type="password"                             
                            id="password"
                            className='shadow appearance-none border rounded w-full py-2 px-3 text gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                            placeholder='Password de Usuario'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-3'>
                                <p className='font-bold'>Error</p>
                                <p className='uppercase'>{formik.errors.password}</p>
                            </div>
                        ): null}
                    </div>

                    <input 
                        type="submit" 
                        value="Crear Usuario" 
                        className='bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold rounded-lg cursor-pointer'
                    />
                </form>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default CrearCuenta
