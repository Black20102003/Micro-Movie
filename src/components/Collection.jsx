import { collectionContent } from "./CollectionContent";
import { useContext } from "react";
import { Header } from "./Header";
import { useNavigate } from "react-router-dom";
import { FaTrash,FaArrowLeft } from "react-icons/fa";
import toast, {Toaster} from "react-hot-toast";


export function Collection(){
    const{collect,removeCollect}=useContext(collectionContent);
    const navigate=useNavigate();

    return(
        <>
        <Header/>
        
        <div className="relative">
 <button className="w-8  absolute  top-3 left-2 bg-gray-600/40 h-8 rounded-full border p-2 text-black border-none " onClick={()=>navigate(-1)}><FaArrowLeft size={15} className="text-white"/></button>
        </div>
        <Toaster position="bottom-center"/>
        {collect.length===0 && ( <div className="flex w-full justify-center items-center h-[600px]">
<p className="text-black font-semibold text-lg">No movie in your collection 🎬</p>
        </div>)}
       
           <div className="grid mt-15 mt-6 px-4 gap-4   grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(180px,220px))] justify-center ">
           
{collect.map((movie)=>{
    return(
     

         <div key={movie.id} className="w-full"  >
          
            
            <div className=" bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 shadow-md hover:scale-105 transition-transform duration-300 rounded-lg" onClick={()=>{
                navigate(`/movie/${movie.id}`)
            }}>
      <div className="relative " >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
        alt={movie.title}
        className="w-full  aspect-[2/3]  object-cover rounded-t-lg"
      />
       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent " />
        <h2 className="absolute bottom-8 left-2 right-2 text-sm font-semibold truncate ">{movie.title}</h2>
        <p className="absolute bottom-4 left-2  text-white dark:text-white text-xs mt-1">{movie.release_date}</p>
        <p className="absolute top-2  right-2 z-20 text-white dark:text-gray-300 text-xs mt-1"><FaTrash size={15} className="text-red-600" onClick={(e)=>{
            e.stopPropagation();
            removeCollect(movie.id);
            toast.success(` ${movie.title} removed from collection!`)
        }}/></p>
     
      </div>
    </div>
        </div>
       
    )
})}
        </div></>
           
    )
}