import { useQuery} from "@tanstack/react-query";
import { useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { Header } from "./Header";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import useScrollTop from "./Scroll";
import { PageLoading } from "./Loading";
import { collectionContent } from "./CollectionContent";
import {FaArrowUp,FaArrowLeft} from "react-icons/fa";
import toast, {Toaster} from "react-hot-toast";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export function MovieDetail(){
    const {addCollect}=useContext(collectionContent)
const [play,setPlay]=useState(false);
const scrollY=useScrollTop();
const navigate= useNavigate();
useEffect(()=>{
    if(play){
        document.body.classList.add("overflow-hidden");
    }else{
        document.body.classList.remove("overflow-hidden")
    }
},[play])
const{id}=useParams();
    const{data,isLoading,error}=useQuery({
        queryKey:["detail",id],
         enabled: !!id,
        queryFn:async()=>{
            const res=await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`);
            await new Promise(resolve=>setTimeout(resolve,1500));
 return res.json();
        }
      
    })
const {data:actors,isLoading:Loading,error:actorError}=useQuery({
queryKey:["actor",id],
 enabled: !!id,
queryFn:async()=>{
  const res=  await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}`);
   return res.json();

}
})

const{data:viedos,isLoading:ViedoLoading,error:viedoError}=useQuery({
    queryKey:["viedo",id],
    enabled:!!id,
    queryFn:async()=>{
        const res=await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${TMDB_API_KEY}`);
        if(!res.ok) throw new Error("Fetch is failed");
        return res.json();
    }
})
    
    
   
    
   if (!id) return ;
   if(isLoading||Loading||ViedoLoading) return(<>
   <Header/>
   <PageLoading/>
   </>) 



if (error) return <div>Movie error...</div>;

    const imgPath=data.backdrop_path|| data.poster_path;
const Trailer=viedos?.results?.find((viedo)=>(
    viedo.site==="YouTube" && ["Trailer","Teaser","Clip","Featurette"].includes(viedo.type)
))
function handleAddbutton(){
    addCollect({
        id:data.id,
        title:data.title,
        poster:data.poster_path,
        release_date:data.release_date,
        
    });
    toast.success("Movie is added")

}
    return(
        <>
        <Header/>
      <Toaster position="bottom-center"/>
         <div className="relative  w-full ">
            <img src={`https://image.tmdb.org/t/p/original${imgPath}`}  className="w-full h-80 object-cover"/>
            <div className="absolute top-3 left-2 ">
                <button className="border rounded-full    w-8 h-8 px-2 bg-gray-400 text-white pointer hover:bg-blue-600/20 transition" onClick={()=>{
navigate(-1);

                }}><FaArrowLeft size={15} /></button>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2  w-30 lg:w-50 lg:top-40 top-45 ">
                 <img src={`https://image.tmdb.org/t/p/original${data.poster_path}`} className= "rounded-lg shadow-2xl"/>
            </div>
            </div> 
            
               <div className="bg-[url('/Homebg.jpg')] bg-cover bg-center min-h-screen">
        

        <div className="pt-10 lg:pt-36 text-center">
            <h1 className="text-white text-2xl md:text-5xl font-extrabold drop-shadow-lg font-sans">{data.original_title}</h1>
           
                 <button className="bg-pink-400 mt-5 border  px-2 py-1 rounded-xl font-sans mr-2 " onClick={()=>{
                    setPlay(!play)
                 }}><i className="fas fa-play"></i> Watch now</button>
                 <button className="bg-white mt-5 border  px-2 py-1 rounded-xl font-sans  " onClick={
                    handleAddbutton
                 }><i className="fas fa-plus"></i>Add button</button>
            
           
        </div>
       
        {play && Trailer && (
            <div className="fixed inset-0  z-50 flex items-center h-screen justify-center"
>
    <div className="absolute inset-0 bg-black/95" onClick={()=>{
        setPlay(false);
    }}>
       
    </div>
    <div className="relative z-50 w-[90%] md:w-[70%] lg:w-[60%] aspect-viedo bg-black/80 rounded-xl overflow-hidden">
         <iframe  src={`https://www.youtube.com/embed/${Trailer.key}?autoplay=1`} 
        allow="autoplay;encrypted-media"
        allowFullScreen
        ></iframe>
    </div>
</div>
        )}
        
        <div className="px-3 mt-10 relative">
            <div className={`fixed bottom-10 right-5 ${scrollY>100 ? "block":"hidden"}`}>
                <button className="bg-gray-500  text-white p-3 rounded-full" onClick={()=>{
                    window.scrollTo({top:0,behavior:"smooth"})
                }}>
                    <FaArrowUp size={20} />
                   
                </button>
            </div>
            <h1 className="text-white">Overview:</h1>
            <div className="mb-3">
                <p className=" text-sm text-gray-500">{data.overview}</p>
            
            </div>
            <div>
                <h1 className="px-1 mt-5 mb-3 text-xl text-white">Actors</h1>
                <div className="flex gap-4">
                                 {actors?.cast?.slice(0,5).map((actor)=>{
                    return(
                        <div key={actor.id} className="shrink-0 w-12 sm:w-28 md:w-32">
                            <div>
                          <img  src={actor.profile_path? `https://image.tmdb.org/t/p/original${actor.profile_path}`:
"/profile.jpg" } className="w-full h-20 sm:h-40 md:h-44 object-cover "
 />
                            </div>
  
 <p className="text-white text-[10px]  font-semibold ">{actor.name}</p>
 </div>
 )
 } ) } </div>
   
              
            </div >
            <div className="mt-2">
                  <p className="text-white text-sm mb-2">Aired: <span className="text-gray-400">{new Date(data.release_date).toDateString()}</span></p>
            <p className="text-white text-sm mb-2">Run-Time: <span className="text-gray-400">{Math.floor(data.runtime/60)}h {data.runtime % 60}m</span></p>
            <p className="text-white text-sm mb-2">Status: <span className="text-gray-400">{data.status}</span> </p>
            <p className="text-white text-sm mb-2">Vote-average: <span  className="text-gray-400">{data.vote_average}</span></p>
            <p className="text-white text-sm mb-2">Spoken Language: <span className="text-green-300 ">{data?.spoken_languages?.map((language)=>{
                return(
                    <span key={language.iso_639_1}  className="mr-2 ">{language.english_name}</span>
                )
            })}</span></p>
            {!data.tagline==="" && <p className="text-white text-sm mb-2">Tagline: <span className="text-yellow-400 italic text-sm  ">{data.tagline}</span></p>}
             <p className="text-white text-sm mb-2">Genres: <span  className="text-gray-400">{data?.genres?.map((genre)=>{
                return(
<button className=" border mx-[3px] my-1 text-[11px] rounded-lg p-[2px] text-pink-300" key={genre.id}>
                    {genre.name}
               </button>
                )
                
             })}</span></p>
             <p className="text-white text-sm mb-2">Budget: <span className="text-gray-400">${data.budget}</span></p>
             <p className="text-white">Production Companies</p>
             <div className="flex  gap-3  mt-2">
                {data?.production_companies?.map((company,index)=>{
                    return(
                        <div key={company.id||index} >
                            <img  src={company.logo_path?`https://image.tmdb.org/t/p/original${company.logo_path}`:"No Image"}
                            className="h-8 object-contain bg-white rounded w-16 p-1"/>
                            <p className="text-gray-400 text-[7px] w-full truncate">{company.name} </p>

                        
                        </div>
                        
                    )
                })}
             </div>
                
                
        </div>
            </div>
              

          
   </div>    
      
        
       
         
        </>
    )
}


