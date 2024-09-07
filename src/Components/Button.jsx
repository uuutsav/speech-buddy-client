import React from 'react'

const Button = ({ className, text, onClickHandler }) => {

    return (
        <div className=' w-full md:max-w-[30vw] my-2 flex flex-col justify-center items-center '>
            <div
                className={` w-full p-3 flex justify-center items-center text-black text-xl border-2 border-black shadow-md rounded-xl cursor-pointer ${className} hover:scale-105 hover:transition-all duration-150 hover:bg-blue-500 `}
                onClick={onClickHandler}
            >{text}</div>
        </div>
    )
}

export default Button