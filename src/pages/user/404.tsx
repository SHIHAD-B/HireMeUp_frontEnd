import { useNavigate } from 'react-router-dom'
import notfoundimage from '../../assets/images/404.png'

export const NotFound= () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="w-screen h-screen flex  justify-center item-center">
                <div className='w-[90%] h-[90%] flex flex-col justify-center items-center'>

                    <img src={notfoundimage} alt="" className=' ' />
                    <span className='text-sm '>Sorry, the page you're looking for doesn't exist. But don't worry, there's plenty more to explore!</span>
                    <button onClick={() => navigate('/')} className="p-4 border border-customviolet rounded text-customviolet hover:text-white hover:bg-customviolet">Back To Home</button>
                </div>
            </div>
        </>
    )
}