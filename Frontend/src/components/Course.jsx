import React, { useState,useEffect } from 'react'
import Cards from './Cards'
import { Link } from 'react-router-dom'
import axios from "axios"
import Book from '../../../model/book.model.js'

const Course = () => {
  const [book,setBook]=useState([])

  useEffect(()=>{
    const getBook =async () =>{
        try {
          const res= await axios.get("http://localhost:4001/book");
          console.log(res.data);
          setBook(res.data)
        } catch (error) {
          console.log(error)
        }
    }

    getBook();
  },[])
  return (
    <div className=' max-w-screen-2xl container mx-auto md:px-20 px-4 -z-50'>
      <div className='mt-28 items-center justify-center text-center'>
        <h1 className='text-2xl  md:text-4xl'>We're delighted to have you <span className='text-pink-500'>Here! :)</span> </h1>
        <p className='mt-12'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione excepturi enim, blanditiis dolor repudiandae dolorum. In debitis ut, ducimus cumque ipsam dolorum asperiores incidunt. Dolores nesciunt quo quisquam, libero delectus itaque quaerat corporis quibusdam dolor cum minima alias, optio praesentium harum explicabo aliquid commodi repellendus vitae? Quo hic maxime quis provident. Cum nam placeat velit facere perferendis tempora doloremque enim?
        </p>
        <Link to ='/'><button className='bg-pink-500 mt-6 text-white rounded-md px-4 py-2 hover:bg-pink-700 duration-300'>Back</button></Link>

      </div>

      <div className='mt-12 grid grid-cols-1 md:grid-cols-4'>
        {
          book.map((item) => {
            return <Cards key={item.id} item={item}></Cards>
          })
        }
      </div>


    </div>
  )
}

export default Course
