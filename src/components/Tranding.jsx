import { useQuery } from "@tanstack/react-query";
import { act, useState } from "react";
import { useNavigate } from "react-router-dom";
const TMDB_API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;
export function Trending(){
    
    const[active,setActive]=useState("day");
    const navigate=useNavigate();
    const{data,isLoading,error}=useQuery({
        queryKey:["allDay"],
        queryFn:async()=>{
            const res=await fetch("https://api.themoviedb.org/3/trending/all/day", 
              {
                  headers:{
                    Authorization:`Bearer ${TMDB_API_TOKEN}`,
                    "Content-Type":"application/json",
                }
              }      
)
if(!res.ok) throw new Error("Trending allday is fail to fetch");
return res.json();
        }
      
       
    })
    const{data:weekData,isLoading:weekLoading,error:isError}=useQuery({
        queryKey:["week",2],
        queryFn:async()=>{
            const res =await fetch("https://api.themoviedb.org/3/trending/movie/week?page=2",
                {
                    headers:{
                        Authorization:`Bearer ${TMDB_API_TOKEN}`,
                        "Content-Type":"application/json",
                    }
                }
            )
            if(!res.ok) throw new Error("Trending week is fail to fetch");
return res.json();
        }
    })
      
      if(error) return <div>Error....</div>
     


      return(
        <>
        <div>
            <h1 className="font-bold bg-gradient-to-r  from-red-400 w-full max-w-md mx-auto via-purple-400 to-green-400 bg-clip-text text-xl rounded-lg text-transparent mb-2 animate-pulse text-center mt-6">Trending Movies</h1>
        </div>
         <div className="text-white font-bold  overflow-hidden mx-4 text-sm mt-5  inline-flex border border-gray-400 bg-gray-800 rounded-lg">
            <button  onClick={()=>{
                setActive("day")
            }} className={`flex-1 px-3    transition duration-300 ${active==="day"? "bg-blue-500 " :"bg-gray-800 hover:bg-gray-700"}`}>Day </button>
            <button onClick={()=>{
                setActive("week");
            }} className={`flex-1 px-3 py-[5px] transition duration-300 ${active==="week"? "bg-blue-500  " :"bg-gray-800 hover:bg-gray-700"}`}>Week </button>
        </div>
        <div>
            {active==="day" && (
                <div className="grid mt-6 px-4 gap-4   grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(180px,220px))] justify-center ">
{data?.results?.map((movie)=>{
    return(
        
        <div key={movie.id} className="w-full"  >
            
            <div className=" bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 shadow-md hover:scale-105 transition-transform duration-300 rounded-lg" onClick={()=>{
                navigate(`/movie/${movie.id}`)
            }}>
      <div className="relative " >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full  aspect-[2/3]  object-cover rounded-t-lg"
      />
       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent " />
        <h2 className="absolute bottom-8 left-2 right-2 text-sm font-semibold truncate ">{movie.title}</h2>
        <p className="absolute bottom-4 left-2  text-white dark:text-white text-xs mt-1">{movie.release_date}</p>
        <p className="absolute top-2  right-2 text-white dark:text-gray-300 text-xs mt-1">⭐ {movie.vote_average}</p>
     
      </div>
    </div>
        </div>
    )
})}
        </div>
            )}
            {active==="week" &&(
                <div className="grid mt-6 px-4 gap-4   grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(180px,220px))] justify-center ">
{weekData?.results?.map((weekmovie)=>{
    return(
        
        <div key={weekmovie.id} className="w-full"  >
            
            <div className=" bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 shadow-md hover:scale-105 transition-transform duration-300 rounded-lg" onClick={()=>{
                navigate(`/movie/${weekmovie.id}`)
            }}>
      <div className="relative " >
      <img
        src={`https://image.tmdb.org/t/p/w500${weekmovie.poster_path}`}
        alt={weekmovie.title}
        className="w-full  aspect-[2/3]  object-cover rounded-t-lg"
      />
       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent " />
        <h2 className="absolute bottom-8 left-2 right-2 text-sm font-semibold truncate ">{weekmovie.title}</h2>
        <p className="absolute bottom-4 left-2  text-white dark:text-white text-xs mt-1">{weekmovie.release_date}</p>
        <p className="absolute top-2  right-2 text-white dark:text-gray-300 text-xs mt-1">⭐ {weekmovie.vote_average}</p>
     
      </div>
    </div>
        </div>
    )
})}
        </div>
            )}
        </div>
        </>
       
      )
    
}