
import { GiSevenPointedStar } from "react-icons/gi";



export const SetProfiletwo = () => {
    return (
        <>
            <div className="w-full flex-col">
               
                <div className='w-full flex pt-4 flex-col lg:flex-row  border-b border-gray-200'>
                    <div className='h-full w-full lg:w-1/4 pl-2 flex flex-col'>
                        <span className='font-bold'>Basic Information</span>
                        <span className="text-sm text-gray-400">Add elsewhere links to your company profile.You can add only username without full https links</span>
                    </div>
                    <div className='w-full m-2 lg:w-2/5 flex flex-col gap-6'>
                        <div className='1/4 flex flex-col gap-2'>
                            <span className='flex '>Instagram<GiSevenPointedStar className='text-[6px] mt-1 text-red-500' /></span>
                            <input type="text" className='w-full border bg-background rounded border-gray-400 h-10' />
                            <p className="text-xs text-gray-400"></p>
                        </div>
                        <div className='1/4 flex flex-col gap-2'>
                            <span className='flex '>Twitter<GiSevenPointedStar className='text-[6px] mt-1 text-red-500' /></span>
                            <input type="text" className='w-full border rounded bg-background border-gray-400 h-10' />
                            <p className="text-xs text-gray-400"></p>
                        </div>
                        <div className='1/4 flex flex-col gap-2'>
                            <span className='flex '>Facebook<GiSevenPointedStar className='text-[6px] mt-1 text-red-500' /></span>
                            <input type="text" className='w-full border rounded bg-background border-gray-400 h-10' />
                            <p className="text-xs text-gray-400"></p>
                        </div>
                        <div className='1/4 flex flex-col gap-2'>
                            <span className='flex '>Linkedin<GiSevenPointedStar className='text-[6px] mt-1 text-red-500' /></span>
                            <input type="text" className='w-full border rounded bg-background border-gray-400 h-10' />
                            <p className="text-xs text-gray-400"></p>
                        </div>
                        <div className='1/4 flex flex-col gap-2'>
                            <span className='flex '>Youtube<GiSevenPointedStar className='text-[6px] mt-1 text-red-500' /></span>
                            <input type="text" className='w-full border rounded bg-background border-gray-400 h-10' />
                            <p className="text-xs text-gray-400"></p>
                        </div>
                       
                       
                    </div>
                </div>
                <div className='w-full flex justify-end pr-6 mt-10 pb-2'>
                <button className='p-2 border rounded text-white bg-customviolet hover:bg-white hover:text-customviolet'>Save Changes</button>
                </div>

            </div>
        </>
    )
}