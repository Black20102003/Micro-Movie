import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "./Header";
import { useNavigate } from "react-router-dom";
import { PageLoading } from "./Loading";

import useScrollTop from "./Scroll";
import {FaArrowUp} from "react-icons/fa";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export function Search(){
   const [text,setText]=useState("");
  const[searchText,setSearchText]=useState("");
 const[letter,setLetter]=useState(false)
 const scrollY=useScrollTop();
   const navigate=useNavigate();
   if(!TMDB_API_KEY){
    throw new Error("API KEY is failed")
   }
    const {data,isLoading,error,refetch}=useQuery({
        queryKey:["search"],
        enabled: false, 
        queryFn:async ()=>{
            const res= await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(text)}`);
            const json=await res.json();
            console.log(json)
if(!res.ok){
    throw new Error("Fetch is failed")
}


return json;
    }
   
    })
   
    return(
        <>
        <Header/>
        <div className="relative">
              
        <div className="bg-[url('/Homebg.jpg')] bg-cover bg-center min-h-screen">
 
         <div className="flex  justify-center ">
          
           
         <div className="relative mt-4  w-full max-w-md "> <input type="text" placeholder="Search Movie" value={text} className="w-full border h-10 rounded-lg px-3 border-white bg-white  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 " onChange={(e)=>{
setText(e.target.value);
         }}/>
          <MagnifyingGlassIcon className="absolute w-6 h-6 text-blue-500 top-1/2  h-10 right-4 -translate-y-1/2" onClick={()=>{
            if(text.trim()) refetch();
            setSearchText(text);
           setText("")
          setLetter(true)
          }} />
         </div>
               
      
            
      
        </div>
        {isLoading && <PageLoading />}
        {searchText && (
           
 <div className="mt-10 ">
            <h1 className="sm:text-3xl lg:text-2xl mx-3 text-pink-600 font-sans ">Search results for: {searchText}</h1>
         </div>
        )}
         
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
     
              {(!letter || data?.results?.length===0) &&(
                <div className="flex items-center justify-center min-h-[60vh]">
                       <div className="mt-10 text-center ">
                    <h1 className="text-white text-xl font-semibold">Find Your Movie 😄🎉</h1>
                    <p className="text-white/50 mt-2 ">
                        Try search movie name 🔍
                    </p>
                </div>
                </div>
             
            )}
       
    
        
        </div>
         <div className={`fixed bottom-10 right-5 ${scrollY>100 ? "block":"hidden"}`}>
                            <button className="bg-gray-500  text-white p-3 rounded-full" onClick={()=>{
                                window.scrollTo({top:0,behavior:"smooth"})
                            }}>
                                <FaArrowUp size={20} />
                               
                            </button>
                        </div>
        </div>
        </>
       
    )
}