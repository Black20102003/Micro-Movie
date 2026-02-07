import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export function CommentDetail(){
  const navigate=useNavigate();  
const{id,reviewId}=useParams();
    const{data,isLoading,error}=useQuery({
        queryKey:["commentDetail",id],
        enabled:!!id,
        queryFn:async()=>{
            const res=await fetch (`https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${TMDB_API_KEY}`);
            if(!res.ok) throw new Error ("Fail to fetch comment");
            return res.json();
        }
        

    })
    if(!id) return;
    if(isLoading) return <div>Loading ...</div>
    if(error) return <div>Error ...</div>
    

    const selectComment=data.results.find((item)=>item.id===reviewId)


const avatar = selectComment?.author_details?.avatar_path;

const avatarUrl=avatar?`https://image.tmdb.org/t/p/w185${avatar}`:"/profile.jpg";
const time=selectComment?.created_at;
 const date=new Date(time);
            const formatDate=date.toLocaleDateString("en-US",{
                year:"numeric",
                month:"short",
                day:"numeric",
            })
    return(
        <div className=" relative bg-gray-600  min-h-screen text-white pt-6 px-1 flex justify-center items-center">
            {selectComment?( <div  >
               <button className="w-8  absolute  top-3 left-2 bg-white h-8 rounded-full border p-2 text-black border-none " onClick={()=>navigate(-1)}><FaArrowLeft size={15}/></button>
               <div className="border w-auto h-auto mt-10 bg-white border-black border-2 rounded-lg  break-words shadow-md">
                    <div className="flex gap-2  ">
                        
                         <img src={`${avatarUrl}`}  className="mx-2 mt-3  border-black border-2  w-10 rounded-full"/>
                <span className="mt-3 font-bold text-black text-[18px] ">{selectComment?.author_details?.username}</span>
                    </div>
               

            
            <div className="text-black mx-16 mb-2  text-[12px]">{formatDate}</div>
<div className="flex items-end h-auto">
  <div className=" border-black text-black text-[17px] font-semibold p-4 rounded-lg rounded-t-none max-w-[100%] break-words border-t-2  m-0">
    {selectComment?.content}
  </div>
</div>


  </div>         
            </div>):(<div>No select comment</div>)}
           
            

        </div>
    )
    
}