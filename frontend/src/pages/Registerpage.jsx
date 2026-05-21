    import React,{useState } from 'react'
  import { Link, useNavigate } from 'react-router-dom'
    import { userregister } from '../api/authApi'


    const Registerpage = () => {

      const navigate= useNavigate()

      const [details, setDetails] = useState([])

      const [username, setUsername] = useState("")
      const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const [error, setError] = useState('')

      const handlesubmit= async (e)=>{
         e.preventDefault()

         const details = {
          username,
          email,password
         }

         if(details.username === ''|| details.email === ''|| details.password === ''){
          setError("UserName, Email or Password are Missing")
          return 
         }

         console.log("form submitted")

        try{
         const response  = await userregister(details)
         console.log(response)
         navigate('/login')
        }
        catch(err){
          if(err.reponse){
            setError(err.response.data.message)
          }
        }

         setEmail("")
         setUsername("")
         setPassword("")
         setError("")
      }

      return (
        <form onSubmit={handlesubmit} className='h-screen w-full p-4 flex items-center justify-center bg-gradient-to-br from-green-500 via-blue-500 to-red-500'>

      <div className='py-16 w-[90%] sm:w-[75%] lg:w-[40%] md:w-[40%] flex flex-col gap-15 items-center justify-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-gray-800 shadow-lg '>

        <h1 className='text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-white tracking-wide'>
            Welcome Back
        </h1>

        <input className=' w-[85%] text-white text-lg sm:text-xl text-gray-500 outline-none shadow-2xl shadow-black/40 rounded-xl px-4 py-3 '
        type="text"
        placeholder='Enter UserName'
        value={username}
         onChange={(e)=>{setUsername(e.target.value)}}
         />

        <input className=' w-[85%] text-white text-lg sm:text-xl text-gray-500 outline-none shadow-2xl shadow-black/40 rounded-xl px-4 py-3 '
        type="text"
        placeholder='gmail.com'
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
        />


         <input className=' w-[85%] text-white  text-lg sm:text-xl text-gray-500 outline-none shadow-2xl shadow-black/80 rounded-xl px-4 py-3 '
         type="password"
         placeholder='password'
         value={password}
         onChange={(e)=>{setPassword(e.target.value)}}
          />
          {
            error && 
            <p className='text-red-500 text-lg font-semibold'>{error}</p>
          }

          <button type='submit' className='text-2xl text-white bg-red-600 py-3 w-[85%] rounded-2xl uppercase transition-all font-semibold cursor-pointer active:scale-95'>Submit</button>

          <p className='text-2xl text-white font-semibold '>Already have a account <Link to={"/login"} className='text-blue-800 underline'>Login</Link></p>

      </div>
    </form>
      )
    }
    
    export default Registerpage
    