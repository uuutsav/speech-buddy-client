import React from 'react'
import { useRecoilState } from 'recoil';
import { isListeningState, transcriptState } from '../Atoms/transcriptsAtom';
import { initializeSpeechRecognition } from '../utils/speechRecognition';

const SpeechRecognitionComponent = () => {
    const [text, setText] = useRecoilState(transcriptState)
    const [isListening, setIsListening] = useRecoilState(isListeningState)



    return (
        <div className={`${isListening ? "" : "hidden"} div m-2 flex`}>

            <div className={`px-5 py-3 min-h-[3rem] inline-block items-center bg-purple-600 rounded-3xl `}>
                <h3 className='text-xl text-white inline-block '>
                    { } Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi expedita aspernatur sapiente sint perferendis officiis iusto obcaecati voluptatum odit minus ipsum provident nihil dolorem, fugit minima deleniti dolore illum, dignissimos eaque! Eveniet, quisquam blanditiis. Doloremque reprehenderit at nemo ratione iure error modi voluptate magnam reiciendis eligendi, tempore, eveniet repellat quaerat?
                </h3>
            </div>
        </div>
    )
}

export default SpeechRecognitionComponent