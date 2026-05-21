import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sidebar, Settings, Wallet, Receipt, User, LogOut,LayoutDashboard } from 'lucide-react'
import Appsidebar from '../components/SideBar'
import {
  PieChart, Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { useAuth } from '../hooks/useAuth'
import { useContext } from 'react'

const Profile = () => {
  const [sidebaropen, setSidebaropen] = useState(false)
  const [isopenprofile, setIsopenprofile] = useState(false)
  const [updatename, setupdatedname] = useState('')
  const [updateemail, setupdateemail] = useState('')
  const [incomedata, setIncomedata] = useState([])
  const [expensedata, setExpensedata] = useState([])
  const [updatedpassword, setupdatedpassword] = useState('')
  const [updatedconfirmpass, setupdatedconfirmpass] = useState('')
  const [task, settask] = useState([])
  const [updateuserdetails, setupdateuserdetails] = useState(false)
  const [
    loading, , , handledelete, handledeleteall, handlegetincome, handleincome, , Update, handleexpense,handlegetexpense,handledeleteexpense,handledeleteallexpense,Updateexpense,handlerlogout,userupdate,handlegetme]= useAuth()
    const [fetched, setfetched] = useState([])
  const navigate = useNavigate()

  const navItems = [
    {
      icon: <LayoutDashboard />,
      text: "Dashboard",
      path: "/userdashboard"
    },
    {
      icon: <Wallet />,
      text: "Income",
      path: "/income"
    },
    {
      icon: <Receipt />,
      text: "Expense",
      path: "/expense"
    },
    {
      icon: <User/>,
      text: "Profile",
      path: "/profile"
    }
  ]

  const fetchdata = async () => {
    const incomerec = await handlegetincome()
    const expenserec = await handlegetexpense()
    setIncomedata(incomerec)
    setExpensedata(expenserec)
  }

  const handlesubmit = async ()=>{
    const copytask = [...task]
    copytask.push({updatename,updateemail,updatedpassword,updatedconfirmpass})
    settask(copytask)
    await userupdate({name:updatename,email:updateemail,password:updatedpassword})
    setupdateuserdetails(false)
    setupdatedconfirmpass('')
    setupdatedname('')
    setupdateemail('')
    setupdatedpassword('')
  }

  const userdata =async()=>{ 
    const response = await handlegetme()
    const email = response.user.email
    const name = response.user.username
    setfetched({email,name})
  }


  useEffect(() => {
    fetchdata(),
    userdata()
  }, [updateuserdetails])

  const handleclick = ()=>{
    navigate("/")
  }

  const editchanges =()=>{
    setupdateuserdetails(true)
  }

  const totalincome = incomedata.reduce((acc, curr) => acc + curr.amount, 0)
  const totalexpense = expensedata.reduce((acc, curr) => acc + curr.amount, 0)
  const savings = totalincome - totalexpense

  const COLORS = ["#10b981", "#f43f5e", "#6366f1"]

  const checkuser=()=>{
    console.log('clicked')
    setIsopenprofile(!isopenprofile)
  }

  return (
    <div className='flex bg-gray-100 min-h-screen'>

      {/* Sidebar */}
      <Appsidebar
        sidebaropen={sidebaropen}
        setSidebaropen={setSidebaropen}
      >
        {navItems.map((items, index) => (
          <div key={index} className='flex p-3 hover:bg-gray-300 active:scale-95 items-center'>
            <button className='text-xl mr-4'>{items.icon}</button>
            <button
              onClick={() => navigate(items.path)}
              className='text-xl active:scale-95 cursor-pointer'
            >
              {items.text}
            </button>
          </div>
        ))}
      </Appsidebar>

      {/* Main Content */}
      <main className='flex-1 min-h-screen overflow-y-auto'>

        {/* Header */}
        <header className='bg-white flex justify-between items-center p-4 sticky top-0 z-10 shadow-sm'>
          <button
            onClick={() => setSidebaropen(!sidebaropen)}
            className='font-bold active:scale-95 lg:hidden'
          >
            <Sidebar />
          </button>
          <h1 className='font-bold text-xl sm:text-2xl'>Profile</h1>
          <div className='bg-gray-300 w-9 h-9 sm:w-10 sm:h-10 p-1 flex items-center justify-center rounded-full'>
           <button onClick={checkuser} className='flex active:scale-95 cursor-pointer hover:bg-black/40 rounded-full'> <User size={30}/></button>
           {isopenprofile && (
            <div className='relative'>
              <div className='absolute top-5 flex items-center bg-white p-3 rounded-xl active:scale-95 hover:bg-gray-300 gap-3 right-5 shadow-md h-13 z-50'>
                <button onClick={handleclick} className='flex items-center gap-2 '><LogOut size={28}/> <span className='text-red-500 '>Logout</span></button>
              </div>
            </div>
          
          )}
          </div>
          
        </header>
       
        
        {updateuserdetails
        ? (<div className='h-screen w-full bg-gray-300 flex flex-wrap justify-center'>
                <h1 className='text-4xl font-bold m-10  text-gray-900'>
                    Profile Settings
                </h1>
            <div className='h-[600px] w-[1230px] flex justify-center m-5 bg-gray-300   '>
                <div className='h-[500px] rounded-xl bg-white shadow-md flex flex-col flex-wrap  gap-7 p-13'>
                    <input value={updatename} onChange={(e)=>setupdatedname(e.target.value)} className='h-[55px] w-[245px] shadow-md bg-white rounded-xl px-5 items-center outline-none  ' placeholder='Enter you name' type="text" />
                    
                    <input value={updateemail} onChange={(e)=>setupdateemail(e.target.value)} className='h-[55px] w-[245px] shadow-md bg-white rounded-xl px-5 items-center outline-none  ' placeholder='Enter @Gmail.com' type="text" />
                    
                    <input value={updatedpassword} onChange={(e)=>setupdatedpassword(e.target.value)} className='h-[55px] w-[245px] shadow-md bg-white rounded-xl px-5 items-center outline-none ' placeholder='Change Password' type="text" />

                    <input value={updatedconfirmpass} onChange={(e)=>setupdatedconfirmpass(e.target.value)} className='h-[55px] w-[245px] shadow-md bg-white rounded-xl px-5 items-center outline-none  ' placeholder='Confirm Password' type="text" />
                <button onClick={handlesubmit} className='p-3 bg-green-500 rounded-2xl w-[245px] text-white font-semibold active:scale-95 text-xl cursor-pointer'>Save</button>
                </div>
            </div>
        </div> )
        :(
        <div className='bg-white rounded-3xl shadow-xl p-10 w-full max-w-4xl mx-auto'>

        <div className='flex items-center gap-6 border-b pb-8'>

            <div className='h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold'>
                R
            </div>

            <div>
                <h1 className='text-3xl font-bold text-gray-800'>
                    {`${fetched.name}`}
                </h1>

                <p className='text-gray-500 mt-1'>
                    Full Stack Developer
                </p>
            </div>

        </div>


    <div className='grid grid-cols-2 gap-6 mt-10'>

        <div className='bg-gray-50 p-5 rounded-2xl shadow-sm'>
            <p className='text-gray-800 text-sm'>
              {`${fetched.name}`}
            </p>

            <h1 className='text-lg font-semibold text-gray-800 mt-1'>
                
            </h1>
        </div>


        <div className='bg-gray-50 p-5 rounded-2xl shadow-sm'>
            <p className='text-gray-800 text-sm'>
                {`${fetched.email}`}
            </p>

            <h1 className='text-lg font-semibold text-gray-800 mt-1'>
                
            </h1>
        </div>

    </div>

    <div className='flex items-center justify-center p-20'>
       <div>
         <button onClick={editchanges} className='p-3 bg-red-600 text-xl w-[226px] text-white rounded-full font-semibold active:scale-95 cursor-pointer'>Edit</button>
       </div>
    </div>

        </div>)
        }

      </main>
    </div>
  )
}

export default Profile