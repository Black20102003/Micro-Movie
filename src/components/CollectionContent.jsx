import { useEffect, useState } from "react";
import { createContext } from "react";

export const collectionContent=createContext();
export function AddCollection({children}){
    const[collect,setCollect]=useState(()=>{
        const save=localStorage.getItem("collect");
        return save? JSON.parse(save):[]
    });
useEffect((()=>{
    localStorage.setItem("collect",JSON.stringify(collect));
}),[collect])
    function addCollect(movie){
const exist=collect.some((checkmovie)=>checkmovie.id===movie.id);
if(exist){
return;
}
setCollect((prev)=>[...prev,movie])
    }
    function removeCollect(id){
setCollect((prev)=>prev.filter((fitermovie)=>fitermovie.id!==id))
    }
    return(
        <collectionContent.Provider value={{collect,addCollect,removeCollect}}>
            {children}
        </collectionContent.Provider>
    )
}