import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

async function createTMDBToken() {
  if (!TMDB_API_KEY) {
    throw new Error("Missing VITE_TMDB_API_KEY");
  }
  const res = await fetch(
    `https://api.themoviedb.org/3/authentication/token/new?api_key=${TMDB_API_KEY}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch TMDB token");
  }
  const json = await res.json();
  if (!json?.request_token) {
    throw new Error("TMDB did not return a request_token");
  }
  return json.request_token;
}
function redirectToken(requestToken) {
  const redirectTo = encodeURIComponent(
    `${window.location.origin}/auth/callback`
  );
  window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${redirectTo}`;
}



export function Login() {
   const [signup, setSignup] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues:({
      email:"",password:""
    })
  });

  const loginMutation = useMutation({
    mutationFn: async () => {
      const requestToken = await createTMDBToken();
      redirectToken(requestToken);
      return requestToken;
    },
  });

  const onsubmit = () => {
   
    if (signup) {
      window.open("https://www.themoviedb.org/signup", "_blank", "noreferrer");
      return;
    }
    loginMutation.mutate();
     reset();
  };

   
    return(
       <div className="bg-[url('/Homebg.jpg')] bg-cover bg-center min-h-screen">
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
         

         
          
          <div className="relative z-10 w-full max-w-md px-6">
            <div className=" bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-8 transform transition-all duration-500 ">
          
              <div className="text-center mb-8">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 animate-pulse">
                  MICRO
                </h1>
               
              </div>

             
              <form onSubmit={handleSubmit(onsubmit)}  className="space-y-6">
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600 text-bold">
                    Email Address
                  </label>
                  <div >
                    <input
                      type="email"
                      placeholder="Enter your email"
                      autoComplete="off"
                      {...register("email", {
                        required: "Email is required"
                      })}
                      className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 "
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1 animate-shake">{errors.email.message}</p>
                  )}
                </div>

               
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                    Password
                  </label>
                  <div>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      autoComplete="new-password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters"
                        }
                      })}
                      className="w-full px-4 py-3 bg-white border border-white/10 rounded-lg 
           text-gray-800 placeholder-gray-400 
           focus:outline-none focus:ring-2 focus:ring-purple-500 
           focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-xs mt-1 animate-shake">{errors.password.message}</p>
                  )}
                </div>

               
                {loginMutation.error && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 animate-shake">
                    <p className="text-red-400 text-sm text-center">
                      {loginMutation.error?.message || "Authentication failed"}
                    </p>
                  </div>
                )}

               
                <button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loginMutation.isPending ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </button>

               

               
               
              </form>
            </div>

           
            
            
           
          </div>
        </div>
        </div>
    )
}