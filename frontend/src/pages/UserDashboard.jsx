import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sidebar, Settings, Wallet, Receipt, User, LogOut } from 'lucide-react'
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

const UserDashboard = () => {
  const [sidebaropen, setSidebaropen] = useState(false)
  const [incomedata, setIncomedata] = useState([])
  const [expensedata, setExpensedata] = useState([])
  const [isopenprofile, setIsopenprofile] = useState(false)
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("")
  const [update, setUpdate] = useState(null)
  const [paymentMethod, setpaymentMethod] = useState("")



  const [
    loading, , , handledelete, handledeleteall, handlegetincome, handleincome, , Update, handleexpense,
    handlegetexpense,
    handledeleteexpense,
    handledeleteallexpense,
    Updateexpense, handlerlogout
  ] = useAuth()
  const navigate = useNavigate()

  const navItems = [
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

    const incomehistory = incomedata.map((items)=>({
      ...items,
      type:'income'
    }))
    const expensehistory = (expensedata.map((items)=>({
      ...items,
      type:'expense'
    })))


  const alltransactions = [...incomehistory,...expensehistory]
  console.log("alltransactions",alltransactions)

  const sortalltransactions = [...alltransactions].sort(
    (a,b)=> new Date(b.date) - new Date(a.date)
  )

  

  const fetchdata = async () => {
    const incomerec = await handlegetincome()
    const expenserec = await handlegetexpense()
    setIncomedata(incomerec)
    setExpensedata(expenserec)
  }

  useEffect(() => {
    fetchdata()
  }, [])

  const handleclick = ()=>{
    navigate("/")
  }

  const totalincome = incomedata.reduce((acc, curr) => acc + curr.amount, 0)
  const totalexpense = expensedata.reduce((acc, curr) => acc + curr.amount, 0)
  const savings = totalincome - totalexpense

  const COLORS = ["#10b981", "#f43f5e", "#6366f1"]

  const checkuser=()=>{
    console.log('clicked')
    setIsopenprofile(!isopenprofile)
  }

  const categorymap = {}
  incomedata.forEach((items) => {
    categorymap[items.category] = (categorymap[items.category] || 0) + items.amount
  })
  const data = Object.entries(categorymap).map(([key, value]) => ({ name: key, value }))

  const paymentMap = {}
  expensedata.forEach((items) => {
    paymentMap[items.paymentMethod] = (paymentMap[items.paymentMethod] || 0) + items.amount
  })
  const paymentData = Object.entries(paymentMap).map(([key, value]) => ({ name: key, value }))

  return (
    <div className='flex bg-gray-100 min-h-screen overflow-hidden'>

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
        <main className='flex-1 h-screen overflow-y-auto overflow-x-hidden'>

        {/* Header */}
        <header className='bg-white flex justify-between items-center p-4 sticky z-10 w-full top-0 shadow-sm'>
          <button
            onClick={() => setSidebaropen(!sidebaropen)}
            className='font-bold active:scale-95 lg:hidden'
          >
            <Sidebar />
          </button>
          <h1 className='font-bold text-xl sm:text-2xl'>Dashboard</h1>
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

        {/* Summary Cards */}
        <div className='p-4 sm:p-6'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>

            <div className='bg-emerald-700 rounded-xl border p-5 sm:p-6'>
              <h2 className='text-xl sm:text-2xl text-white font-bold mb-2'>Savings</h2>
              <p className='text-2xl sm:text-3xl text-white font-semibold'>₹{savings}</p>
            </div>

            <div className='bg-rose-700 rounded-xl border p-5 sm:p-6'>
              <h2 className='text-xl sm:text-2xl text-white font-bold mb-2'>Income</h2>
              <p className='text-2xl sm:text-3xl text-white font-semibold'>₹{totalincome}</p>
            </div>

            <div className='bg-indigo-700 rounded-xl border p-5 sm:p-6 sm:col-span-2 lg:col-span-1'>
              <h2 className='text-xl sm:text-2xl text-white font-bold mb-2'>Expense</h2>
              <p className='text-2xl sm:text-3xl text-white font-semibold'>₹{totalexpense}</p>
            </div>

          </div>
        </div>

        {/* Pie Charts */}
        <div className='p-4 sm:p-6'>
          <div className='flex flex-col md:flex-row gap-6 items-center justify-center'>

            {/* Income by Category */}
            <div className='bg-white rounded-xl outline-none shadow-sm p-4 w-full md:w-1/2'>
              <h3 className='text-base sm:text-lg font-semibold text-gray-700 mb-3 text-center'>
                Income by Category
              </h3>
              <ResponsiveContainer   width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius="70%"
                  >
                    {data.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Expense by Payment Method */}
            <div className='bg-white rounded-xl shadow-sm p-4 w-full md:w-1/2'>
              <h3 className='text-base sm:text-lg font-semibold text-gray-700 mb-3 text-center'>
                Expense by Payment Method
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={paymentData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius="70%"
                  >
                    {paymentData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>

        <div className='p-4 sm:p-6 '>
          <h1 className='text-2xl font-bold '>Recent history</h1>
          <div className='bg-white m-2 rounded-3xl shadow-lg overflow-x-auto w-full'>

        {/* Table Header */}
        <div
          className='grid grid-cols-5 min-w-[850px] bg-gray-100
          text-gray-700 font-semibold text-sm sm:text-lg
          px-6 py-4 border-b'
        >
          <p>Title</p>
          <p>Category</p>
          <p>Amount</p>
          <p>Date</p>
          <p>Payment</p>
        </div>

        {/* Income Records */}
      {sortalltransactions.map((items, idx) => {
        return (
          <div className='overflow-x-auto w-full' key={idx}>
            
            <div
              className='grid grid-cols-5 items-center min-w-[750px] lg:min-w-full gap-x-4
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
                    <option value="SALARY">Salary</option>
                    <option value="FREELANCE">Freelance</option>
                    <option value="BUSINESS">Business</option>
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

export default UserDashboard