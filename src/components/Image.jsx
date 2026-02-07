import { useQuery } from "@tanstack/react-query";
import { useState,useRef,useEffect } from "react";
import { PageLoading } from "./Loading";

export function Image(){
const scrollRef=useRef(null);
const directionRef=useRef(1);
useEffect(() => {
    const timer = setTimeout(() => {
        const container=scrollRef.current
        if (!container) return;
        
        const interval=setInterval(()=>{
           if(container.scrollLeft+container.clientWidth>=container.scrollWidth){
            directionRef.current=-1;
           }
            if(container.scrollLeft<=0){
                directionRef.current=1;
            }
           container.scrollLeft+=directionRef.current;
            
       },20);
       return ()=>{
        clearInterval(interval);
       }
    }, 100);
    
    return () => clearTimeout(timer);
},[])
    const API_KEY='62f1ac9dc357c592c6d9181da41e1427';
    const{data,isLoading,error}=useQuery({
        queryKey:['image'],
        queryFn:()=>fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`).then(
            res=>res.json(),
        )
    })

    if(isLoading) return <PageLoading/>
    if(error) return <div>Error ...</div>

    return(
        <div className="flex overflow-x-hidden  "ref={scrollRef} >
             {data.results.map((image)=>(
<img className="w-[400px] h-80 object-cover  flex-shrink-0 " key={image.id} src={`https://image.tmdb.org/t/p/w400${image.poster_path}`} />
        ))}
        </div>
       
    )
}