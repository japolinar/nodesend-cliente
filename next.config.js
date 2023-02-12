// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true
  
// }

module.exports = {
  env: {
    //backendURL: 'http://localhost:4000',
    // backendURL: 'http://127.0.0.1:4000',    
    // frontendURL: 'http://localhost:3000'

    backendURL: 'https://nodesend-servidor-production.up.railway.app',  //<-- aca colocar la URL de "railway"
    frontendURL: 'https://nodesend-cliente-plum.vercel.app'             //<-- aca colocar la URL de "vercel"
  }
}
