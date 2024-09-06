import React from 'react'
import { useRecoilValue } from 'recoil';
import { promptsState } from '../Atoms/promptsAtom';
import SpeechRecognitionComponent from './SpeechRecognitionComponent';

const Prompts = ({ }) => {
    const prompts = useRecoilValue(promptsState);

    return (
        <div >
            {prompts.map((prompt, i) => {
                let bgColor = 'ml-auto bg-blue-500';
                if (prompt.isResponse) {
                    if (prompt.isMistake) {
                        bgColor = "bg-red-600"
                    } else {
                        bgColor = "bg-green-500"
                    }
                }
                return <div key={i} className="div m-2 flex">
                    <div className={`${bgColor} px-5 py-3  min-h-[3rem] max-w-[80%] inline-block items-center  rounded-3xl `}>
                        <h3 className={`${prompt.isMistake} rounded-full p-1 text-xl text-white inline-block `}>
                            {prompt.text}
                        </h3>
                    </div>
                </div>
            })}

            <SpeechRecognitionComponent />
        </div>
    )
}

export default Prompts