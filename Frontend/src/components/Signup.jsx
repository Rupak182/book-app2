import React, { useRef } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Login from './Login'
import { useForm } from "react-hook-form"
import axios from 'axios'
import toast from 'react-hot-toast'


const Signup = () => {
    const location =useLocation();
    const navigate =useNavigate()
    const from = location.state?.from?.pathname || "/";
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async(data) => {
        const userInfo = {
            fullname:data.fullname,
            email:data.email,
            password:data.password
        }

        await axios.post("http://localhost:4001/user/signup",userInfo).then((res)=>{
            console.log(res.data)
            if(res.data)
                {
                    toast.success("Signup successful"); 
                    navigate(from,{replace:true});
                }
            localStorage.setItem("users",JSON.stringify(res.data.user))
        }).catch((err)=>{
                if(err.response)
                {
                    console.log(err);
                    toast.error("Error: "+ err.response.data.message)
                }    
                
        })

    }


    return (


        <div className=' flex items-center  justify-center h-screen '>
            <div className="w-[600px] ">
                <div className="modal-box dark:bg-slate-900 dark:text-white">
                    <form  onSubmit={handleSubmit(onSubmit)} method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
                        <h3 className="font-bold text-lg">Signup</h3>

                        <div className='mt-4 space-y-2'>
                            <span>Name</span>
                            <br />
                        <input  {...register("fullname", { required: true })} className='w-80 px-3 py-1 border rounded-md outline-none' type="text" placeholder='Enter your email' />
                        <br />
                        {errors.name && <span className='text-sm  text-red-500'>This field is required</span>}
                        </div>
                        <div className='mt-4 space-y-2'>
                            <span>Email</span>
                            <br />
                            <input  {...register("email", { required: true })} className='w-80 px-3 py-1 border rounded-md outline-none' type="email" placeholder='Enter your email' />
                            <br />
                            {errors.email && <span className='text-sm  text-red-500'>This field is required</span>}
                        </div>

                        <div className='mt-4 space-y-2'>
                            <span>Password</span>
                            <br />
                            <input  {...register("password", { required: true })} className='w-80 px-3 py-1 border rounded-md outline-none' type="text" placeholder='Enter your password' />
                            <br />
                            {errors.password && <span className='text-sm  text-red-500'>This field is required</span>}
                        </div>

                        <div className='flex  justify-around mt-4'>
                            <button className='bg-pink-500 text-white rounded-md px-3 py-1'>Signup</button>
                            <p className='text-lg'> Have account? <button to="/" onClick={() => document.getElementById("my_modal_3").showModal()} className='underline text-blue-500 cursor-pointer'>Login</button></p>
                        </div>

                        < Login />
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Signup
