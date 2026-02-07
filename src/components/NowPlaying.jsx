import { useQuery} from "@tanstack/react-query";
import { Card } from "./Card";
import { useRef } from "react";

import { useNavigate } from "react-router-dom";
import {FaArrowLeft,FaArrowRight} from "react-icons/fa";
export function NowPlay(){
     const navigate=useNavigate();

const scrollRef = useRef(null);

function scrollLeft() {
  scrollRef.current.scrollBy({ left: -324, behavior: "smooth" });
}

function scrollRight() {
  scrollRef.current.scrollBy({ left: 324, behavior: "smooth" });
}
    const API_KEY="62f1ac9dc357c592c6d9181da41e1427"
    const{data,isLoading,error}=useQuery({
        queryKey:['Now Playing',2],
        queryFn:()=>fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=2`).then(
            res=>res.json(),

        )
        
    })


    
    if(error) return <div>Error ...</div>
    return(
        
            <div>
                 <div  className=" max-w-full mx-auto relative cursor-pointer px-0 ">
      
       
       
        <button onClick={scrollLeft} className="hidden sm:block md:block lg:block  absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200/40  text-gray-800 dark:text-white p-2 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600"> <FaArrowLeft/></button>
        <div className="flex gap-1    w-full overflow-x-scroll  scrollbar-hide"ref={scrollRef}>
          {data?.results?.map((data)=>(
    <div key={data.id}>
        <div className="flex-shrink-0 w-[193px] sm:w-[260px] md:w-[280px] lg:w-[300px] bg-white dark:bg-gray-800 text-white  border border-gray-200 dark:border-gray-700 shadow-md hover:scale-105 transition-transform duration-300 rounded-lg " onClick={()=>{navigate(`/movie/${data.id}`)}}>
      <div className="relative">
      <img
        src={`https://image.tmdb.org/t/p/w400${data.poster_path}`}
        alt={data.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent " />
        <h2 className="absolute bottom-8 left-2 right-2 text-sm font-semibold truncate ">{data.title}</h2>
        <p className="absolute bottom-4 left-2  text-white  text-xs mt-1">{data.release_date}</p>
        <p className="absolute top-2  right-2 text-black  text-xs mt-1">⭐ {data.vote_average.toFixed(1)}</p>
     
      </div>
    </div>
    </div>
   
))}

<button onClick={scrollRight} className=" sm:block md:block lg:block   absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200/40  text-gray-800 dark:taxt-white p-2 rounded-full shadow-md hover:bg-gray-300 rounded-r-none dark:hover:bg-gray-600"> <FaArrowRight/></button>
    </div>
    
    </div>
            </div>
       
    )
}``