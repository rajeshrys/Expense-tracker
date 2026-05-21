import {
  Sidebar,
  Receipt,
  LayoutDashboard,
  Wallet,User,LogOutIcon,
} from 'lucide-react'

import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Appsidebar from '../components/SideBar'
import {useAuth} from '../hooks/useAuth'
import ProtectedRoute from '../routes/ProtectedRoute'

const Expense = () => {

  const [loading, , ,handledelete,handledeleteall,handlegetincome,handleincome, ,Update, handleexpense,
    handlegetexpense,
    handledeleteexpense,
    handledeleteallexpense,
    Updateexpense,handlerlogout ] = useAuth()

  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("")
  const [paymentMethod, setpaymentMethod] = useState("")
  const [error, setError] = useState({})
  const [update, setUpdate] = useState(null)
  const [sidebaropen, setSidebaropen] = useState(false)
  const [task, setTask] = useState([])
  const [editchange, setEditchange] = useState("")
  const [editindex, setEditindex] = useState(null)
  const [openProfile , setOpenProfile ] = useState(false)


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
  


  const handlesubmit = async (e) => {
    let record = {}

    record = {amount,title,category,date,paymentMethod}

    e.preventDefault()

    let newErrors = {}
    
    if (title.trim() === "") {
      newErrors.title = "Title is required"
    }
    
    if (amount.trim() === "") {
      newErrors.amount = "Amount is required"
    }
    
    if (category.trim() === "") {
      newErrors.category = "Category is required"
    }
    
    if (date.trim() === "") {
      newErrors.date = "Date is required"
    }
    
    if (paymentMethod.trim() === "") {
      newErrors.paymentMethod = "Payment Method is required"
    }
    
    
    setError(newErrors)
    
    if (Object.keys(newErrors).length > 0) {
      return
    }else{
      console.log("Form Submitted")
    }
    
    const copyTask = [...task]

    
    copyTask.push(record)

    setTask(copyTask)
    
    await handleexpense(record)
    

    console.log(copyTask)


  }
  const checkuser=()=>{
    setOpenProfile(!openProfile)
    console.log('clicked')
  }
  const handlelogout= async()=>{
    console.log('clicked')
    await handlerlogout()
    navigate("/login")
  }

 async function getdata(){

  let details = [{}]

  const response = await handlegetexpense()

  const copytask = [...response]

  setTask(copytask)

  console.log("Successfully setTask")


}

  const deletes = async (idx)=>{
    console.log("delete clicked")
    console.log(idx)
    const copyTask = [...task]
    const id = copyTask.splice(idx,1)
    await handledeleteexpense(id[0]._id)
    setTask(copyTask) 
 
  }

  const deleteall = async()=>{
    console.log('delete all clicked')
    let copyTask = [...task]
    console.log(copyTask[0].user)
    await handledeleteallexpense(copyTask[0].user)
    copyTask.splice([])
    setTask(copyTask)
  }

  
  const updateincome = async() => {
        const copyTask = [...task]
        copyTask[editindex]=editchange
        await Updateexpense(editchange,task[editindex]._id)
        setTask(copyTask)
  }




  useEffect(() => {
    getdata()
    console.log("hello")
  }, [])
  

  

  

  return (
    <div className='flex min-h-screen overflow-hidden bg-gray-200 '>
      <div className=' sticky top-0 left-0 z-40 h-screen '>
        {/* Sidebar */}
      {sidebaropen && (
        <div
          className='fixed inset-0 z-30 lg:hidden'
          onClick={() => setSidebaropen(false)}
        />
      )}
      <Appsidebar
        sidebaropen={sidebaropen}
        setSidebaropen={setSidebaropen}
      >

        {navItems.map((items, index) => {
          return (
            <div
              key={index}
              className='flex p-3 hover:bg-gray-300 active:scale-95 items-center'
            >
              <button className='text-xl mr-4'>
                {items.icon}
              </button>

              <button
                onClick={() => navigate(items.path)}
                className='text-lg sm:text-xl cursor-pointer'
              >
                {items.text}
              </button>
            </div>
          )
        })}

      </Appsidebar>
      </div>

      {/* Main Content */}
      <main className='flex-1 h-screen overflow-y-scroll overflow-x-hidden'>

        {/* Header */}
        <header className='sticky top-0 z-50 bg-white flex justify-between items-center p-4 shadow-sm'>

          <button
            onClick={() => setSidebaropen(true)}
            className='lg:hidden active:scale-95'
          >
            <Sidebar />
          </button>

          <h1 className='font-bold text-xl sm:text-2xl'>
            Expense
          </h1>

          <div className='relative'>
            <div className='bg-gray-300 w-10 h-10 flex items-center justify-center rounded-full'>
            <button onClick={checkuser}><User size={30}/></button>
          </div>
          {
        openProfile && (

          <div
            className='absolute flex items-center justify-center right-0 mt-3 w-40 bg-white shadow-lg rounded-xl p-3 z-50'
          >
            <button onClick={handlelogout}
              className='w-full flex items-center gap-2 text-left text-red-500 active:scale-95 hover:bg-gray-200 p-2 rounded-lg'><p className='hover:bg-gray-200 cursor-pointer cursor-pointer'><LogOutIcon /></p>Logout</button>

          </div>

        )
      }
                
          </div>

        </header>

        {/* Form */}
        <form  
          onSubmit={handlesubmit}
          className='p-4 sm:p-8'
        >

          <h1 className='text-2xl sm:text-3xl font-bold mb-10 text-center sm:text-left'>
            Fill the Details:
          </h1>

          <div className='flex flex-wrap gap-6 sm:gap-8 justify-center'>

            {/* Title */}
            <div className='flex flex-col w-full sm:w-auto'>
              <input
                value={title}
                name='title'
                onChange={(e) => setTitle(e.target.value)}
                className='w-full sm:w-72 px-4 py-3 rounded-2xl bg-white border border-gray-200
                shadow-md focus:ring-2 focus:ring-blue-400 outline-none text-base sm:text-lg'
                type="text"
                placeholder='Enter Title'
              />

              {error.title && (
                <p className='text-red-500 text-sm mt-2 ml-1'>
                  {error.title}
                </p>
              )}
            </div>

            {/* Amount */}
            <div className='flex flex-col w-full sm:w-auto'>
              <input
                name='amount'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className='w-full sm:w-72 px-4 py-3 rounded-2xl bg-white border border-gray-200
                shadow-md focus:ring-2 focus:ring-blue-400 outline-none text-base sm:text-lg
                [appearance:textfield]
                [&::-webkit-outer-spin-button]:appearance-none
                [&::-webkit-inner-spin-button]:appearance-none'
                type="number"
                placeholder='Enter Amount'
              />

              {error.amount && (
                <p className='text-red-500 text-sm mt-2 ml-1'>
                  {error.amount}
                </p>
              )}
            </div>

            {/* Category */}
            <div className='flex flex-col w-full sm:w-auto'>
              <select
                name='amount'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='w-full sm:w-72 px-4 py-3 rounded-2xl bg-white border border-gray-200
                shadow-md focus:ring-2 focus:ring-blue-400 outline-none text-base sm:text-lg'
              >
                <option value="">
                  Select Category
                </option>

                <option value="FOOD">
                  FOOD
                </option>

                <option value="HEALTH">
                  HEALTH
                </option>

                <option value="SHOPPING">
                  SHOPPING
                </option>

              </select>

              {error.category && (
                <p className='text-red-500 text-sm mt-2 ml-1'>
                  {error.category}
                </p>
              )}
            </div>

            {/* Date */}
            <div className='flex flex-col w-full sm:w-auto'>
              <input
                value={date}
                name='amount'
                onChange={(e) => setDate(e.target.value)}
                className='w-full sm:w-72 px-4 py-3 rounded-2xl bg-white border border-gray-200
                shadow-md focus:ring-2 focus:ring-blue-400 outline-none text-base sm:text-lg'
                type="date"
              />

              {error.date && (
                <p className='text-red-500 text-sm mt-2 ml-1'>
                  {error.date}
                </p>
              )}
            </div>

            {/* Payment Method */}
            <div className='flex flex-col w-full sm:w-auto'>
              <select
                name='amount'
                value={paymentMethod}
                onChange={(e) => setpaymentMethod(e.target.value)}
                className='w-full sm:w-72 px-4 py-3 rounded-2xl bg-white border border-gray-200
                shadow-md focus:ring-2 focus:ring-blue-400 outline-none text-base sm:text-lg'
              >
                <option value="">
                  Select Payment Method
                </option>

                <option value="UPI">
                  UPI
                </option>

                <option value="CASH">
                  Cash
                </option>

                <option value="CHEQUE">
                  Cheque
                </option>

              </select>

              {error.paymentMethod && (
                <p className='text-red-500 text-sm mt-2 ml-1'>
                  {error.paymentMethod}
                </p>
              )}
            </div>

          </div>

          {/* Button */}
          <div className='flex justify-center mt-12'>
            <button
              type='submit'
              name='submit'
              className='bg-red-500 hover:bg-red-400 px-6 sm:px-8 py-3
              rounded-2xl text-lg sm:text-xl font-semibold text-white
              active:scale-95 transition-all duration-200 w-full sm:w-auto'
            >
            Submit
            </button>
          </div>

        </form>
        
        {/* Income Records Section */}
    <div className='mt-10 sm:mt-16 px-3 sm:px-6 w-full overflow-x-auto'>

      <div className='flex flex-col sm:flex-row gap-4 sm:gap-0 items-center justify-between mb-8'>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
          Expense Records
        </h1>

        <button onClick={deleteall}
          className='bg-red-600 hover:bg-blue-400 text-white
          px-5 py-2 rounded-xl font-semibold shadow-md
          active:scale-95 transition-all duration-200'
        >
          Delete All
        </button>
      </div>

    <div className='bg-white rounded-3xl shadow-lg overflow-x-auto w-full'>

        {/* Table Header */}
        <div
          className='grid grid-cols-7 min-w-[850px] bg-gray-100
          text-gray-700 font-semibold text-sm sm:text-lg
          px-6 py-4 border-b'
        >
          <p>Title</p>
          <p>Category</p>
          <p>Amount</p>
          <p>Date</p>
          <p>Payment</p>
          <p>Option1</p>
          <p>Option2</p>
        </div>

        {/* Income Records */}
{task.map((items, idx) => {
  return (
    /* The outer container handles the horizontal scrolling */
    <div className='overflow-x-auto w-full' key={idx}>
      {/* 
        1. Changed min-w to min-w-[750px] so it forces a horizontal scroll on mobile
        2. Added gap-x-4 to put clean spacing between columns
        3. Removed overflow-y-scroll 
      */}
      <div
        className='grid grid-cols-7 items-center min-w-[750px] lg:min-w-full gap-x-4
        px-6 py-5 border-b hover:bg-gray-50
        transition-all duration-200 text-sm sm:text-sm md:text-base'
      >

        {/* TITLE */}
        {
          update === idx
          ? (
            <input
              value={editchange.title}
              onChange={(e)=>{
                setEditchange({
                  ...editchange,
                  title: e.target.value
                })
              }}
              className='border px-2 py-1 rounded'
              type="text"
            />
          )
          : (
            <p className='font-medium text-gray-800 break-words'>
              {items.title}
            </p>
          )
        }

        {/* CATEGORY */}
        {
          update === idx
          ? (
            <select
              value={editchange.category}
              onChange={(e)=>{
                setEditchange({
                  ...editchange,
                  category: e.target.value
                })
              }}
              className='border px-2 py-1 rounded'
            >
              <option value="FOOD">FOOD</option>
              <option value="HEALTH">HEALTH</option>
              <option value="SHOPPING">SHOPPING</option>
            </select>
          )
          : (
            <p className='text-gray-600 break-words'>
              {items.category}
            </p>
          )
        }

        {/* AMOUNT */}
        {
          update === idx
          ? (
            <input
              value={editchange.amount}
              onChange={(e)=>{
                setEditchange({
                  ...editchange,
                  amount: e.target.value
                })
              }}
              className='border px-2 py-1 rounded'
              type="number"
            />
          )
          : (
            <p className='font-semibold text-green-600'>
              ₹{items.amount}
            </p>
          )
        }

        {/* DATE */}
        {
          update === idx
          ? (
            <input
              value={editchange.date?.slice(0,10)}
              onChange={(e)=>{
                setEditchange({
                  ...editchange,
                  date: e.target.value
                })
              }}
              className='w-[122px] lg:w-[132px] border px-2 py-1 rounded'
              type="date"
            />
          )
          : (
            <p className='text-gray-600'>
              {items.date?.slice(0,10)}
            </p>
          )
        }

        {/* PAYMENT METHOD */}
        {
          update === idx
          ? (
            <select
              value={editchange.paymentMethod}
              onChange={(e)=>{
                setEditchange({
                  ...editchange,
                  paymentMethod: e.target.value
                })
              }}
              className='border px-2 py-1 rounded'
            >
              <option value="UPI">UPI</option>
              <option value="CASH">Cash</option>
              <option value="CHEQUE">Cheque</option>
            </select>
          )
          : (
            <div>
              <span
                className='bg-blue-100 text-blue-600
                px-3 py-1 rounded-full text-xs sm:text-sm sm:px-3 font-semibold'
              >
                {items.paymentMethod}
              </span>
            </div>
          )
        }

        {/* DELETE */}
        <div>
          <button
            onClick={()=>{
              deletes(idx)
            }}
            className='text-sm sm:text-xl text-white bg-red-600 px-3 sm:px-4 py-2 rounded-xl active:scale-95 font-semibold hover:bg-red-400 cursor-pointer'
          >
            Delete
          </button>
        </div>

        {/* UPDATE / SAVE */}
        <div>
          {
            update === idx
            ? (
              <button
                onClick={()=>{
                  setUpdate(null)
                  updateincome()
                }}
                className='text-sm sm:text-xl text-white bg-green-600 px-3 sm:px-4 py-2 rounded-xl active:scale-95 font-semibold hover:bg-green-400 cursor-pointer'
              >
                Save
              </button>
            )
            : (
              <button
                onClick={()=>{
                  setEditindex(idx)
                  setEditchange(task[idx])
                  setUpdate(idx)
                }}
                className='text-sm sm:text-xl text-white bg-green-600 px-3 sm:px-4 py-2 rounded-xl active:scale-95 font-semibold hover:bg-green-400 cursor-pointer'
              >
                Update
              </button>
            )
          }
        </div>

      </div>
    </div>
  )
})}

      </div>
    </div>

      </main>

    </div>
  )
}

export default Expense
