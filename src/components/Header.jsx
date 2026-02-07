import { useNavigate } from "react-router-dom";
import "../index.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
 
  const navigate=useNavigate();



  return (
    <div className="relative select-none sticky top-0 left-0 w-full z-50">
      <nav className="bg-gray-800 text-white p-4 w-full">
        <div className="container mx-auto flex flex-wrap justify-between items-center gap-2">
          
          <button
            className="md:hidden text-2xl cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>

         
          <h1 className="text-3xl font-bold ml-3 mr-3 flex-shrink-0 text-blue-500">Micro</h1>

        
          <div className="flex flex-1 items-center gap-2 md:gap-4 w-full md:w-auto mt-2 md:mt-0">
           
          
          
          </div>

          
          <ul className="hidden md:flex space-x-8 mt-2 md:mt-0">
            <li className="hover:text-gray-400 cursor-pointer" onClick={()=>{
              navigate("/home")
            }}>Home</li>
            <li className="hover:text-gray-400 cursor-pointer" onClick={()=>{
              navigate("/search")
            }}>Search</li>
            <li className="hover:text-gray-400 cursor-pointer" onClick={()=>{
              navigate("/collect")
            }}>Collection</li>
          </ul>
             <div className="cursor-pointer"><MagnifyingGlassIcon className="w-6 h-6 text-blue-500 " onClick={()=>{
              navigate("/search")
             }}/></div>
        </div>
{open && (
  <div className="fixed inset-0 bg-black opacity-90 z-40 md:hidden" onClick={()=>setOpen(false)}>

  </div>
)}


  <div className={`fixed top-0 left-0 h-screen w-40 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"} z-50 md:hidden`}>
<h1 className="font-bold text-3xl text-center mt-2 text-blue-500">Micro</h1>

        <ul 
         className="pt-4 text-center cursor-pointer rounded-lg"
        >
          
          <li className="hover:text-gray-800 cursor-pointer py-4 border-b border-gray-700 text-xl font-medium transition-colors duration-200 " onClick={()=>{
            navigate("/home")
          }}>Home</li>
           <li className="hover:text-gray-800 cursor-pointer py-4 border-b border-gray-700 text-xl font-medium transition-colors duration-200" onClick={()=>{
            navigate("/search")
          }}>Search</li>
          
          <li className="hover:text-gray-800 cursor-pointer py-4 border-b border-gray-700 text-xl font-medium transition-colors duration-200" onClick={()=>{
            navigate("/collect")
          }}>Collection</li>
         
         
         
        </ul>
        </div>
      </nav>
    </div>
  );
}
