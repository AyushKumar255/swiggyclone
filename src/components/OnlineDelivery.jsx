import React, { useEffect, useRef, useState } from 'react'
import Card from './Card';

export default function OnlineDelivery() {
    const [data,setData]=useState([]);
    const elementRef = useRef(null);
    const [isAtTop, setIsAtTop] = useState(false);

    useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        setIsAtTop(rect.top <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

    const fetchTopRestaurant=async () =>{
        const response=await fetch("http://localhost:5000/top-restaurant-chains");
        const apiData=await response.json();
        setData(apiData);
    }

    useEffect(
        ()=>{
          fetchTopRestaurant();
        },[]
    )
  return (
    <div className='max-w-[1200px] mx-auto px-2 ' ref={elementRef}>
    <div className='flex my-5 items-center justify-between'>
      <div className='text-[25px] font-bold'>Restaurants with online food delivery in Patna </div>
      </div>
      <div className={isAtTop ? 'fixed top-0 z-[99999] bg-white w-full left-0':''}>
        <div className='max-w-[1200px] mx-auto flex my-4'>
            <div className='p-3 rounded-md shadow'>Filter</div>

        </div>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
       {
        data.map(
            (d,i)=>{
                return <Card {...d}/>
            }
        )
       }


      </div>
    </div>
  )
}
