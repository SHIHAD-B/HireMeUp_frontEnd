


export const ProfileThree = () => {
    return (
        <>
            <div className="w-full flex-col">
                <div className="w-full h-14 pl-2 flex-col flex  border-b border-gray-200 justify-center">
                    <span className="font-bold">Basic Information</span>
                    <span className="text-gray-400 text-sm">This is notification preferences that you can update anytime.</span>
                </div>


                <div className='w-full flex pt-4 flex-col lg:flex-row  border-b border-gray-200'>
                    <div className='h-full w-full lg:w-1/4 pl-2 flex-col flex'>
                        <span className='font-bold'>Personal Details</span>
                        <span className="text-sm text-gray-400">Customize your preferred notification settings</span>
                    </div>
                    <div className='w-full m-2 lg:w-2/5 flex flex-col gap-10'>
                        <div className='1/4 flex gap-2'>
                            <input type="checkbox" name="" id="" className="w-4 h-4  rounded-md border-2 cursor-pointer"/>
                            <div className="flex flex-col">
                                <label>Applications</label>
                                <span className="text-sm text-gray-400">These are notifications for jobs that you have applied to</span>
                            </div>

                        </div>
                        <div className='1/4 flex gap-2'>
                            <input type="checkbox" name="" id="" className="w-4 h-4  rounded-md border-2 cursor-pointer"/>
                            <div className="flex flex-col">
                                <label>Jobs</label>
                                <span className="text-sm text-gray-400">These are notifications for job openings that suits your profile</span>
                            </div>

                        </div>
                        <div className='1/4 flex gap-2'>
                            <input type="checkbox" name="" id="" className="w-4 h-4  rounded-md border-2 cursor-pointer" />
                            <div className="flex flex-col">
                                <label>Recommendations</label>
                                <span className="text-sm text-gray-400">These are notifications for personalized recommendations from our recruiters</span>
                            </div>

                        </div>



                    </div>
                </div>
                <div className='w-full flex justify-end pr-6 mt-10 pb-2'>
                    <button className='p-2 border rounded text-white bg-customviolet hover:bg-white hover:text-customviolet'>Update Settings</button>
                </div>

            </div>
        </>
    )
}