import {HashLoader} from 'react-spinners'

export const Loader = () => {
    return (
        <div className='absolute inset-0 bg-black/80 w-screen h-full flex justify-center z-10'>
            <div className='flex flex-col justify-center'>
                <div className='flex justify-center'>
                    <HashLoader
                        color="#B026FF"
                        loading
                        size={55}
                    />
                </div>
            </div>
        </div>

    )
}