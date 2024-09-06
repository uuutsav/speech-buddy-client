import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { promptsState } from '../Atoms/promptsAtom';
import { transcriptState } from '../Atoms/transcriptsAtom';
import SpeechRecognitionComponent from './SpeechRecognition';
import MistakesPrompt from './MistakesPrompt';

const Prompts = ({ }) => {
    const [prompts, setPrompts] = useRecoilState(promptsState);
    const [text, setText] = useState("");
    const [transcript, setTranscript] = useRecoilState(transcriptState);

    useEffect(() => {
        // setText(prompts[prompts.length - 1]);
        // console.log("text: ", text)
    }, [prompts])

    return (
        <div >
            {prompts.map((prompt, i) => {
                let bgColor = 'ml-auto bg-blue-500';
                if (prompt.isResponse){
                    if (prompt.isMistake){
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