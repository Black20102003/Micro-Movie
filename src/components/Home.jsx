import { Popular } from "./Popular";
import { Comment } from "./Comment";
import { NowPlay } from "./NowPlaying";
import { Image } from "./image";
import { Header } from "./Header";
import { MovieDetail } from "./MovieDetail";
import useScrollTop from "./Scroll";
import {FaArrowUp} from "react-icons/fa";
import { Trending } from "./Tranding";
export function Home(){
const scrollY=useScrollTop();


return(
    <>
    <div className="relative">
 <Header/>
    <Image />
    <div className="bg-[url('/Homebg.jpg')] bg-cover bg-center min-h-screen">
    <div className="px-2  text-lg md:text-2xl lg:text-3xl font-bold py-1 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-2 animate-pulse">Watch Now</div>
    <Popular />
    
    <NowPlay/>
    <Comment/>
    <MovieDetail/>
    <Trending/>
      <div className={`fixed bottom-10 right-5 ${scrollY>100 ? "block":"hidden"}`}>
                <button className="bg-gray-500  text-white p-3 rounded-full" onClick={()=>{
                    window.scrollTo({top:0,behavior:"smooth"})
                }}>
                    <FaArrowUp size={20} />
                   
                </button>
            </div>
    </div>
    </div>
   
   
    </>
   
 
)
}

