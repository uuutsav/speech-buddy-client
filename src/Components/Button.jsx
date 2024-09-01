import React, { useRef } from 'react'

const Button = ({ className, text, onClickHandler }) => {
    const tempRef = useRef()

    return (
        <div className='my-2 '>
            <div ref={tempRef}
                className={` p-3 flex justify-center items-center text-black text-xl border-2 border-black shadow-md rounded-xl cursor-pointer ${className} hover:scale-105 hover:transition-all duration-150 hover:bg-blue-500 `}
                onClick={onClickHandler}
            >{text}</div>
        </div>
    )
}

export default Button