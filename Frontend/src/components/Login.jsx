import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { document } from 'postcss'
import axios from 'axios'
import toast from 'react-hot-toast'

const Login = () => {
    const dialogref=useRef()

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) =>{
        const userInfo = {
            email:data.email,
            password:data.password
        }

         axios.post("http://localhost:4001/user/login",userInfo).then((res)=>{
            console.log(res.data)
            if(res.data)
                {

                
                    // document.getElementById("my_modal_3").close();
                    // window.location.reload();

                    localStorage.setItem("users",JSON.stringify(res.data.user))
                    toast.success("Login successful");

                    dialogref.current.close()

                    setTimeout(()=>{
                        window.location.reload()

                    },500)


                    // setTimeout(() => {

                    //     window.location.reload();    
                    //     console.log("hello")
                    // }, 3000);

                }
        }).catch((err)=>{
                if(err.response)
                {
                    console.log(err);
                    toast.error("Error: "+ err.response.data.message);
                    setTimeout(()=>{},3000)
                }    
                
        })
      };



    return (
        
        <div className=''>
            <dialog ref={dialogref} id="my_modal_3" className="modal">
                <div className="modal-box dark:bg-slate-900 dark:text-white">
                    <form  onSubmit={handleSubmit(onSubmit)} method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>document.getElementById("my_modal_3").close()}>✕</Link>
                    <h3 className="font-bold text-lg">Login</h3>
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
                        <button  className='bg-pink-500 text-white rounded-md px-3 py-1'>Login</button>
                        <p className='text-lg'>Not registered? <Link to="/signup" className='underline text-blue-500 cursor-pointer'>Signup</Link></p> 
                        {errors.exampleRequired && <span>This field is required</span>}

                    </div>
                    </form>


                    
                </div>
            </dialog>
        </div>
    )
}

export default Login
