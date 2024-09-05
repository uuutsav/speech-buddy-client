import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { promptsState } from '../Atoms/promptsAtom';

const Prompts = ({ isResponse }) => {
    const [prompts, setPrompts] = useRecoilState(promptsState);
    const [text, setText] = useState("Demo texts something long enough for the screen to be filled up");

    useEffect(() => {
        setText(prompts[prompts.length -1]);
        console.log("text: ", text)
    }, [prompts])

    return (
        <div className="div m-2 flex">
            <div className={`${isResponse ? "" : "ml-auto"} px-5 py-3  min-h-[3rem] max-w-[80%] inline-block items-center bg-blue-500 rounded-3xl `}>
                <h3 className='text-xl text-white inline-block '>
                    {text}
                </h3>
            </div>
        </div>
    )
}

export default Prompts