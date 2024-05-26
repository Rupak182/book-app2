import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios"
import list from "../../public/list.json"
import Cards from './Cards';
import { useState,useEffect } from 'react';

var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

const Freebook = () => {

  const [book,setBook]=useState([])


  useEffect(()=>{
    const getBook =async () =>{
        try {
          const res= await axios.get("http://localhost:4001/book");
          console.log(res.data.filter((data)=>data.category==="Free"));
          setBook(res.data.filter((data)=>data.category==="Free"))
        } catch (error) {
          console.log(error)
        }
    }

    getBook();
  },[])


    // console.log(filterData)



  return (
    <>
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 '>
      <h1 className='font-semibold text-xl pb-2'>Free Offerred Courses</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti eius laudantium, voluptatem expedita ad consectetur reiciendis magnam. Modi laudantium error earum voluptates ut alias, itaque possimus ab quas temporibus consequatur.</p>
    </div>
    <div>
    <Slider {...settings}>
        {book.map((item)=>{
            return <Cards item={item} key={item.id}/>
        })}
      </Slider>
    </div>
    </>

  )
}

export default Freebook
