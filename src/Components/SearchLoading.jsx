import '../css/Loading.css'
export const SearchLoading = () => {
  return (
    <div className="bg-gray-300/50 absolute z-20 top-0 left-0 right-0 bottom-0 w-full h-full  flex items-center justify-center cursor-wait">
    <span className="loader-search"></span>
    </div>  
  )
}
