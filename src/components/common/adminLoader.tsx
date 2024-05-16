import {GridLoader } from 'react-spinners'

export const AdminLoader = () => {
    return (
        <div className='absolute inset-0 bg-black/30 w-screen h-screen flex justify-center'>
            <div className='flex flex-col justify-center'>
                <div className='flex justify-center'>
                    <GridLoader
                        color="#B026FF"
                        loading
                        size={25}
                    />
                </div>
            </div>
        </div>

    )
}