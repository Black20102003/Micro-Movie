import { useEffect, useState } from "react";

export default function useScrollTop(){
    const[scroll,Setscroll]=useState(0);

    useEffect(()=>{
        const onScroll=()=>{
            Setscroll(window.scrollY);

            
        };
        window.addEventListener("scroll",onScroll);
        return()=>{
            window.removeEventListener("scroll",onScroll)
        }
    },[]);
    
    return scroll;

}


