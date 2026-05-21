import {useContext} from 'react'
import { AuthContext } from '../Context/Authcontext'
import { userregister,userlogin,userincome, incomerecords,updatedelete,deleteall,updateone,   userexpense,
    expenserecords,
    deleteexpense,
    deleteallexpense,
    updateexpense,logoutuser,updateuser,getmeuser } from '../api/authApi'

export const useAuth = () =>{
    const context = useContext(AuthContext)
    const {user,setUser,loading,setLoading} = context

    const handlelogin = async({email,password})=>{
        setLoading(true)
        try{
        const data = await userlogin({email,password})
        console.log(data)
        localStorage.setItem('token',data.token)
        setUser(data.user)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }


    const handleregister = async({username,email,password})=>{
        try{
        const data = await userlogin({username,email,password})
        console.log(data)
        setUser(data.user)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

     const handleincome= async({amount,title,category,date,paymentMethod})=>{
        console.log(amount,title,category,date,paymentMethod)
        setLoading(true)
        try{
            const data = await userincome({amount,title,category,date,paymentMethod})
            console.log("data",data)
            setUser(data.user)
        }catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }


    const handlegetincome = async()=>{
        try{
            const data = await incomerecords()
            return data.getincomes
            setLoading(data.user)
        }
        catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

    const handledelete = async (id)=>{
        setLoading(true)
        try{
            const data = await updatedelete(id)
        }
        catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

    const handledeleteall = async(userId)=>{
        setLoading(true)
        try{
            const data = await deleteall(userId)
            console.log(data)
        }
        catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

    const Update = async (userData,id)=>{
        setLoading(true)
        try{
            const data = await updateone(userData,id)
            console.log(data)
        }catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

    const handleexpense = async({amount,title,category,date,paymentMethod})=>{

    setLoading(true)

    try{

        const data = await userexpense({
            amount,
            title,
            category,
            date,
            paymentMethod
        })

        console.log(data)

    }catch(err){
        console.log(err)
    }
    finally{
        setLoading(false)
    }
}

const handlegetexpense = async()=>{

    try{

        const data = await expenserecords()

        return data.getexpenses

    }catch(err){
        console.log(err)
    }
    finally{
        setLoading(false)
    }
}
const handledeleteexpense = async(id)=>{

    setLoading(true)

    try{

        const data = await deleteexpense(id)

        console.log(data)

    }catch(err){
        console.log(err)
    }
    finally{
        setLoading(false)
    }
}

const handledeleteallexpense = async()=>{

    setLoading(true)

    try{

        const data = await deleteallexpense()

        console.log(data)

    }catch(err){
        console.log(err)
    }
    finally{
        setLoading(false)
    }
}
const Updateexpense = async(userData,id)=>{

    setLoading(true)

    try{

        const data = await updateexpense(userData,id)

        console.log(data)

    }catch(err){
        console.log(err)
    }
    finally{
        setLoading(false)
    }
}

const handlerlogout = async ()=>{
    setLoading(true)
    try{
        const data = await logoutuser()
    }
    catch(err){
        console.log(err.message)
    }
    finally{
        setLoading(false)
    }
}
    const userupdate = async (userData)=>{
        setLoading(true)
        try{
            const data = await updateuser(userData)
            console.log(data)
            return data
        }catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

       const handlegetme = async ()=>{
        setLoading(true)
        try{
            const data = await getmeuser()
            console.log(data)
            return data
        }catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }


    return [loading,handlelogin,handleregister,handledelete,handledeleteall,handlegetincome,handleincome,user,Update,handleexpense,handlegetexpense,handledeleteexpense, handledeleteallexpense, Updateexpense,handlerlogout,userupdate,handlegetme ]
}