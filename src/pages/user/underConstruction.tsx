import { useNavigate } from 'react-router-dom'
import notFound from '../../assets/images/under_construction.png'

export const UnderConstruction = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="w-screen h-screen flex  justify-center item-center">
                <div className='w-[90%] h-[90%] flex flex-col justify-center items-center'>

                    <img src={notFound} alt="" className=' ' />
                    <span className='text-sm '>We're working hard to bring you something amazing! This page is currently under construction and will be available soon.

                        Thank you for your patience. Please check back later!

                        In the meantime, feel free to explore the rest of our site.</span>
                    <button onClick={() => navigate('/')} className="p-4 border border-customviolet rounded text-customviolet hover:text-white hover:bg-customviolet">Back To Home</button>
                </div>
            </div>
        </>
    )
}