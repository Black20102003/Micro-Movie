import { useNavigate } from "react-router-dom";
export function Card({ data }) {
  const navigate=useNavigate()
  return (
    <div className="flex-shrink-0 w-[193px] max-w-auto sm:w-[260px] md:w-[280px] lg:w-[300px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 shadow-md hover:scale-105 transition-transform duration-300 rounded-lg" onClick={()=>{
      navigate(`/movie/${data.id}`)
    }}>
      <div className="relative">
      <img
        src={`https://image.tmdb.org/t/p/w400${data.poster_path}`}
        alt={data.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent " />
        <h2 className="absolute bottom-8 left-2 right-2 text-sm font-semibold truncate ">{data.title}</h2>
        <p className="absolute bottom-4 left-2  text-white  text-xs mt-1">{data.release_date}</p>
        <p className="absolute top-2  right-2 text-black  text-xs mt-1">⭐ {data.vote_average.toFixed(1)}</p>
     
      </div>
    </div>
  );
}
