import React, { useState } from 'react'

const Prompts = ({ isResponse }) => {
    const [text, setText] = useState("Demo texts something long enough for the screen to be filled up");

    return (
        <div className="div m-2 flex">

            <div className={`${isResponse ? "" : "ml-auto"} px-5 py-3  min-h-[3rem] max-w-[80%] inline-block items-center bg-blue-500 rounded-3xl `}>
                <h3 className='text-xl text-white inline-block '>{text}</h3>
            </div>
        </div>
    )
}

export default Prompts