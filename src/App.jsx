import React, { useState } from 'react'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

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
        <div className='App overflow-hidden h-[100vh] bg-gray-200'>
            <Navbar />

            {/* Start Screen  */}
            <div className={` ${isStart ? "hidden" : "flex"} start z-50 h-[90vh] w-[100vw] flex flex-col justify-center items-center `}>
                <div className='left-parent p-2 lg:w-1/2 flex flex-col justify-center '>
                    <h1 className='text-7xl lg:text-9xl text-blue-900 font-bold z-50 tracking-wider '>
                        Speech Buddy
                    </h1>
                    <h2 className='text-3xl font-semibold my-3 text-blue-900'>
                        Practice spoken English with instant feedback on pronunciation
                    </h2>
                    <hr className='h-2 w-1/5 my-8 bg-blue-900'></hr>
                    <p className='text-xl my-5 '>
                        Generate random sentences, speak them aloud, and receive real-time feedback on any mispronounced words.
                    </p>
                    <div className="buttons my-5 flex gap-5 ">
                        <div
                            className='px-8 py-5 w-1/2 text-2xl md:text-3xl text-center bg-blue-500 rounded-full border-2 border-black cursor-pointer duration-150 hover:scale-110 '
                            onClick={randomSentenceGenerator}
                        >
                            Start
                        </div>
                    </div>
                    <div className="socials mt-8 px-2 text-4xl flex gap-5  ">
                        <a
                            href="http://www.linkedin.com/in/kumar-utsav-638914239/"
                            target='_blank'
                            className='cursor-pointer duration-150 hover:scale-125'
                        >
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <a
                            href="https://github.com/uuutsav//"
                            target='_blank'
                            className='cursor-pointer duration-150 hover:scale-125'
                        >
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                    </div>
                </div>
                {/* <Button text={"Start"} onClickHandler={randomSentenceGenerator} className={`w-[80vw] h-[10vh] `} /> */}
            </div>

            <div id='content' className="content px-3 h-[90vh] flex flex-col justify-between md:px-[23vw] ">
                <div className="instruction p-3 h-1/10 text-xl font-semibold group cursor-pointer ">
                    <h3>
                        Click <span className='text-green-500'>Tap to Speak</span> to start recording your voice.<br></br>
                        Click <span className='text-blue-500'>Next</span> to generate the next sentence.<br></br>
                        Words highlighted in <span className='text-red-500'>Red</span> indicate pronunciation errors.
                    </h3>
                </div>

                <div className={`p-2 border-2 border-gray-500 h-8/10 rounded-xl h-[70%] overflow-scroll scrollbar scrollbar-thumb-blue-500 `}>
                    <Prompts />
                </div>

                <div className="buttons h-1/10 flex flex-col items-center">
                    <Button text={!isListening ? "Tap to Speak" : "Tap to Stop"} onClickHandler={handleVoiceRecognition} />
                    <Button text={"Next"} onClickHandler={randomSentenceGenerator} />
                </div>
            </div>
        </div>
    )
}

export default App
