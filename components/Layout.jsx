import React from 'react'
import Head from 'next/head'
import Header from './Header'

const Layout = ({children}) => {
  return (
    <>
      <Head>
        <title>NodeSend con Next</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />        
        <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="styleSheet"/>
      </Head>    
    
     <div className='  bg-gray-100 min-h-screen'>
      <div className=' container mx-auto'>
        <Header></Header>
        <main className=' mt-20'>
          {children} 
        </main>
      </div>
     </div>
    </>
  )
}

export default Layout
