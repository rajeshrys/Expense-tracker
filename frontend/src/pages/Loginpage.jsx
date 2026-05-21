import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'


const LoginPage = () => {

  const navigate = useNavigate()

  const [loading,handlelogin] = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

   const handlesubmit= async (e)=>{
           e.preventDefault()
           
            await handlelogin({email,password})
            navigate('/userdashboard')
            console.log("form submitted")
           setEmail("")
           setPassword("")
      }
        
      if(loading){
        return <main><h1>Loading......</h1></main>
      }
      
      

  return (
    <form onSubmit={handlesubmit} className='h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-500 via-blue-500 to-red-500 px-3 sm:px-4'>

      <div className='py-10 sm:py-16 min-h-[90%] sm:h-[97%] w-full sm:w-[75%] md:w-[60%] lg:w-[40%] flex flex-col gap-8 sm:gap-15 items-center justify-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-gray-800 shadow-lg px-4 sm:px-6'>

    <h1 className='text-3xl sm:text-5xl text-center font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-white tracking-wide'>
        Welcome Back
    </h1>

        <input className='w-full sm:w-auto text-base sm:text-2xl text-white outline-none shadow-2xl shadow-black/40 rounded-xl px-4 py-3 bg-transparent'
        type="text"
        placeholder='gmail.com'
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
         />

         <input className='w-full sm:w-auto text-base sm:text-2xl text-white outline-none shadow-2xl shadow-black/80 rounded-xl px-4 py-3 bg-transparent'
         type="password"
         placeholder='password'
         value={password}
         onChange={(e)=>{setPassword(e.target.value)}}
          />

          <button type='submit' className='text-lg sm:text-2xl w-full sm:w-[53%] text-white bg-red-600 py-3 px-9 rounded-2xl uppercase transition-all font-semibold cursor-pointer active:scale-95'>Submit</button>

          <p className='text-base sm:text-2xl text-center text-white font-bold'>
            Create an account <Link to={"/register"} className='text-blue-800 underline'>Register</Link>
          </p>
      </div>
    </form>
  )
}

export default LoginPage
