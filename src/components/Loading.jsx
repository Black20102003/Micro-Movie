import ClipLoader from "react-spinners/ClipLoader";


export function PageLoading(){
    return(
        <div className=" flex justify-center items-center min-h-screen bg-black">
            <ClipLoader size={30} color="white"/>

        </div>
    )
}       