import React from 'react'
import { useRecoilValue } from 'recoil';
import { isListeningState, transcriptState } from '../Atoms/transcriptsAtom';

const SpeechRecognitionComponent = () => {
    const transcript = useRecoilValue(transcriptState)
    const isListening = useRecoilValue(isListeningState)

    return (
        <div className={`${isListening ? "" : "hidden"} div m-2 flex`}>
            <div className={`px-5 py-3 min-h-[3rem] inline-block items-center bg-purple-600 rounded-3xl `}>
                <h3 className='text-xl text-white inline-block '>
                    {transcript} .
                </h3>
            </div>
        </div>
    )
}

export default SpeechRecognitionComponent