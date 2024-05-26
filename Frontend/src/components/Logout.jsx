import { set } from 'mongoose'
import React from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthProvider'
useAuth
const Logout = () => {
    const {authUser,setAuthUser}= useAuth()

    const handleLogout = ()=>{
        try {
            console.log({...authUser})
            setAuthUser({})
        localStorage.removeItem("users")
        setTimeout(()=>{
          window.location.reload()
        },500)
        toast.success("Logout Successful")
        } catch (error) {
            toast.error("Error :" +error.message)
        }
    }

  return (
    <div>
      <button className='px-3 py02 bg-red-500 text-white rounded-md cursor-pointer' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout
