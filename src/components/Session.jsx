import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

async function createSession(requestToken) {
  if (!TMDB_API_KEY) {
    throw new Error("Missing VITE_TMDB_API_KEY");
  }
  
  const res = await fetch(
    `https://api.themoviedb.org/3/authentication/session/new?api_key=${TMDB_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ request_token: requestToken })
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch session");
  }
  
  const data = await res.json();
  if (!data?.session_id) {
    throw new Error("Failed to create session");
  }
  
  return data.session_id;
}

export function AuthCallBack(){
    const[params]=useSearchParams();
    const navigate=useNavigate();

    useEffect(()=>{
        const run=async()=>{
            const token=params.get("request_token");
            const approved=params.get("approved");

            if(!token|| approved !=="true"){
                navigate("/login",{replace:true});
                return;
            }
            const sessionId=await createSession(token);

            localStorage.setItem("tmdb-session",sessionId);

            navigate("/home",{replace:true})
        }
        run().catch(()=>navigate("/login",{replace:true}))
    },[params,navigate])
    return <p>Logging you in ...</p>
}
