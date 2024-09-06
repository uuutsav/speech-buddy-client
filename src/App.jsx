import React, { useState } from 'react'
import axios from 'axios';
import './App.css';
import Navbar from './Components/Navbar';
import Button from './Components/Button';
import Prompts from './Components/Prompts';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { promptsState, responsesState } from './Atoms/promptsAtom';
import SpeechRecognitionComponent from './Components/SpeechRecognition';
import { isListeningState, transcriptState } from './Atoms/transcriptsAtom';
import { initializeSpeechRecognition } from './utils/speechRecognition';
import analyseMistakes from './utils/analyseMistakes';

let transcript = '';
const recognition = initializeSpeechRecognition();

const App = () => {
    const [isStart, setIsStart] = useState(false)
    const [isResponse, setIsResponse] = useState(false)
    const setPrompts = useSetRecoilState(promptsState)
    const [responses, setResponses] = useRecoilState(responsesState)
    const [isListening, setIsListening] = useRecoilState(isListeningState);
    const setTranscript = useSetRecoilState(transcriptState)

    const randomSentenceGenerator = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/text/generate")
            const data = response.data;
            console.log(data);
            setResponses(e => {
                const temp = [...e,
                data.text
                ]
                return temp;
            })
            const prompt = {
                text: data.text,
                isResponse: false
            }
            setPrompts(prev => [...prev, prompt]);
            setIsStart(true);
            setIsResponse(false);
        } catch (error) {
            console.warn("Error making get request: ", error)
        }
    }

    const handleVoiceRecognition = () => {
        if (isListening){
            stopListening(recognition);
            return;
        }

        if (recognition) {
            recognition.onresult = (event) => {
                transcript = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('');

                setTranscript(transcript);
            }

            recognition.onerror = (event) => {
                console.error("Speech recognition error : ", event);
            };

            startListening(recognition);
        }
    }

    const startListening = (recognition) => {
        recognition ? recognition.start() : console.log("Recogniiton undefined");
        setIsListening(true);
    }

    const stopListening = (recognition) => {
        recognition.stop();
        const prompt = {
            text: transcript,
            isResponse: true
        }
        console.log("Listening stopped: ", prompt)

        transcript && setPrompts(prev => {
            const mistakes = {
                text: analyseMistakes(prev[prev.length -1].text, prompt.text),
                isResponse: true,
                isMistake: true
            }
            console.log(mistakes)
            return [...prev, prompt, mistakes]
        } );
        setIsListening(false);

    }

    return (
        <div className='App overflow-hidden h-[100vh] '>
            <Navbar />

            {/* Start Screen  */}
            <div className={` ${isStart ? "hidden" : "flex"} start z-50 h-[90vh] w-[100vw] flex flex-col justify-center items-center `}>
                <Button text={"Start"} onClickHandler={randomSentenceGenerator} className={`w-[80vw] h-[10vh]`} />
            </div>

            <div id='content' className="content px-3 h-[90vh] flex flex-col justify-between ">
                <div className="instruction text-center p-3 text-2xl font-semibold">
                    {"Speak this sentence"}
                </div>

                <div className={`p-2 border-2 border-gray-500 rounded-xl h-[70%] overflow-scroll`}>
                    <Prompts />
                </div>

                <div className="buttons">
                    <Button text={!isListening ? "Tap to Speak" : "Tap to Stop"} onClickHandler={handleVoiceRecognition} />
                    <Button text={"Next"} onClickHandler={randomSentenceGenerator} />
                </div>
            </div>
        </div>
    )
}

export default App
