import{useEffect,useRef} from "react";
import{QueryClient, useQuery} from "@tanstack/react-query";
import {FaArrowLeft,FaArrowRight} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PageLoading } from "./Loading";
export function Comment(){
    const scrollRef = useRef(null);
   const navigate=useNavigate();
const Tvid=1399;
function scrollLeft() {
  scrollRef.current.scrollBy({ left: -324, behavior: "smooth" });
}

function scrollRight() {
  scrollRef.current.scrollBy({ left: 324, behavior: "smooth" });
}
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    

    const{data,isLoading,error}=useQuery({
        queryKey:['Tv'],
        
        queryFn:async()=>{
const res=await   fetch(`https://api.themoviedb.org/3/tv/1399/reviews?api_key=${TMDB_API_KEY}`);
if(!res.ok) throw new Error("Fetch is Failed")
  return res.json();
        }

        
})

if(isLoading) return <PageLoading/>
if(error) return <div>Error...</div>


return(
    <div className="mt-10">
        <div className="flex items-center lg:text-4xl sm:text-2xl md:text-3xl text-2xl justify-center"><h1 className="font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 animate-pulse">Comment Section</h1></div>

        <div>
           

    <div className="relative mt-7">
         <button onClick={scrollLeft} className= {`hidden md:block lg:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600`}> <FaArrowLeft/></button>
        <div className="flex gap-2    w-full overflow-x-scroll  scrollbar-hide" ref={scrollRef}>
       
          {data?.results?.map((review)=>{
            const time=review.created_at;
            const date=new Date(time);
            const formatDate=date.toLocaleDateString("en-US",{
                year:"numeric",
                month:"short",
                day:"numeric",
            })
             const avatar=review.author_details.avatar_path;
             const name=review.author_details.username;
             const avatarUrl=avatar?`https://image.tmdb.org/t/p/w185${avatar}`:"/profile.jpg";
        return(
            <div key={review.id} >
               
                    <div className=" flex-shrink-0 relative  w-[190px] sm:w-[260px] md:w-[280px] lg:w-[300px]   text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 shadow-md hover:scale-105 transition-transform duration-300 rounded-lg h-[180px] " onClick={()=>{
                      navigate(`/tv/${Tvid}/comments/${review.id}`)
                    }}>
       
       
<div className="flex items-center gap-2">
    <img src={avatarUrl} className="w-8 mx-1 my-2 rounded-full"/>
    <span className=" text-sm font-bold text-white">{name}</span>
   
</div>
   <span className="text-[10px] mx-2 ">{formatDate}</span> 

   

    <p className="text-gray-400 text-sm px-2 line-clamp-3 mt-5 ">{review.content}</p>


    
                </div>
    
      </div>
        )
    
     })}
      
      </div>
        <button onClick={scrollRight} className=" md:block  lg:block  absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200/40 rounded-r-none  text-gray-800  p-2 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600"> <FaArrowRight/></button>
    </div>
      
    
     
      </div>
    </div>

           
        
 
)
    
}
