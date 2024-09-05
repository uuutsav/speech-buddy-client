import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { isListeningState, transcriptState } from '../Atoms/transcriptsAtom';
import { initializeSpeechRecognition } from '../utils/speechRecognition';

const SpeechRecognitionComponent = () => {
    const [transcript, setTranscript] = useRecoilState(transcriptState)
    const [isListening, setIsListening] = useRecoilState(isListeningState)

    useEffect(() => {
        console.log(" transcripts : ", transcript)
    } , [transcript])

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