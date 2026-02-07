import { useRef } from "react";
import{QueryClient, useQuery} from "@tanstack/react-query";
import { Card } from "./Card";
import {FaArrowLeft,FaArrowRight} from "react-icons/fa";

export function Popular(){
        const scrollRef=useRef(null);
    function scrollLeft(){
        scrollRef.current.scrollBy({left:-324,behavior:"smooth"})
    }
    function scrollRight(){
        scrollRef.current.scrollBy({left:324,behavior:"smooth"})
    }
    const API_KEY='62f1ac9dc357c592c6d9181da41e1427';
const{data,isLoading,error}=useQuery({
    queryKey:['movie',3],
    queryFn:()=>fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=3`).then(
        res=>res.json()
    ),
    
})


if(error) return <div>"Error ..."</div>;
    return(
        <div  className=" max-w-full mx-auto relative cursor-pointer px-0 ">
       
       
       
        <button onClick={scrollLeft} className="hidden sm:block md:block lg:block  absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200/40  text-gray-800 dark:text-white p-2 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600"> <FaArrowLeft/></button>
        <div className="flex gap-1   py-2 w-full overflow-x-scroll  scrollbar-hide"ref={scrollRef}>
            { data?.results?.map((data)=>(
    <Card key={data.id} data={data} className="flex-shrink-0 w-[320px]"/>
))}

<button onClick={scrollRight} className="rounded-r-none sm:block md:block lg:block   absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200/40  text-gray-800 dark:taxt-white p-2 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600"> <FaArrowRight/></button>
    </div>
    
    </div>
    )
}