import api  from "../lib/axios";

export const userregister = async (userData)=>{

    const response = await  api.post("/auth/register",userData,{
        withCredentials:true
    })

    return response.data
}

export const userlogin = async (userData)=>{

    const response = await  api.post("/auth/login",userData)  

    return response.data
}

export const userincome = async(userData)=>{
    const response = await api.post("/income/create",userData)
    console.log("response",response)
    
    return response.data
}

export const incomerecords = async()=>{
    const response = await api.get("/income/get")
    return response.data
}

export const updatedelete = async(id)=>{
    console.log("id",id)
    const response = await api.delete(`/income/delete/${id}`)
    console.log('response',response.data)
    return response.data
}

export const deleteall = async(userId)=>{
    console.log("userId",userId)
    const reponse = await api.delete(`/income/deleteall`)
    return reponse.data
}

export const updateone =async(userData,id)=>{
    console.log(userData,id)
    const response = await api.patch(`/income/update/${id}`,userData)
    return response.data
}

export const userexpense = async(userData)=>{
    console.log(userData)
    const response = await api.post("/expense/create",userData)
    return response.data
}

export const expenserecords = async()=>{
    const response = await api.get("/expense/get")
    return response.data
}

export const deleteexpense = async(id)=>{
    const response = await api.delete(`/expense/delete/${id}`)
    return response.data
}

export const deleteallexpense = async()=>{
    const response = await api.delete(`/expense/deleteall`)
    return response.data
}

export const updateexpense = async(userData,id)=>{
    const response = await api.patch(`/expense/update/${id}`,userData)
    return response.data
}

export const logoutuser = async()=>{
    const response = await api.get('/auth/logout')
    return response.data
}

export const updateuser = async(userData)=>{
    console.log("response:",userData)
    const response = await api.post('/update/updateuser',userData)
    return response.data
}

export const getmeuser = async()=>{
    const response = await api.get('/auth/getme')
    return response.data
}