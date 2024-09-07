import React, { useState } from 'react'
import axios from 'axios';
import './App.css';
import Navbar from './Components/Navbar';
import Button from './Components/Button';
import Prompts from './Components/Prompts';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { promptsState } from './Atoms/promptsAtom';
import { isListeningState, transcriptState } from './Atoms/transcriptsAtom';
import { initializeSpeechRecognition } from './utils/speechRecognition';
import analyseMistakes from './utils/analyseMistakes';
import { getRandomInt } from './utils/RandomIntGenerator.mjs';
import data from "./data/Facts.mjs"

// let transcript = '';
const recognition = initializeSpeechRecognition();
document.title = "Speech Buddy: Spoken English Practice App - By Kumar Utsav"

const App = () => {
    const [isStart, setIsStart] = useState(false)
    const setPrompts = useSetRecoilState(promptsState)
    const [isListening, setIsListening] = useRecoilState(isListeningState);
    const [transcript, setTranscript] = useRecoilState(transcriptState)

    const randomSentenceGenerator = async () => {
        try {
            // const response = await axios.get("http://localhost:5000/api/text/generate")
            const rand = getRandomInt(0, data.length - 1)
            const sentence = data[rand];
            // const data = response.data;
            const prompt = {
                text: sentence,
                isResponse: false
            }
            setPrompts(prev => [...prev, prompt]);
            setIsStart(true);
        } catch (error) {
            console.warn("Error making get request: ", error)
        }
    }

    const handleVoiceRecognition = () => {
        if (isListening) {
            stopListening(recognition);
            return;
        }

        recognition.onresult = (event) => {
            let newTranscript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');

            setTranscript(newTranscript);
        }

        recognition.onerror = (event) => {
            console.error("Speech recognition error : ", event);
        };

        startListening(recognition);
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
                text: analyseMistakes(prev[prev.length - 1].text, prompt.text),
                isResponse: true,
                isMistake: true
            }
            console.log(mistakes)
            return [...prev, prompt, mistakes]
        });
        setIsListening(false);

    }

    return (
        <div className='App overflow-hidden h-[100vh] '>
            <Navbar />

            {/* Start Screen  */}
            <div className={` ${isStart ? "hidden" : "flex"} start z-50 h-[90vh] w-[100vw] flex flex-col justify-center items-center `}>
                <Button text={"Start"} onClickHandler={randomSentenceGenerator} className={`w-[80vw] h-[10vh] `} />
            </div>

            <div id='content' className="content px-3 h-[90vh] flex flex-col justify-between md:px-[23vw] ">
                <div className="instruction text-center p-3 text-xl font-semibold group cursor-pointer ">
                    <h3>
                        Speak and Improve your Spoken English
                    </h3>
                    <h4 className='text-sm text-gray-500 hidden group-hover:block duration-125'>
                        {"Click Next to generate a new sentence"}
                    </h4>
                    <h4 className='text-sm text-gray-500 hidden group-hover:block duration-125'>
                        {"Repeat the sentance and know the words you pronounced wrong."}
                    </h4>
                </div>

                <div className={`p-2 border-2 border-gray-500 rounded-xl h-[70%] overflow-scroll scrollbar scrollbar-thumb-blue-500 `}>
                    <Prompts />
                </div>

                <div className="buttons flex flex-col items-center">
                    <Button text={!isListening ? "Tap to Speak" : "Tap to Stop"} onClickHandler={handleVoiceRecognition} />
                    <Button text={"Next"} onClickHandler={randomSentenceGenerator} />
                </div>
            </div>
        </div>
    )
}

export default App
